import React from 'react';

const AccountHealth = () => {
  return (
    <div className="bg-[#1A1613] p-6 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group">
      {/* Subtle background glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-600/10 blur-[50px] rounded-full" />
      
      <h3 className="font-black text-white/50 text-[10px] uppercase tracking-[0.3em] mb-8">
        Performance Metrics
      </h3>

      <div className="flex flex-col items-center">
        {/* Modern Gauge UI */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Background Track */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="transparent"
              stroke="#2A2420"
              strokeWidth="12"
              strokeDasharray="440"
              className="rounded-full"
            />
            {/* Progress Bar (0% state) */}
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="transparent"
              stroke="url(#orange-gradient)"
              strokeWidth="12"
              strokeDasharray="440"
              strokeDashoffset="440" 
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="orange-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Text */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-white italic tracking-tighter">0%</span>
            <span className="text-[8px] text-white/20 uppercase font-bold">Health Score</span>
          </div>
        </div>

        {/* Status Text Area */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <p className="font-black text-rose-500 uppercase text-[10px] tracking-widest">
              Critical Status
            </p>
          </div>
          
          <p className="text-white/40 text-[11px] leading-relaxed max-w-[180px] mx-auto font-medium">
            Your success rate is currently below platform standards. 
            <span className="text-orange-500 block mt-1 cursor-pointer hover:underline">
              Improve now →
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountHealth;