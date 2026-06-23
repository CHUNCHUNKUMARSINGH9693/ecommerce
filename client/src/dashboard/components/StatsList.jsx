import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const StatsList = () => {
  const secondaryStats = [
    {
      label: "Approval Rate",
      value: "84%",
      trend: "up",
      detail: "+2% from last week"
    },
    {
      label: "Average Payout",
      value: "$12.40",
      trend: "neutral",
      detail: "Consistent"
    },
    {
      label: "Active Days",
      value: "18",
      trend: "up",
      detail: "This month"
    },
    {
      label: "Pending Appeals",
      value: "1",
      trend: "down",
      detail: "-2 resolved"
    }
  ];

  return (
    <div className="bg-[#110C0A] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-black uppercase italic text-lg tracking-tighter text-white">
          Key Statistics <span className="text-orange-600">.</span>
        </h3>
        <button className="text-white/20 text-[10px] font-black uppercase tracking-widest hover:text-orange-500 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {secondaryStats.map((stat, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-orange-500/30 hover:bg-white/[0.04] transition-all duration-300 group"
          >
            <div className="space-y-1">
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] italic group-hover:text-white/50 transition-colors">
                {stat.label}
              </p>
              <p className="text-[10px] text-orange-500/60 font-bold uppercase tracking-tight">
                {stat.detail}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xl font-black text-white italic tracking-tighter">
                {stat.value}
              </p>
              <div className="mt-1 flex justify-end">
                {stat.trend === "up" && (
                  <div className="bg-emerald-500/10 p-1 rounded-md border border-emerald-500/20">
                    <TrendingUp size={12} className="text-emerald-500" />
                  </div>
                )}
                {stat.trend === "down" && (
                  <div className="bg-rose-500/10 p-1 rounded-md border border-rose-500/20">
                    <TrendingDown size={12} className="text-rose-500" />
                  </div>
                )}
                {stat.trend === "neutral" && (
                  <div className="bg-white/5 p-1 rounded-md border border-white/10">
                    <Minus size={12} className="text-white/20" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modernized Footer */}
      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
        <p className="text-[9px] text-white/20 font-black uppercase tracking-[0.2em]">
          Live sync active: 24h refresh
        </p>
      </div>
    </div>
  );
};

export default StatsList;