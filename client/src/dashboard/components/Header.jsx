import React from 'react';
import { Bell, LogOut, Search, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, subtitle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const displayName = user?.name || "User";
  const initial = displayName.split(' ').pop()?.[0] || 'U';

  return (
    <div className="flex flex-col gap-8 w-full mb-12">
      {/* Top Utility Row */}
      <div className="flex items-center justify-between gap-6">
        
        {/* Search Section: Integrated Glassmorphism */}
        <div className="relative flex-1 max-w-xl group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search vault..." 
            className="w-full bg-[#1A1613] border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:ring-1 focus:ring-orange-600/50 focus:bg-[#241E1B] transition-all placeholder:text-white/20 text-sm font-medium"
          />
          {/* Subtle Shortcut Hint */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-white/20 font-black">
            <span>⌘</span><span>K</span>
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-4">
          {/* Notification Center */}
          <button className="relative p-3 bg-[#1A1613] border border-white/5 rounded-2xl hover:bg-white/5 hover:border-orange-500/30 transition-all duration-300">
            <Bell className="text-white/40" size={20} />
            <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-orange-600 rounded-full border-2 border-[#0a0503] animate-pulse"></span>
          </button>

          {/* User Profile & Logout Combo */}
          <div className="flex items-center gap-3 pl-4 border-l border-white/5">
            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-xs font-black text-white uppercase tracking-widest">{displayName}</span>
              <span className="text-[10px] text-orange-500/60 font-bold uppercase">Pro Member</span>
            </div>
            
            <div className="relative group">
              <div className="w-11 h-11 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center text-white font-black shadow-[0_10px_20px_rgba(234,88,12,0.3)] border border-white/10 uppercase cursor-pointer group-hover:scale-105 transition-transform">
                {initial}
              </div>
              
              {/* Tooltip Logout */}
              <button 
                onClick={handleLogout}
                className="absolute -bottom-12 right-0 opacity-0 group-hover:opacity-100 flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl z-50 pointer-events-none group-hover:pointer-events-auto"
              >
                <LogOut size={12} /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Page Heading Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
            {title || "Overview"} <span className="text-orange-600">.</span>
          </h1>
          {subtitle && (
            <p className="text-white/30 mt-2 text-xs font-bold uppercase tracking-[0.3em]">
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Quick Date Display */}
        <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/5 text-[10px] font-black text-white/40 uppercase tracking-widest">
          {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>
    </div>
  );
};

export default Header;