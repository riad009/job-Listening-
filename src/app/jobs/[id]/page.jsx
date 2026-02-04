'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function JobDetailPage() {
  const params = useParams();
  const id = params.id;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [relatedJobs, setRelatedJobs] = useState([]);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${id}`);
        if (!response.ok) {
          throw new Error('Job not found');
        }
        const data = await response.json();
        setJob(data.job);
        
        // Fetch related jobs
        const relatedRes = await fetch(`/api/jobs?category=${data.job.category}&limit=3`);
        const relatedData = await relatedRes.json();
        setRelatedJobs(relatedData.jobs.filter(j => String(j.id) !== String(id)).slice(0, 3));
      } catch (err) {
        setError('Job not found');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getBadgeColor = (badge) => {
    const colors = {
      'Remote': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Hybrid': 'bg-blue-50 text-blue-700 border-blue-200',
      'On-site': 'bg-gray-50 text-gray-700 border-gray-200',
      'Urgent': 'bg-red-50 text-red-700 border-red-200',
      'Featured': 'bg-amber-50 text-amber-700 border-amber-200',
      'Contract': 'bg-orange-50 text-orange-700 border-orange-200',
      'Benefits': 'bg-teal-50 text-teal-700 border-teal-200',
      'Stock Options': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Leadership': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Commission': 'bg-pink-50 text-pink-700 border-pink-200',
      'Flexible Hours': 'bg-cyan-50 text-cyan-700 border-cyan-200',
      'Top Salary': 'bg-green-50 text-green-700 border-green-200',
    };
    return colors[badge] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Skeleton Loading */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse">
              <div className="h-4 w-32 bg-white/30 rounded mb-8"></div>
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-white/30 rounded-2xl"></div>
                <div className="flex-1">
                  <div className="h-8 w-2/3 bg-white/30 rounded mb-3"></div>
                  <div className="h-5 w-1/3 bg-white/30 rounded mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-8 w-20 bg-white/30 rounded-full"></div>
                    <div className="h-8 w-24 bg-white/30 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-8 animate-pulse">
                <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                  <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-12 w-full bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-12 w-full bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h1>
          <p className="text-gray-600 mb-6">The job you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-green-600 via-green-700 to-teal-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-green-100 mb-6">
            <Link href="/jobs" className="hover:text-white transition-colors">Jobs</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white">{job.category}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white truncate max-w-xs">{job.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            {/* Company Logo & Info */}
            <div className="flex items-start gap-5 flex-1">
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white rounded-2xl flex items-center justify-center text-3xl lg:text-4xl font-bold text-green-600 shadow-xl flex-shrink-0">
                {job.company.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3 flex-wrap">
                  <h1 className="text-2xl lg:text-4xl font-bold text-white">{job.title}</h1>
                  {job.badges.includes('Featured') && (
                    <span className="px-3 py-1 bg-amber-400 text-amber-900 text-sm font-bold rounded-full flex items-center gap-1">
                      ⭐ Featured
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-2 text-green-100">
                  <span className="font-semibold text-white text-lg">{job.company}</span>
                  <span className="flex items-center text-green-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm ml-1">Verified</span>
                  </span>
                </div>

                {/* Quick Info */}
                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                  <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {job.type}
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Posted {formatDate(job.postedDate)}
                  </span>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.badges.filter(b => b !== 'Featured').map((badge, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 text-sm font-medium rounded-full border ${getBadgeColor(badge)}`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Salary Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center lg:text-right">
              <p className="text-green-100 text-sm mb-1">Annual Salary</p>
              <p className="text-3xl lg:text-4xl font-bold text-white">{job.salary}</p>
              <p className="text-green-200 text-sm mt-1">+ Benefits & Equity</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
                <div className="text-2xl mb-1">👥</div>
                <div className="text-xl font-bold text-gray-900">50+</div>
                <div className="text-xs text-gray-500">Applicants</div>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
                <div className="text-2xl mb-1">⏱️</div>
                <div className="text-xl font-bold text-gray-900">2-3 weeks</div>
                <div className="text-xs text-gray-500">Hiring Time</div>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
                <div className="text-2xl mb-1">🎯</div>
                <div className="text-xl font-bold text-gray-900">85%</div>
                <div className="text-xs text-gray-500">Match Score</div>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
                <div className="text-2xl mb-1">📊</div>
                <div className="text-xl font-bold text-gray-900">Mid-Senior</div>
                <div className="text-xs text-gray-500">Level</div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-6 lg:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">📋</span>
                  About This Role
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base">{job.description}</p>
                </div>
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="p-6 lg:p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">✅</span>
                    Requirements
                  </h2>
                  <ul className="space-y-3">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Benefits */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-6 lg:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">🎁</span>
                  Benefits & Perks
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: '💰', title: 'Competitive Salary', desc: 'Top of market compensation' },
                    { icon: '🏥', title: 'Health Insurance', desc: 'Medical, dental, and vision' },
                    { icon: '🏖️', title: 'Unlimited PTO', desc: 'Flexible time off policy' },
                    { icon: '🏠', title: 'Remote Friendly', desc: 'Work from anywhere' },
                    { icon: '📈', title: 'Stock Options', desc: 'Equity in the company' },
                    { icon: '📚', title: 'Learning Budget', desc: '$1,000/year for courses' },
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <span className="text-2xl">{benefit.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-900">{benefit.title}</p>
                        <p className="text-sm text-gray-500">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-6 lg:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600">🏢</span>
                  About {job.company}
                </h2>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                    {job.company.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{job.company}</h3>
                    <p className="text-gray-500">Technology • 500-1000 employees</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        San Francisco, CA
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        company.com
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  {job.company} is a leading technology company focused on building innovative solutions that transform how people work. 
                  We&apos;re backed by top-tier investors and are growing rapidly across multiple markets.
                </p>
                <div className="flex gap-3 mt-4">
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    View Company Profile
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    See All Jobs ({Math.floor(Math.random() * 20) + 5})
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <button 
                onClick={() => setIsApplyModalOpen(true)}
                className="w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-600/25 text-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Apply Now
              </button>
              <button 
                onClick={() => setIsSaved(!isSaved)}
                className={`w-full mt-3 py-3 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
                  isSaved 
                    ? 'bg-red-50 text-red-600 border-2 border-red-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <svg className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {isSaved ? 'Saved!' : 'Save Job'}
              </button>

              <div className="border-t border-gray-100 mt-6 pt-6">
                <h3 className="font-bold text-gray-900 mb-4">Job Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Salary</p>
                      <p className="font-semibold text-gray-900">{job.salary}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="font-semibold text-gray-900">{job.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Job Type</p>
                      <p className="font-semibold text-gray-900">{job.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Category</p>
                      <p className="font-semibold text-gray-900">{job.category}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="border-t border-gray-100 mt-6 pt-6">
                <h3 className="font-bold text-gray-900 mb-3">Share This Job</h3>
                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    LinkedIn
                  </button>
                  <button className="flex-1 py-2.5 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm font-medium">
                    Twitter
                  </button>
                  <button className="flex-1 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
                    Copy
                  </button>
                </div>
              </div>
            </div>

            {/* Report Job */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <button className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
                Report this job listing
              </button>
            </div>
          </div>
        </div>

        {/* Related Jobs */}
        {relatedJobs.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Similar Jobs</h2>
              <Link href={`/jobs?category=${job.category}`} className="text-green-600 font-semibold hover:text-green-700 flex items-center gap-1">
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedJobs.map((relJob) => (
                <Link key={relJob.id} href={`/jobs/${relJob.id}`}>
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-green-200 transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold">
                        {relJob.company.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors truncate">{relJob.title}</h3>
                        <p className="text-gray-500 text-sm">{relJob.company}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-gray-500">{relJob.location}</span>
                      <span className="font-semibold text-gray-900">{relJob.salary}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Apply Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Apply for {job.title}</h2>
                <button 
                  onClick={() => setIsApplyModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-500 mt-1">{job.company}</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resume *</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-green-300 transition-colors cursor-pointer">
                  <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, DOC up to 10MB</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  placeholder="Tell us why you're a great fit for this role..."
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
              <button 
                onClick={() => {
                  setIsApplyModalOpen(false);
                  alert('Application submitted! (Demo)');
                }}
                className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
              >
                Submit Application
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">
                By applying, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
