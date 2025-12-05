import React, { useState, useEffect, useCallback } from 'react';
import { fetchJobs } from './services/jobService';
import { Job, FetchStatus } from './types';
import { RocketLogo } from './components/RocketLogo';
import { JobCard } from './components/JobCard';
import { Search, RefreshCw, Zap, Sparkles, AlertCircle } from 'lucide-react';

const SAMPLE_QUERIES = [
  "Vibecoding",
  "React AI",
  "Creative Developer",
  "Prompt Engineer",
  "Next.js"
];

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [query, setQuery] = useState<string>("Vibecoding AI Engineer");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const performSearch = useCallback(async (searchQuery: string) => {
    setStatus(FetchStatus.LOADING);
    setErrorMsg(null);
    try {
      const results = await fetchJobs(searchQuery);
      setJobs(results);
      setStatus(FetchStatus.SUCCESS);
    } catch (err) {
      console.error(err);
      setStatus(FetchStatus.ERROR);
      setErrorMsg("Failed to retrieve jobs from the cosmos. Try again.");
    }
  }, []);

  // Initial load
  useEffect(() => {
    performSearch(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    performSearch(query);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[100px]" />
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div className="flex items-center gap-4">
            <RocketLogo className="w-14 h-14 md:w-20 md:h-20" />
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-100 to-orange-200 drop-shadow-sm lowercase">
                vibecoding.careers
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <a href="https://github.com/vibe-coding" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Community</a>
             <a href="#" className="px-5 py-2 rounded-full bg-slate-800 border border-slate-700 hover:border-orange-500 text-sm font-semibold transition-all hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]">Post a Job</a>
          </div>
        </header>

        {/* Search Section */}
        <div className="flex flex-col items-center mb-16 text-center">
           <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
             Find Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">Vibecoding Job</span>
           </h2>
           <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">
             The definitive job board for the next generation of AI-fluent developers. Join the companies building the future.
           </p>
          
          <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative flex items-center bg-slate-900/90 border border-slate-700 rounded-full p-2 shadow-2xl backdrop-blur-sm focus-within:border-orange-500/50 transition-colors">
              <Search className="text-slate-500 ml-4 w-5 h-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search specifically (e.g., 'React AI', 'Prompt Engineer')..."
                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 px-4 py-3 h-full"
              />
              <button 
                type="submit"
                disabled={status === FetchStatus.LOADING}
                className="bg-gradient-to-r from-orange-600 to-pink-600 text-white px-8 py-3 rounded-full font-bold text-sm hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all transform active:scale-95"
              >
                {status === FetchStatus.LOADING ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </form>

          {/* Quick Filters / Tags */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {SAMPLE_QUERIES.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setQuery(q);
                  performSearch(q);
                }}
                className="px-4 py-1.5 rounded-full text-xs font-medium bg-slate-800/50 border border-slate-700 hover:border-pink-500/50 hover:text-pink-300 transition-colors text-slate-400"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="min-h-[400px]">
          {status === FetchStatus.LOADING && (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-slate-800 border-t-orange-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <Zap className="w-6 h-6 text-pink-500 animate-pulse" />
                </div>
              </div>
              <p className="text-slate-400 animate-pulse">Scanning for opportunities...</p>
            </div>
          )}

          {status === FetchStatus.ERROR && (
             <div className="flex flex-col items-center justify-center h-64 gap-4 text-red-400 bg-red-950/20 rounded-2xl border border-red-900/50 p-8">
               <AlertCircle className="w-12 h-12" />
               <p className="text-lg font-medium">{errorMsg}</p>
               <button 
                onClick={() => performSearch(query)}
                className="px-6 py-2 bg-red-900/50 hover:bg-red-800/50 rounded-lg text-sm transition-colors border border-red-800"
               >
                 Retry Mission
               </button>
             </div>
          )}

          {status === FetchStatus.SUCCESS && jobs.length === 0 && (
             <div className="flex flex-col items-center justify-center h-64 gap-4 text-slate-500">
               <Sparkles className="w-12 h-12 text-slate-700" />
               <p>No vibes found for this query. Try a different keyword.</p>
             </div>
          )}

          {status === FetchStatus.SUCCESS && jobs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job, idx) => (
                <JobCard key={job.id || idx} job={job} />
              ))}
            </div>
          )}
        </div>
        
        <footer className="mt-20 border-t border-slate-800 pt-8 text-center text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} vibecoding.careers. Built with Gemini 2.5 & React.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;