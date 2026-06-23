import React from 'react';
import { TrendingUp, Users, ShoppingBag, BarChart3 } from 'lucide-react';

const OverviewCard = ({ title, value, sub, type }) => {
  // Mapping themes to the dashboard's specific orange/gold and dark accents
  const icons = {
    sales: { icon: <TrendingUp size={16} />, color: "text-orange-500", bg: "bg-orange-500/10" },
    orders: { icon: <ShoppingBag size={16} />, color: "text-orange-400", bg: "bg-orange-400/10" },
    customers: { icon: <Users size={16} />, color: "text-white/60", bg: "bg-white/5" },
    default: { icon: <BarChart3 size={16} />, color: "text-orange-600", bg: "bg-orange-600/10" }
  };

  const theme = icons[type] || icons.default;

  return (
    <div className="relative bg-[#1A1613] p-5 rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden group hover:border-orange-500/30 transition-all duration-500">
      {/* Decorative Wave Texture */}
      <div className="absolute bottom-0 left-0 w-full opacity-10 group-hover:opacity-20 transition-opacity">
        <svg viewBox="0 0 100 20" className="w-full h-auto">
          <path 
            d="M0 20 Q 25 5 50 15 T 100 10 L 100 20 L 0 20" 
            fill="url(#card-gradient)" 
          />
          <defs>
            <linearGradient id="card-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
            {title}
          </p>
          {/* Icon Container */}
          <div className={`p-2 rounded-xl border border-white/5 ${theme.bg} ${theme.color}`}>
            {theme.icon}
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-2xl font-black text-white italic tracking-tighter">
            {value}
          </h3>
          {/* Growth/Sub Indicator */}
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">
              {sub}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;