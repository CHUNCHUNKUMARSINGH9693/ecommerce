import React from 'react';

const FilterBar = ({ setSearchTerm, setFilterType }) => {
  return (
    <div className="p-4 border-b border-white/10 bg-black/20 flex flex-col md:flex-row gap-4 text-white">
      <div className="relative flex-1">
        <input 
          type="text"
          placeholder="Search by ID or Type..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/10 bg-[#1A1613] focus:ring-2 focus:ring-[#FF6B00] outline-none transition-all"
        />
        <span className="absolute left-3 top-2.5 text-gray-500">🔍</span>
      </div>
      
      <select 
        onChange={(e) => setFilterType(e.target.value)}
        className="px-4 py-2 rounded-lg border border-white/10 bg-[#1A1613] focus:ring-2 focus:ring-[#FF6B00] outline-none cursor-pointer"
      >
        <option value="All">All Types</option>
        <option value="Referral">Referral</option>
        <option value="Consultancy">Consultancy</option>
        <option value="Ad Fee">Ad Fee</option>
      </select>
    </div>
  );
};

export default FilterBar;