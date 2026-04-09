import React from 'react';
import { Bell } from 'lucide-react';

const Header = ({ title, subtitle }) => {
  // Safe check for the initial (avoids the '0' of undefined error)
  const initial = title ? title.split(' ').pop()?.[0] : 'J';

  return (
    <div className="flex justify-between items-start w-full">
      <div>
        <h1 className="text-3xl md:text-4xl font-serif text-white font-bold tracking-tight">
          {title || "Good Afternoon"} <span className="inline-block animate-bounce">👋</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm md:text-base italic font-light">
          {subtitle || "Here is what's happening today."}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Bell with Luxury Glow */}
        <button className="relative p-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all group">
          <Bell className="text-orange-400 group-hover:text-orange-300" size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-orange-600 rounded-full border-2 border-[#1a0f0a]"></span>
        </button>

        {/* User Avatar */}
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-orange-900/40 border border-white/10">
          {initial}
        </div>
      </div>
    </div>
  );
};

export default Header;