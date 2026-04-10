import React from 'react';
import { Bell, LogOut, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, subtitle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Handle Logout with immediate navigation to prevent the "white screen" hang
  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const displayName = user?.name || "User";
  const initial = displayName.split(' ').pop()?.[0] || 'U';

  return (
    <div className="flex flex-col gap-6 w-full mb-10">
      {/* Top Row: Search opposite Actions */}
      <div className="flex items-center justify-between gap-4">
        
        {/* 1. Search Section (Left) */}
        <div className="relative flex-1 max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search transaction vault..." 
            className="w-full bg-[#140a05] border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white outline-none focus:ring-1 focus:ring-orange-600 transition-all placeholder:text-gray-600"
          />
        </div>

        {/* 2. Actions Section (Right) */}
        <div className="flex items-center gap-3">
          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl hover:bg-rose-600 hover:text-white text-rose-500 transition-all group font-bold text-xs uppercase tracking-widest"
            title="Logout"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>

          {/* Notifications */}
          <button className="relative p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
            <Bell className="text-orange-400" size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-600 rounded-full border border-[#0a0503]"></span>
          </button>

          {/* User Avatar */}
          <div className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center text-white font-black shadow-lg border border-white/10 uppercase">
            {initial}
          </div>
        </div>
      </div>

      {/* Bottom Row: Page Titles */}
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-4xl font-serif text-white font-bold tracking-tight">
          {title || `Welcome, ${displayName}`} <span className="inline-block animate-bounce text-2xl">👋</span>
        </h1>
        {subtitle && (
          <p className="text-gray-400 mt-1 text-sm italic font-light">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;