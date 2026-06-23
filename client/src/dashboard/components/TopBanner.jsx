import React from 'react';
import { Zap, ChevronRight } from 'lucide-react';

const TopBanner = () => {
  return (
    <div className="relative w-full bg-[#1A1613] border border-white/5 rounded-2xl md:rounded-[2rem] p-4 md:p-5 shadow-2xl overflow-hidden group">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-600/10 via-transparent to-transparent opacity-50 pointer-events-none" />
      <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-32 h-32 bg-orange-500/20 blur-[60px] rounded-full" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          {/* Status Badge */}
          <div className="flex items-center gap-2 bg-orange-600 px-3 py-1.5 rounded-xl shadow-[0_0_15px_rgba(234,88,12,0.4)]">
            <Zap size={12} className="text-white fill-white animate-pulse" />
            <span className="text-white text-[10px] font-black uppercase tracking-widest">Update</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
            <p className="text-white font-black italic text-sm md:text-base tracking-tight uppercase">
              Product Code Optimization <span className="text-orange-500">v2.0</span>
            </p>
            <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/10" />
            <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-widest">
              Check your settings to deploy now.
            </p>
          </div>
        </div>

        {/* View Details Button */}
        <button className="flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-orange-600 hover:border-orange-600 transition-all duration-300 group/btn">
          View Details
          <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default TopBanner;