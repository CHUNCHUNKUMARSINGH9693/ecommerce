import React from 'react';
import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react';

const OverviewCards = () => {
  const stats = [
    { label: "Total Sales", value: "$12,450", icon: <DollarSign size={16} /> },
    { label: "Orders", value: "354", icon: <ShoppingCart size={16} />, showDot: true },
    { label: "Products", value: "128", icon: <Package size={16} />, showDot: true },
    { label: "Customers", value: "1,260", icon: <Users size={16} />, showDot: true },
  ];

  return (
    /* Main container: No gap, overflow hidden to keep corners rounded */
    <div className="w-full bg-[#1a1310] border border-white/5 rounded-[2rem] overflow-hidden flex flex-col lg:flex-row">
      
      {/* 1. Stats Group */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 flex-grow">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`p-6 flex flex-col justify-between min-h-[130px] relative
              /* Add dividers between items: Bottom border on mobile, Right border on desktop */
              border-b lg:border-b-0 lg:border-r border-white/5 last:border-b-0 lg:last:border-r-0`}
          >
            {/* Label and Icon */}
            <div className="flex justify-between items-start">
              <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-black">
                {stat.label}
              </span>
              <div className="text-orange-500/40">
                {stat.icon}
              </div>
            </div>

            {/* Value and Glow Dot */}
            <div className="flex items-baseline gap-3 mt-4">
              <h2 className="text-white text-3xl font-bold tracking-tight">
                {stat.value}
              </h2>
              {stat.showDot && (
                <div className="w-4 h-4 rounded-full border border-orange-500/20 flex items-center justify-center">
                  <div className="w-1 h-1 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 2. "More" Section - Fixed width on desktop, full width on mobile */}
      <div className="lg:w-[180px] p-6 bg-white/[0.02] border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col items-center justify-center gap-3">
        <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-black">More</span>
        <div className="relative">
          <ShoppingCart size={42} className="text-gray-800" strokeWidth={1} />
          {/* Subtle orange indicator on the cart */}
          <div className="absolute top-1 right-1 w-2 h-2 bg-orange-600 rounded-full shadow-[0_0_10px_rgba(234,88,12,0.5)]"></div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCards;