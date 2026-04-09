import React from 'react';

const StatsList = () => {
  // Mock data for the statistics
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
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">Key Statistics</h3>
        <button className="text-indigo-600 text-xs font-semibold hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {secondaryStats.map((stat, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-tight">
                {stat.label}
              </p>
              <p className="text-sm text-gray-400 text-[11px]">
                {stat.detail}
              </p>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-gray-900 leading-none">
                {stat.value}
              </p>
              <div className="mt-1 flex justify-end">
                {stat.trend === "up" && (
                  <span className="text-emerald-500 text-[10px]">▲</span>
                )}
                {stat.trend === "down" && (
                  <span className="text-rose-500 text-[10px]">▼</span>
                )}
                {stat.trend === "neutral" && (
                  <span className="text-gray-300 text-[10px]">●</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mini Footer/Notice in the list */}
      <div className="mt-6 pt-4 border-t border-gray-50 text-center">
        <p className="text-[10px] text-gray-400 italic">
          Stats are updated every 24 hours.
        </p>
      </div>
    </div>
  );
};

export default StatsList;