import React from 'react';

const BalanceCard = ({ points, value }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-indigo-100 text-sm font-medium uppercase tracking-widest mb-1">Available Balance</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-5xl font-black">{points}</h2>
            <span className="text-xl font-medium text-indigo-200">Points</span>
          </div>
          <p className="mt-2 text-indigo-100/80 font-medium italic">Approximate value: {value}</p>
        </div>

        <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all active:scale-95 shadow-lg">
          Redeem Points
        </button>
      </div>
    </div>
  );
};

export default BalanceCard;