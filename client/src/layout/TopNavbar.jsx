import React, { useState, useRef, useEffect } from 'react';
import { Search, LogOut, Bell, User, Settings as SettingsIcon, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const TopNavbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = user?.name || "Premium Resident";
  const initial = displayName.charAt(0).toUpperCase() || 'U';

  return (
    <nav className="sticky top-0 z-40 bg-[#120E0B]/90 backdrop-blur-xl border-b border-white/5 px-4 md:px-6 py-4 flex justify-between items-center w-full">
      
      {/* --- LEFT SIDE: Brand & Search --- */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <button
          className="lg:hidden p-2 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:border-[#FF6B00]/40"
          onClick={onToggleSidebar}
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
        <div className="flex flex-col lg:hidden shrink-0">
          <span className="text-white font-black leading-none tracking-tighter text-sm uppercase">Utkarsh</span>
          <span className="text-orange-600 font-serif italic text-[10px] leading-none">Home</span>
        </div>

        <div className="relative w-full max-w-[160px] md:max-w-xs lg:max-w-96 group">
          <Search className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#FF6B00] transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search vault..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 lg:px-12 text-sm text-white focus:ring-1 focus:ring-[#FF6B00] outline-none transition-all placeholder:text-gray-600"
          />
        </div>
      </div>

      {/* --- RIGHT SIDE --- */}
      <div className="flex items-center gap-3 md:gap-6 ml-4">
        <button className="relative p-2 text-[#FF6B00] hover:bg-white/5 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF6B00] rounded-full border border-[#120E0B]"></span>
        </button>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#9E3E00] flex items-center justify-center text-white font-black border border-white/20 shadow-lg shadow-orange-900/20 uppercase text-xs md:text-sm hover:scale-105 transition-transform"
          >
            {initial}
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-[#140a05] border border-white/10 rounded-[1.2rem] shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-2 animate-in fade-in zoom-in-95 duration-200 z-50">
              <div className="px-4 py-3 border-b border-white/5 mb-1 text-left">
                <p className="text-[8px] font-black text-orange-500 uppercase tracking-widest">Resident</p>
                <p className="text-white font-bold truncate text-sm">{displayName}</p>
              </div>

              <div className="space-y-1">
                {/* ✅ UPDATED PATHS TO MATCH NESTED ROUTES */}
                <Link 
                  to="/dashboard/profile" 
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all text-[10px] font-bold uppercase tracking-widest"
                >
                  <User size={16} className="text-orange-600" /> View Profile
                </Link>

                <Link 
                  to="/dashboard/profile" 
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all text-[10px] font-bold uppercase tracking-widest"
                >
                  <SettingsIcon size={16} className="text-orange-600" /> Settings
                </Link>
              </div>

              <div className="border-t border-white/5 mt-1 pt-1">
                <button 
                  onClick={handleLogout} 
                  className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;