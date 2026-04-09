import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav = () => {
  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Samples', path: '/samples', icon: '🖼️' },
    { name: 'Refer', path: '/referrals', icon: '👥' },
    { name: 'Support', path: '/support', icon: '💬' },
    { name: 'Profile', path: '/profile', icon: '👤' },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-slate-200 flex justify-around items-center py-2 px-1 z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `
            flex flex-col items-center gap-1 flex-1 text-[10px] font-medium transition-colors
            ${isActive ? 'text-indigo-600' : 'text-slate-400'}
          `}
        >
          <span className="text-xl">{item.icon}</span>
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;