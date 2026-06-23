import React from 'react';
import { DollarSign, ShoppingCart, Package, Users, Plus, LayoutGrid, MousePointer2 } from 'lucide-react';

const OverviewCards = () => {
  const stats = [
    { label: "Total Sales", value: "$12,450", icon: <DollarSign size={16} />, isPrimary: true },
    { label: "Total Sales", value: "354", icon: <LayoutGrid size={16} />, showDot: true },
    { label: "Reports", value: "128", icon: <MousePointer2 size={16} />, showDot: true },
    { label: "Refine Icons", value: "1,260", icon: <Plus size={16} />, showDot: true },
  ];

  return (
    <div className="w-full bg-[#110C0A] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 flex-grow">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`p-7 flex flex-col justify-between min-h-[160px] relative transition-all duration-500 group hover:bg-white/[0.02]
              border-b lg:border-b-0 lg:border-r border-white/5 last:border-b-0 lg:last:border-r-0`}
          >
            {/* 1. Background Wave Texture for Primary Stat */}
            {stat.isPrimary && (
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent" />
                <svg className="absolute bottom-0 w-full h-1/2" viewBox="0 0 100 20">
                  <path d="M0 20 Q 25 5 50 15 T 100 10 L 100 20 L 0 20" fill="#f97316" />
                </svg>
              </div>
            )}

            {/* 2. Label & Icon */}
            <div className="relative z-10 flex justify-between items-start">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-black italic">
                {stat.label}
              </span>
              <div className={`p-2 rounded-xl border border-white/10 ${stat.isPrimary ? 'bg-orange-600/20 text-orange-500' : 'bg-white/5 text-white/20'}`}>
                {stat.icon}
              </div>
            </div>

            {/* 3. Value & Status */}
            <div className="relative z-10 flex items-center gap-3 mt-6">
              <h2 className="text-white text-4xl font-black italic tracking-tighter drop-shadow-md">
                {stat.value}
              </h2>
              {stat.showDot && (
                <div className="w-2 h-2 bg-orange-600 rounded-full shadow-[0_0_12px_rgba(234,88,12,0.8)] animate-pulse" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 4. "More" Action Section */}
      <div className="lg:w-[180px] p-8 bg-gradient-to-b from-white/[0.04] to-transparent border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col items-center justify-center gap-4 group cursor-pointer">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-black italic">More</span>
        <div className="relative transform group-hover:scale-110 transition-transform duration-500">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 shadow-xl">
            <ShoppingCart size={32} className="text-white/10" strokeWidth={1} />
          </div>
          {/* Active Order Indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-600 rounded-full border-4 border-[#110C0A] shadow-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCards;