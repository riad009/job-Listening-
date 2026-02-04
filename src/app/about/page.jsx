import React from 'react';
import Link from 'next/link';

const stats = [
    { value: '5M+', label: 'Jobs Posted', icon: '💼' },
    { value: '500K+', label: 'Companies', icon: '🏢' },
    { value: '15M+', label: 'Professionals', icon: '👥' },
    { value: '98%', label: 'Satisfaction', icon: '⭐' },
];

const values = [
    {
        title: 'Trust & Safety',
        description: 'We prioritize the security of our users with verified profiles, secure payments, and 24/7 support.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
    {
        title: 'Quality Matches',
        description: 'Our AI-powered matching system connects the right talent with the right opportunities.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        title: 'Global Reach',
        description: 'Access opportunities and talent from around the world with our international platform.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        title: 'Career Growth',
        description: 'We provide resources, insights, and tools to help professionals advance their careers.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        ),
    },
];

const team = [
    { name: 'Sarah Johnson', role: 'CEO & Founder', image: 'SJ' },
    { name: 'Michael Chen', role: 'CTO', image: 'MC' },
    { name: 'Emily Davis', role: 'Head of Product', image: 'ED' },
    { name: 'James Wilson', role: 'Head of Growth', image: 'JW' },
];

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold mb-6">
                            About JobPortal
                        </span>
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                            Connecting <span className="text-green-400">talent</span> with{' '}
                            <span className="text-green-400">opportunity</span>
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            We're on a mission to create economic opportunities so people have better lives. 
                            Our platform connects businesses with exceptional professionals from around the world.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="relative -mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <div className="text-3xl mb-2">{stat.icon}</div>
                                    <div className="text-3xl lg:text-4xl font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-gray-500 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-green-600 font-semibold">Our Mission</span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-6">
                            Empowering the workforce of tomorrow
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-6">
                            JobPortal was founded with a simple belief: talent is everywhere, but opportunity is not. 
                            We're changing that by building the world's most trusted platform for connecting 
                            professionals with businesses that need their skills.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            Whether you're a company looking to build your dream team or a professional seeking 
                            your next great opportunity, we're here to help you succeed.
                        </p>
                        <Link 
                            href="/jobs" 
                            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors"
                        >
                            Explore Opportunities
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                    <div className="relative">
                        <div className="aspect-square bg-gradient-to-br from-green-400 to-teal-500 rounded-3xl flex items-center justify-center">
                            <div className="text-center text-white p-8">
                                <div className="text-6xl mb-4">🌟</div>
                                <h3 className="text-2xl font-bold mb-2">Join Our Community</h3>
                                <p className="text-green-100">15M+ professionals trust us</p>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-400 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                            🚀
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="text-green-600 font-semibold">Our Values</span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">
                            What drives us forward
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value) => (
                            <div key={value.title} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all">
                                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-12">
                    <span className="text-green-600 font-semibold">Our Team</span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">
                        Meet the people behind JobPortal
                    </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member) => (
                        <div key={member.name} className="text-center group">
                            <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center text-white text-3xl font-bold group-hover:scale-105 transition-transform shadow-lg">
                                {member.image}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                            <p className="text-gray-500">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-green-600 to-teal-600 py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                        Ready to get started?
                    </h2>
                    <p className="text-xl text-green-100 mb-8">
                        Join millions of professionals and companies finding success on JobPortal.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            href="/jobs" 
                            className="px-8 py-4 bg-white text-green-600 font-bold rounded-full hover:bg-gray-100 transition-colors"
                        >
                            Find Jobs
                        </Link>
                        <Link 
                            href="/jobs/post" 
                            className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
                        >
                            Post a Job
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;