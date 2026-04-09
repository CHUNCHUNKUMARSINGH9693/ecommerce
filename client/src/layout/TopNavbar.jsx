import React from 'react';

const TopNavbar = () => {
  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex justify-between items-center">
      <div className="lg:hidden font-bold text-indigo-600 text-xl tracking-tight">
        Utkarsh Home
      </div>
      
      <div className="hidden lg:block relative w-96">
        <input 
          type="text" 
          placeholder="Search properties..." 
          className="w-full bg-slate-100 rounded-full px-4 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">🔔</button>
        <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200" />
      </div>
    </nav>
  );
};

export default TopNavbar;