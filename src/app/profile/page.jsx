'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const savedJobs = [
    { id: 1, title: 'Senior React Developer', company: 'TechCorp', salary: '$120k - $150k', location: 'Remote' },
    { id: 2, title: 'Full Stack Engineer', company: 'StartupXYZ', salary: '$100k - $130k', location: 'San Francisco' },
    { id: 3, title: 'Frontend Developer', company: 'DesignHub', salary: '$90k - $120k', location: 'New York' },
];

const appliedJobs = [
    { id: 1, title: 'Product Designer', company: 'CreativeCo', status: 'Under Review', appliedDate: '2026-02-01' },
    { id: 2, title: 'UX Researcher', company: 'UserFirst', status: 'Interview', appliedDate: '2026-01-28' },
];

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your profile...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    const tabs = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'saved', label: 'Saved Jobs', icon: '❤️' },
        { id: 'applied', label: 'Applications', icon: '📝' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-green-600 to-teal-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Avatar */}
                        <div className="relative">
                            {session.user?.image ? (
                                <img 
                                    src={session.user.image} 
                                    alt={session.user.name || 'Profile'} 
                                    className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
                                />
                            ) : (
                                <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-green-600 border-4 border-white shadow-lg">
                                    {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || 'U'}
                                </div>
                            )}
                            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>

                        {/* User Info */}
                        <div className="text-center md:text-left text-white flex-1">
                            <h1 className="text-3xl font-bold">{session.user?.name || 'User'}</h1>
                            <p className="text-green-100 mt-1">{session.user?.email}</p>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
                                <span className="flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                    San Francisco, CA
                                </span>
                                <span className="flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Open to work
                                </span>
                                <span className="text-sm text-green-100">Member since Feb 2026</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <Link 
                                href="/jobs"
                                className="px-5 py-2.5 bg-white text-green-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
                            >
                                Find Jobs
                            </Link>
                            <button
                                onClick={() => signOut({ callbackUrl: '/login' })}
                                className="px-5 py-2.5 bg-white/20 text-white font-semibold rounded-full hover:bg-white/30 transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-1 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-5 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                                    activeTab === tab.id
                                        ? 'border-green-600 text-green-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <span>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'overview' && (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Stats */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="grid sm:grid-cols-3 gap-4">
                                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                                    <div className="text-3xl font-bold text-gray-900">{savedJobs.length}</div>
                                    <div className="text-gray-500">Saved Jobs</div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                                    <div className="text-3xl font-bold text-gray-900">{appliedJobs.length}</div>
                                    <div className="text-gray-500">Applications</div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                                    <div className="text-3xl font-bold text-green-600">1</div>
                                    <div className="text-gray-500">Interviews</div>
                                </div>
                            </div>

                            {/* Recent Applications */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-bold text-gray-900">Recent Applications</h2>
                                    <button onClick={() => setActiveTab('applied')} className="text-green-600 text-sm font-medium hover:underline">
                                        View All
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {appliedJobs.map((job) => (
                                        <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{job.title}</h3>
                                                <p className="text-sm text-gray-500">{job.company}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                                    job.status === 'Interview' 
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                    {job.status}
                                                </span>
                                                <p className="text-xs text-gray-400 mt-1">{job.appliedDate}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Profile Completion */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                <h2 className="font-bold text-gray-900 mb-4">Profile Strength</h2>
                                <div className="relative pt-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-green-600">Good</span>
                                        <span className="text-sm font-medium text-gray-500">70%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-green-600">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Basic info added
                                    </div>
                                    <div className="flex items-center gap-2 text-green-600">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Email verified
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10" strokeWidth={2} />
                                        </svg>
                                        Add resume
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10" strokeWidth={2} />
                                        </svg>
                                        Add work experience
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white">
                                <h2 className="font-bold mb-2">Complete Your Profile</h2>
                                <p className="text-sm text-green-100 mb-4">
                                    Add more details to stand out to employers
                                </p>
                                <button className="w-full py-2 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'saved' && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Saved Jobs ({savedJobs.length})</h2>
                        <div className="space-y-4">
                            {savedJobs.map((job) => (
                                <div key={job.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-green-200 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold">
                                            {job.company.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{job.title}</h3>
                                            <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-semibold text-gray-900">{job.salary}</span>
                                        <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>
                                        <Link 
                                            href={`/jobs/${job.id}`}
                                            className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            Apply
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'applied' && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Job Applications ({appliedJobs.length})</h2>
                        <div className="space-y-4">
                            {appliedJobs.map((job) => (
                                <div key={job.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold">
                                            {job.company.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{job.title}</h3>
                                            <p className="text-sm text-gray-500">{job.company}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                                job.status === 'Interview' 
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {job.status}
                                            </span>
                                            <p className="text-xs text-gray-400 mt-1">Applied {job.appliedDate}</p>
                                        </div>
                                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="max-w-2xl space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Account Settings</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        defaultValue={session.user?.name || ''} 
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        defaultValue={session.user?.email || ''} 
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors">
                                    Save Changes
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Notifications</h2>
                            <div className="space-y-4">
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="text-gray-700">Email notifications for new jobs</span>
                                    <input type="checkbox" defaultChecked className="w-5 h-5 text-green-600 rounded focus:ring-green-500" />
                                </label>
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="text-gray-700">Application status updates</span>
                                    <input type="checkbox" defaultChecked className="w-5 h-5 text-green-600 rounded focus:ring-green-500" />
                                </label>
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="text-gray-700">Weekly job digest</span>
                                    <input type="checkbox" className="w-5 h-5 text-green-600 rounded focus:ring-green-500" />
                                </label>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-red-200 p-6">
                            <h2 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h2>
                            <p className="text-gray-500 text-sm mb-4">Once you delete your account, there is no going back.</p>
                            <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors">
                                Delete Account
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
