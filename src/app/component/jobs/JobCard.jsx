'use client';

import Link from 'next/link';

export default function JobCard({ job }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Just now';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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

  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-green-300 hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300 cursor-pointer group relative overflow-hidden">
        {/* Featured Badge */}
        {job.badges.includes('Featured') && (
          <div className="absolute top-0 right-0">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              ⭐ Featured
            </div>
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-green-200/50 group-hover:scale-105 transition-transform">
              {job.company.charAt(0)}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-1">
                  {job.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-medium text-gray-700">{job.company}</span>
                  <span className="flex items-center text-green-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Salary & Save */}
              <div className="flex items-center gap-4 lg:text-right">
                <div>
                  <div className="text-lg font-bold text-gray-900">{job.salary}</div>
                  <div className="text-sm text-gray-500">per year</div>
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    // Save job logic
                  }}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-400 hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Job Details */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {job.type}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {job.category}
              </span>
              <span className="flex items-center gap-1.5 text-green-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatDate(job.postedDate)}
              </span>
            </div>

            {/* Badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              {job.badges.filter(b => b !== 'Featured').slice(0, 4).map((badge, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 text-xs font-medium rounded-full border ${getBadgeColor(badge)}`}
                >
                  {badge}
                </span>
              ))}
              {job.badges.length > 5 && (
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                  +{job.badges.length - 5} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Apply Button - Shows on Hover */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              50+ applicants
            </span>
          </div>
          <span className="text-green-600 font-semibold group-hover:underline flex items-center gap-1">
            View Details
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
