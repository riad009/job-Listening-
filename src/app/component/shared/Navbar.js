'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

const categories = [
    { name: 'Engineering', icon: '💻', jobs: '2.5k+' },
    { name: 'Design', icon: '🎨', jobs: '1.2k+' },
    { name: 'Marketing', icon: '📈', jobs: '800+' },
    { name: 'Sales', icon: '💼', jobs: '650+' },
    { name: 'Data Science', icon: '📊', jobs: '900+' },
    { name: 'Operations', icon: '⚙️', jobs: '400+' },
];

const Navbar = () => {
    const { data: session, status } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <>
            {/* Top Bar */}
            <div className="bg-gray-900 text-gray-300 text-sm hidden lg:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-10">
                        <div className="flex items-center gap-6">
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                +1 (555) 123-4567
                            </span>
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                support@jobportal.com
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <a href="#" className="hover:text-white transition-colors">Help</a>
                            <span className="text-gray-600">|</span>
                            {session ? (
                                <>
                                    <Link href="/profile" className="hover:text-white transition-colors flex items-center gap-2">
                                        <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                            {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || 'U'}
                                        </span>
                                        {session.user?.name || 'Profile'}
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
                                    <Link href="/register" className="bg-green-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-green-600 transition-colors">
                                        Join Free
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-8">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="text-2xl font-bold text-gray-900">JobPortal</span>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex items-center space-x-1">
                                <Link href="/jobs" className="px-4 py-2 text-gray-700 hover:text-green-600 font-medium rounded-lg hover:bg-gray-50 transition-all">
                                    Find Work
                                </Link>
                                
                                {/* Categories Dropdown */}
                                <div className="relative">
                                    <button 
                                        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                        onBlur={() => setTimeout(() => setIsCategoryOpen(false), 200)}
                                        className="px-4 py-2 text-gray-700 hover:text-green-600 font-medium rounded-lg hover:bg-gray-50 transition-all flex items-center gap-1"
                                    >
                                        Categories
                                        <svg className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    
                                    {isCategoryOpen && (
                                        <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-3 z-50">
                                            {categories.map((cat) => (
                                                <Link 
                                                    key={cat.name}
                                                    href={`/jobs?category=${cat.name}`}
                                                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xl">{cat.icon}</span>
                                                        <span className="font-medium text-gray-700">{cat.name}</span>
                                                    </div>
                                                    <span className="text-sm text-gray-400">{cat.jobs} jobs</span>
                                                </Link>
                                            ))}
                                            <div className="border-t border-gray-100 mt-2 pt-2 px-4">
                                                <Link href="/jobs" className="text-green-600 font-medium text-sm hover:text-green-700 flex items-center gap-1">
                                                    View all categories
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <Link href="/about" className="px-4 py-2 text-gray-700 hover:text-green-600 font-medium rounded-lg hover:bg-gray-50 transition-all">
                                    Why Us
                                </Link>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="hidden lg:flex items-center gap-3">
                            {session ? (
                                <>
                                    {/* User Profile Dropdown */}
                                    <div className="relative">
                                        <button 
                                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                                            onBlur={() => setTimeout(() => setIsProfileOpen(false), 200)}
                                            className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-all"
                                        >
                                            {session.user?.image ? (
                                                <img src={session.user.image} alt="" className="w-8 h-8 rounded-full" />
                                            ) : (
                                                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                    {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || 'U'}
                                                </div>
                                            )}
                                            <span className="font-medium text-gray-700">{session.user?.name?.split(' ')[0] || 'User'}</span>
                                            <svg className={`w-4 h-4 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        
                                        {isProfileOpen && (
                                            <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                                                <div className="px-4 py-3 border-b border-gray-100">
                                                    <p className="font-semibold text-gray-900">{session.user?.name || 'User'}</p>
                                                    <p className="text-sm text-gray-500 truncate">{session.user?.email}</p>
                                                </div>
                                                <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    <span className="text-gray-700">My Profile</span>
                                                </Link>
                                                <Link href="/profile?tab=saved" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                                    <span className="text-gray-700">Saved Jobs</span>
                                                </Link>
                                                <Link href="/profile?tab=applied" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    <span className="text-gray-700">Applications</span>
                                                </Link>
                                                <Link href="/profile?tab=settings" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span className="text-gray-700">Settings</span>
                                                </Link>
                                                <div className="border-t border-gray-100 mt-2 pt-2">
                                                    <button 
                                                        onClick={() => signOut({ callbackUrl: '/login' })}
                                                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors w-full text-left"
                                                    >
                                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                        <span className="text-gray-700">Sign Out</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <Link 
                                        href="/jobs/post" 
                                        className="px-5 py-2.5 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all shadow-lg shadow-green-600/25"
                                    >
                                        Post a Job
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-green-600 font-medium rounded-lg hover:bg-gray-50 transition-all">
                                        Log In
                                    </Link>
                                    <Link href="/register" className="px-4 py-2 text-green-600 border-2 border-green-600 font-semibold rounded-full hover:bg-green-50 transition-all">
                                        Sign Up
                                    </Link>
                                    <Link 
                                        href="/jobs/post" 
                                        className="px-5 py-2.5 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all shadow-lg shadow-green-600/25"
                                    >
                                        Post a Job
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden flex items-center gap-3">
                            <Link href="/login" className="text-gray-600 font-medium">
                                Log In
                            </Link>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden border-t border-gray-100 bg-white">
                        <div className="px-4 py-4 space-y-1">
                            <Link 
                                href="/jobs" 
                                className="block px-4 py-3 text-gray-700 hover:text-green-600 font-medium rounded-lg hover:bg-gray-50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Find Work
                            </Link>
                            <div className="px-4 py-2">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Categories</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {categories.map((cat) => (
                                        <Link 
                                            key={cat.name}
                                            href={`/jobs?category=${cat.name}`}
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-green-600 rounded-lg hover:bg-gray-50"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <span>{cat.icon}</span>
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <Link 
                                href="/about" 
                                className="block px-4 py-3 text-gray-700 hover:text-green-600 font-medium rounded-lg hover:bg-gray-50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Why Us
                            </Link>
                            <div className="pt-4 pb-2 space-y-2 border-t border-gray-100 mt-4">
                                <Link 
                                    href="/register" 
                                    className="block w-full px-4 py-3 text-center text-green-600 border-2 border-green-600 font-semibold rounded-full hover:bg-green-50"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                                <Link 
                                    href="/jobs/post" 
                                    className="block w-full px-4 py-3 text-center bg-green-600 text-white font-semibold rounded-full hover:bg-green-700"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Post a Job
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;