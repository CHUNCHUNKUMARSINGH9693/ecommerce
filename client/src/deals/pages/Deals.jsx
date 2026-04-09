import React from 'react';
import DealList from '../components/DealList';

const Deals = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Active Deals</h1>
          <p className="text-gray-500 text-sm">Claim offers and boost your earnings.</p>
        </div>
        
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-indigo-700 transition">
            Newest First
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 transition">
            Filter
          </button>
        </div>
      </div>

      <DealList />
    </div>
  );
};

export default Deals;