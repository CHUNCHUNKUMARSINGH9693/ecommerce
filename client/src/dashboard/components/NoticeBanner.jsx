import React from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';

const NoticeBanner = () => {
  return (
    <div className="group relative w-full bg-[#1A1613] border border-white/5 rounded-2xl md:rounded-[2rem] p-5 md:p-6 shadow-2xl overflow-hidden transition-all duration-500 hover:border-orange-500/30">
      {/* Subtle background warning glow */}
      <div className="absolute top-0 left-0 w-1 h-full bg-orange-600 shadow-[0_0_20px_rgba(234,88,12,0.5)]" />
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-orange-600/5 blur-[50px] rounded-full" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Icon with pulse effect */}
          <div className="p-3 bg-orange-600/10 rounded-xl border border-orange-500/20">
            <AlertTriangle className="text-orange-500 animate-pulse" size={20} />
          </div>

          <div>
            <h3 className="text-white font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] italic">
              Critical Action Required
            </h3>
            <p className="text-white/40 text-xs md:text-sm mt-1 font-medium max-w-xl">
              You have pending account penalties. Resolve these immediately to maintain your 
              <span className="text-orange-500 font-bold ml-1 italic uppercase tracking-tighter">
                Premium Merchant Status.
              </span>
            </p>
          </div>
        </div>

        {/* Action Link */}
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-orange-600 hover:border-orange-600 transition-all duration-300 group/btn">
          Resolve Now
          <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default NoticeBanner;