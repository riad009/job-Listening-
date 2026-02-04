'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const categories = [
  { name: 'Engineering', icon: '💻', description: 'Software, hardware, and systems' },
  { name: 'Design', icon: '🎨', description: 'UI/UX, graphics, and branding' },
  { name: 'Marketing', icon: '📈', description: 'Digital, content, and growth' },
  { name: 'Sales', icon: '💼', description: 'B2B, B2C, and partnerships' },
  { name: 'Data Science', icon: '📊', description: 'Analytics, ML, and AI' },
  { name: 'Operations', icon: '⚙️', description: 'Process and management' },
  { name: 'Finance', icon: '💰', description: 'Accounting and financial planning' },
  { name: 'HR', icon: '👥', description: 'Recruiting and people ops' },
];

const jobTypes = [
  { name: 'Full-time', icon: '🏢', description: '40+ hours/week' },
  { name: 'Part-time', icon: '⏰', description: '20-30 hours/week' },
  { name: 'Contract', icon: '📄', description: 'Fixed term project' },
  { name: 'Internship', icon: '🎓', description: 'Entry level training' },
];

const badgeOptions = [
  { name: 'Remote', icon: '🏠', color: 'emerald' },
  { name: 'Hybrid', icon: '🔄', color: 'blue' },
  { name: 'On-site', icon: '🏢', color: 'gray' },
  { name: 'Urgent', icon: '🔥', color: 'red' },
  { name: 'Featured', icon: '⭐', color: 'amber' },
  { name: 'Benefits', icon: '🎁', color: 'teal' },
  { name: 'Stock Options', icon: '📈', color: 'indigo' },
  { name: 'Flexible Hours', icon: '🕐', color: 'cyan' },
];

export default function PostJobPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    category: '',
    salary: '',
    salaryType: 'yearly',
    description: '',
    requirements: '',
    badges: [],
    companyWebsite: '',
    applicationEmail: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBadgeToggle = (badge) => {
    setFormData((prev) => ({
      ...prev,
      badges: prev.badges.includes(badge)
        ? prev.badges.filter((b) => b !== badge)
        : [...prev.badges, badge],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const requirementsArray = formData.requirements
        .split('\n')
        .map((r) => r.trim())
        .filter((r) => r.length > 0);

      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          requirements: requirementsArray,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to post job');
      }

      router.push('/jobs?posted=success');
    } catch (err) {
      setError('Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.title && formData.company && formData.category;
      case 2:
        return formData.location && formData.type;
      case 3:
        return formData.description;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const steps = [
    { number: 1, title: 'Basic Info', icon: '📝' },
    { number: 2, title: 'Job Details', icon: '📋' },
    { number: 3, title: 'Description', icon: '✍️' },
    { number: 4, title: 'Review', icon: '✅' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-green-600 via-green-700 to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <Link href="/jobs" className="inline-flex items-center gap-2 text-green-100 hover:text-white transition-colors mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Jobs
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <span className="text-3xl">📝</span>
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white">Post a New Job</h1>
              <p className="text-green-100 mt-1">Find the perfect candidate for your team</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <button
                  onClick={() => step.number <= currentStep && setCurrentStep(step.number)}
                  className={`flex items-center gap-3 ${step.number <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step.number === currentStep 
                      ? 'bg-green-600 text-white shadow-lg shadow-green-200' 
                      : step.number < currentStep 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400'
                  }`}>
                    {step.number < currentStep ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span>{step.icon}</span>
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <p className={`text-sm font-semibold ${step.number === currentStep ? 'text-green-600' : step.number < currentStep ? 'text-gray-700' : 'text-gray-400'}`}>
                      Step {step.number}
                    </p>
                    <p className={`text-xs ${step.number === currentStep ? 'text-gray-600' : 'text-gray-400'}`}>
                      {step.title}
                    </p>
                  </div>
                </button>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded-full ${step.number < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 lg:p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">1</span>
                  Basic Information
                </h2>
                <p className="text-gray-500 mt-1 ml-10">Tell us about the position and your company</p>
              </div>
              <div className="p-6 lg:p-8 space-y-6">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Senior Frontend Developer"
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  />
                  <p className="text-sm text-gray-400 mt-2">Be specific - this helps candidates find your job</p>
                </div>

                {/* Company Name */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. TechCorp Inc."
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Website
                    </label>
                    <input
                      type="url"
                      name="companyWebsite"
                      value={formData.companyWebsite}
                      onChange={handleChange}
                      placeholder="https://yourcompany.com"
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Job Category <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.name}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, category: cat.name }))}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          formData.category === cat.name
                            ? 'border-green-500 bg-green-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <p className={`font-semibold mt-2 ${formData.category === cat.name ? 'text-green-700' : 'text-gray-700'}`}>
                          {cat.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">{cat.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Job Details */}
          {currentStep === 2 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 lg:p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">2</span>
                  Job Details
                </h2>
                <p className="text-gray-500 mt-1 ml-10">Specify the work arrangement and compensation</p>
              </div>
              <div className="p-6 lg:p-8 space-y-6">
                {/* Job Type Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Employment Type <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {jobTypes.map((type) => (
                      <button
                        key={type.name}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, type: type.name }))}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                          formData.type === type.name
                            ? 'border-green-500 bg-green-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-2xl">{type.icon}</span>
                        <p className={`font-semibold mt-2 ${formData.type === type.name ? 'text-green-700' : 'text-gray-700'}`}>
                          {type.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{type.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. San Francisco, CA or Remote"
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Salary */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Salary Range
                  </label>
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">$</span>
                      <input
                        type="text"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="e.g. 80,000 - 120,000"
                        className="w-full pl-8 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <select
                      name="salaryType"
                      value={formData.salaryType}
                      onChange={handleChange}
                      className="px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    >
                      <option value="yearly">Per Year</option>
                      <option value="hourly">Per Hour</option>
                      <option value="monthly">Per Month</option>
                    </select>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Jobs with salary ranges get 50% more applications</p>
                </div>

                {/* Badges */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Work Arrangement & Perks
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {badgeOptions.map((badge) => (
                      <button
                        key={badge.name}
                        type="button"
                        onClick={() => handleBadgeToggle(badge.name)}
                        className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                          formData.badges.includes(badge.name)
                            ? 'bg-green-100 text-green-700 border-2 border-green-300 shadow-sm'
                            : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                        }`}
                      >
                        <span>{badge.icon}</span>
                        {badge.name}
                        {formData.badges.includes(badge.name) && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Description */}
          {currentStep === 3 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 lg:p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">3</span>
                  Job Description
                </h2>
                <p className="text-gray-500 mt-1 ml-10">Describe the role and what you&apos;re looking for</p>
              </div>
              <div className="p-6 lg:p-8 space-y-6">
                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    About the Role <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={8}
                    placeholder="Describe the role, responsibilities, and what makes this opportunity great. Be specific about day-to-day tasks and team dynamics..."
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-400">Tip: Include information about your team culture</p>
                    <p className={`text-sm ${formData.description.length > 100 ? 'text-green-600' : 'text-gray-400'}`}>
                      {formData.description.length} characters
                    </p>
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Requirements & Qualifications
                  </label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows={6}
                    placeholder="List the key requirements (one per line):&#10;&#10;• 5+ years of software development experience&#10;• Strong proficiency in React and TypeScript&#10;• Excellent communication skills&#10;• Experience with agile methodologies"
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none font-mono text-sm"
                  />
                  <p className="text-sm text-gray-400 mt-2">One requirement per line</p>
                </div>

                {/* Application Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Application Email
                  </label>
                  <input
                    type="email"
                    name="applicationEmail"
                    value={formData.applicationEmail}
                    onChange={handleChange}
                    placeholder="jobs@yourcompany.com"
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-400 mt-2">Where should candidates send their applications?</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 lg:p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">4</span>
                    Review Your Listing
                  </h2>
                  <p className="text-gray-500 mt-1 ml-10">Make sure everything looks good before posting</p>
                </div>
                <div className="p-6 lg:p-8">
                  {/* Preview Card */}
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 bg-gray-50">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Preview</p>
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {formData.company ? formData.company.charAt(0).toUpperCase() : 'C'}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900">{formData.title || 'Job Title'}</h3>
                          <p className="text-gray-600">{formData.company || 'Company Name'}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {formData.badges.map(badge => (
                              <span key={badge} className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full border border-green-200">
                                {badge}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{formData.salary ? `$${formData.salary}` : 'Competitive'}</p>
                          <p className="text-sm text-gray-500">{formData.salaryType === 'hourly' ? 'per hour' : formData.salaryType === 'monthly' ? 'per month' : 'per year'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {formData.location || 'Location'}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {formData.type || 'Job Type'}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          {formData.category || 'Category'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-700">Job Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-500">Title</span>
                          <span className="font-medium text-gray-900">{formData.title || '-'}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-500">Company</span>
                          <span className="font-medium text-gray-900">{formData.company || '-'}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-500">Location</span>
                          <span className="font-medium text-gray-900">{formData.location || '-'}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-500">Type</span>
                          <span className="font-medium text-gray-900">{formData.type || '-'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-700">Compensation & Perks</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-500">Salary</span>
                          <span className="font-medium text-gray-900">{formData.salary ? `$${formData.salary}` : 'Not specified'}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-500">Category</span>
                          <span className="font-medium text-gray-900">{formData.category || '-'}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-500">Badges</span>
                          <span className="font-medium text-gray-900">{formData.badges.length || 0} selected</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-amber-800 font-medium">Before you post</p>
                  <p className="text-amber-700 text-sm mt-1">By posting this job, you agree to our Terms of Service and confirm that all information is accurate. Your listing will be visible to all users.</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <button
              type="button"
              onClick={prevStep}
              className={`px-6 py-3 font-medium rounded-xl transition-all flex items-center gap-2 ${
                currentStep === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              disabled={currentStep === 1}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid()}
                className={`px-8 py-3 font-semibold rounded-xl transition-all flex items-center gap-2 ${
                  isStepValid()
                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-200'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-teal-700 transition-all shadow-lg shadow-green-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Publishing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Post Job Now
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        {/* Help Card */}
        <div className="mt-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">💡</span>
            </div>
            <div>
              <h3 className="font-bold text-lg">Tips for a great job listing</h3>
              <ul className="mt-3 space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Be specific about the role and responsibilities
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Include salary range to attract more candidates
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Highlight unique benefits and company culture
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Use clear requirements to filter candidates
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
