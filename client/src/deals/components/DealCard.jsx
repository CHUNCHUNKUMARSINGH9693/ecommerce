import React from 'react';

const DealCard = ({ deal }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
      {/* Top Section */}
      <div className="p-5 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            {deal.image}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 leading-tight">{deal.title}</h3>
            <p className="text-xs text-gray-500 uppercase font-semibold mt-0.5">{deal.brand}</p>
          </div>
        </div>
        <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
          deal.type === 'High Priority' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'
        }`}>
          {deal.type}
        </span>
      </div>

      {/* Divider */}
      <div className="relative border-t border-dashed border-gray-200 mx-5">
        <div className="absolute -left-7 -top-2 w-4 h-4 bg-gray-50 rounded-full border border-gray-100"></div>
        <div className="absolute -right-7 -top-2 w-4 h-4 bg-gray-50 rounded-full border border-gray-100"></div>
      </div>

      {/* Bottom Section */}
      <div className="p-5 flex items-center justify-between bg-gray-50/50">
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Reward</p>
          <p className="text-xl font-black text-emerald-600">{deal.reward}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-rose-400 font-medium mb-2 flex items-center justify-end gap-1">
            ⏱️ {deal.expiry}
          </p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-700 transition shadow-sm active:scale-95">
            Claim Deal
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealCard;