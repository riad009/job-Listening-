'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import JobCard from '../component/jobs/JobCard';
import JobFilters from '../component/jobs/JobFilters';
import SearchBar from '../component/jobs/SearchBar';
import SortDropdown from '../component/jobs/SortDropdown';

const trendingSearches = ['Remote', 'React Developer', 'Data Scientist', 'Product Manager', 'UX Designer'];

const stats = [
    { label: 'Jobs Posted', value: '50K+', icon: '💼' },
    { label: 'Companies', value: '10K+', icon: '🏢' },
    { label: 'Hired', value: '100K+', icon: '🎯' },
];

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    location: '',
  });
  const [sort, setSort] = useState('newest');
  const [totalJobs, setTotalJobs] = useState(0);
  const [viewMode, setViewMode] = useState('list');

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (filters.category) params.append('category', filters.category);
      if (filters.type) params.append('type', filters.type);
      if (filters.location) params.append('location', filters.location);
      params.append('sort', sort);

      const response = await fetch(`/api/jobs?${params.toString()}`);
      const data = await response.json();
      setJobs(data.jobs);
      setTotalJobs(data.total);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  }, [search, filters, sort]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch = () => {
    fetchJobs();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Upwork Style */}
      <div className="bg-gradient-to-r from-green-600 via-green-700 to-teal-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Find the perfect <span className="text-green-200">job</span> for you
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Search from thousands of opportunities and take the next step in your career
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mb-6">
              <SearchBar value={search} onChange={setSearch} onSearch={handleSearch} />
            </div>

            {/* Trending Searches */}
            <div className="flex flex-wrap justify-center items-center gap-2 text-sm">
              <span className="text-green-200">Trending:</span>
              {trendingSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearch(term);
                    handleSearch();
                  }}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors border border-white/20"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 lg:gap-16 mt-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-green-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <JobFilters filters={filters} onFilterChange={setFilters} />
            
            {/* Promo Card */}
            <div className="mt-6 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white hidden lg:block">
              <h3 className="text-lg font-semibold mb-2">🚀 Post Your Job</h3>
              <p className="text-green-100 text-sm mb-4">
                Reach thousands of qualified candidates instantly.
              </p>
              <Link 
                href="/jobs/post"
                className="inline-block w-full text-center px-4 py-2 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            {/* Header */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {loading ? 'Searching...' : `${totalJobs} Jobs Available`}
                  </h2>
                  {(filters.category || filters.type || filters.location || search) && (
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      Showing filtered results
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {/* View Mode Toggle */}
                  <div className="hidden sm:flex items-center border border-gray-200 rounded-lg p-1">
                    <button 
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                  </div>
                  <SortDropdown value={sort} onChange={setSort} />
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.category || filters.type || filters.location || search) && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-gray-500">Active filters:</span>
                {search && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    &quot;{search}&quot;
                    <button onClick={() => setSearch('')} className="hover:text-green-900">×</button>
                  </span>
                )}
                {filters.category && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {filters.category}
                    <button onClick={() => setFilters({...filters, category: ''})} className="hover:text-green-900">×</button>
                  </span>
                )}
                {filters.type && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {filters.type}
                    <button onClick={() => setFilters({...filters, type: ''})} className="hover:text-green-900">×</button>
                  </span>
                )}
                {filters.location && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {filters.location}
                    <button onClick={() => setFilters({...filters, location: ''})} className="hover:text-green-900">×</button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearch('');
                    setFilters({ category: '', type: '', location: '' });
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Job Cards */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-xl p-6 animate-pulse border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gray-200 rounded-xl" />
                      <div className="flex-1">
                        <div className="h-5 bg-gray-200 rounded w-2/3 mb-3" />
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
                        <div className="flex gap-2">
                          <div className="h-6 bg-gray-200 rounded-full w-16" />
                          <div className="h-6 bg-gray-200 rounded-full w-20" />
                          <div className="h-6 bg-gray-200 rounded-full w-24" />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="h-5 bg-gray-200 rounded w-24 mb-2" />
                        <div className="h-4 bg-gray-200 rounded w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : jobs.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  We couldn&apos;t find any jobs matching your criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={() => {
                    setSearch('');
                    setFilters({ category: '', type: '', location: '' });
                  }}
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Load More */}
            {jobs.length > 0 && jobs.length < totalJobs && (
              <div className="text-center mt-8">
                <button className="px-8 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-full hover:bg-green-50 transition-colors">
                  Load More Jobs
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
