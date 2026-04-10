import React from 'react';
import { Search, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TopNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    // ✅ Forces navigation back to the Landing Page ("/")
    navigate('/', { replace: true }); 
  };

  const displayName = user?.name || "User";
  const initial = displayName.split(' ').pop()?.[0] || 'U';

  return (
    <nav className="sticky top-0 z-30 bg-[#1a0f0a]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
      
      {/* Search Bar (Left Side) */}
      <div className="hidden lg:block relative w-96 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search properties..." 
          className="w-full bg-white/5 border border-white/10 rounded-full py-2 px-12 text-sm text-white focus:ring-1 focus:ring-orange-600 outline-none transition-all"
        />
      </div>

      {/* Actions (Right Side - Opposite of Search) */}
      <div className="flex items-center gap-4">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-rose-600/10 border border-rose-500/20 text-rose-500 hover:bg-rose-600 hover:text-white rounded-xl transition-all font-bold text-xs uppercase tracking-widest"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>

        <button className="relative p-2 text-orange-500 hover:bg-white/5 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-orange-600 rounded-full border border-[#1a0f0a]"></span>
        </button>

        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white font-black border border-white/10 shadow-lg uppercase">
          {initial}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;