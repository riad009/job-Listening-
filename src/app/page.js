import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-600 via-green-700 to-teal-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-300/10 rounded-full blur-lg"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-green-100 text-sm mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Over 50,000+ jobs available
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your <span className="text-green-300">Dream Job</span> Today
            </h1>
            
            <p className="text-xl lg:text-2xl text-green-100 mb-10 max-w-2xl mx-auto">
              Connect with top companies and discover opportunities that match your skills and ambitions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/jobs" 
                className="px-8 py-4 bg-white text-green-700 font-bold text-lg rounded-full hover:bg-gray-100 transition-all shadow-xl shadow-black/20 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Browse Jobs
              </Link>
              <Link 
                href="/jobs/post" 
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative -mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl mb-2">💼</div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900">50K+</div>
                <div className="text-gray-500 mt-1">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🏢</div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900">10K+</div>
                <div className="text-gray-500 mt-1">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">👥</div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900">2M+</div>
                <div className="text-gray-500 mt-1">Job Seekers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900">100K+</div>
                <div className="text-gray-500 mt-1">Hired</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Popular Categories</h2>
          <p className="text-lg text-gray-600">Explore opportunities across various industries</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Engineering', icon: '💻', jobs: '2.5k+', color: 'bg-blue-50 hover:bg-blue-100 border-blue-200' },
            { name: 'Design', icon: '🎨', jobs: '1.2k+', color: 'bg-purple-50 hover:bg-purple-100 border-purple-200' },
            { name: 'Marketing', icon: '📈', jobs: '800+', color: 'bg-orange-50 hover:bg-orange-100 border-orange-200' },
            { name: 'Sales', icon: '💼', jobs: '650+', color: 'bg-green-50 hover:bg-green-100 border-green-200' },
            { name: 'Data Science', icon: '📊', jobs: '900+', color: 'bg-teal-50 hover:bg-teal-100 border-teal-200' },
            { name: 'Finance', icon: '💰', jobs: '400+', color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200' },
          ].map((category) => (
            <Link 
              key={category.name}
              href={`/jobs?category=${category.name}`}
              className={`p-6 rounded-2xl border ${category.color} transition-all text-center group`}
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-bold text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{category.jobs} jobs</p>
            </Link>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Get started in just a few simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Create Account</h3>
              <p className="text-gray-600">Sign up for free and complete your profile to get noticed by top employers.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Find Jobs</h3>
              <p className="text-gray-600">Browse thousands of jobs and filter by location, salary, and job type.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Apply & Get Hired</h3>
              <p className="text-gray-600">Submit your application with one click and track your progress.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
          </div>
          <div className="relative">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have found their dream jobs through JobPortal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/jobs" 
                className="px-8 py-4 bg-white text-green-700 font-bold text-lg rounded-full hover:bg-gray-100 transition-all"
              >
                Find Jobs Now
              </Link>
              <Link 
                href="/register" 
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xl font-bold">JobPortal</span>
              </div>
              <p className="text-gray-400">Connecting talent with opportunity since 2024.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Job Seekers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/jobs" className="hover:text-white">Browse Jobs</Link></li>
                <li><Link href="/register" className="hover:text-white">Create Account</Link></li>
                <li><Link href="/profile" className="hover:text-white">My Profile</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Employers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/jobs/post" className="hover:text-white">Post a Job</Link></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Employer Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JobPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}