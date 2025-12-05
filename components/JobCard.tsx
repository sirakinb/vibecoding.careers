import React from 'react';
import { Job } from '../types';
import { MapPin, Briefcase, ExternalLink, DollarSign } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="group relative glass-panel rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-slate-800/80 border border-white/5 hover:border-orange-500/30 flex flex-col h-full">
      
      {/* Hover Gradient Border Effect */}
      <div className="absolute -inset-px bg-gradient-to-r from-orange-500 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-orange-100 transition-colors">
            {job.title}
          </h3>
          <p className="text-pink-400 font-medium text-sm mt-1">{job.company}</p>
        </div>
        <a 
          href={job.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-400 transition-colors"
        >
          <ExternalLink size={18} />
        </a>
      </div>

      <div className="space-y-2 mb-6 flex-grow">
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
          {job.description}
        </p>
      </div>

      <div className="space-y-3 mt-auto">
        <div className="flex flex-wrap gap-2 mb-4">
          {job.tags?.map((tag, i) => (
            <span key={i} className="px-2 py-1 text-xs rounded-md bg-slate-800/50 text-slate-300 border border-slate-700">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1">
            <MapPin size={14} className="text-orange-500" />
            {job.location}
          </div>
          <div className="flex items-center gap-1">
            <Briefcase size={14} className="text-pink-500" />
            {job.type}
          </div>
          {job.salary && (
             <div className="flex items-center gap-1 text-green-400/80">
             <DollarSign size={14} />
             {job.salary}
           </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-800">
         <a 
            href={job.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block text-center py-2.5 rounded-lg bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-500 hover:to-pink-500 text-white text-sm font-semibold transition-all shadow-lg shadow-orange-900/20"
         >
           Apply Now
         </a>
      </div>
    </div>
  );
};
