import React from 'react';

const RewardCard = ({ title, cost, icon, color, tag }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between hover:border-indigo-200 hover:shadow-md transition-all group">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
            {icon}
          </div>
          {tag && (
            <span className="bg-rose-100 text-rose-600 text-[10px] font-black px-2 py-1 rounded-lg uppercase">
              {tag}
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-6 font-medium">Earned points can be converted instantly.</p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Cost</p>
          <p className="text-xl font-black text-gray-900">{cost} <span className="text-xs text-gray-400">Pts</span></p>
        </div>
        <button className="p-3 bg-gray-50 rounded-xl text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RewardCard;