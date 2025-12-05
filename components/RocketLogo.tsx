import React from 'react';

export const RocketLogo: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer Glow */}
      <div className="absolute inset-0 bg-orange-500 rounded-full opacity-20 blur-xl animate-pulse" />
      
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]"
      >
        <defs>
          <linearGradient id="rocketGradient" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F97316" /> {/* Orange-500 */}
            <stop offset="1" stopColor="#DB2777" /> {/* Pink-600 */}
          </linearGradient>
        </defs>
        
        {/* Main Body - Upward Chevron/Arrow shape */}
        <path
          d="M50 15 L80 55 L50 40 L20 55 L50 15Z"
          fill="url(#rocketGradient)"
          stroke="none"
        />
        
        {/* Lower Body - Chevron shape below */}
        <path
          d="M50 50 L75 80 L50 65 L25 80 L50 50Z"
          fill="url(#rocketGradient)"
          stroke="none"
          opacity="0.9"
        />
        
      </svg>
    </div>
  );
};
