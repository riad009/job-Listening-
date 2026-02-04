'use client';

export default function SearchBar({ value, onChange, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center bg-white rounded-full shadow-xl shadow-black/10 border border-white/20 overflow-hidden">
        {/* Search Icon */}
        <div className="pl-6 flex items-center pointer-events-none">
          <svg
            className="h-6 w-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search jobs, companies, or keywords..."
          className="flex-1 px-4 py-5 text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none text-lg"
        />
        
        {/* Location Dropdown (Desktop) */}
        <div className="hidden md:flex items-center border-l border-gray-200 px-4">
          <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <select className="bg-transparent text-gray-600 focus:outline-none cursor-pointer pr-2">
            <option>All Locations</option>
            <option>Remote</option>
            <option>San Francisco</option>
            <option>New York</option>
            <option>Los Angeles</option>
          </select>
        </div>
        
        {/* Search Button */}
        <div className="pr-2">
          <button
            type="submit"
            className="px-8 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all shadow-lg shadow-green-600/30"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
