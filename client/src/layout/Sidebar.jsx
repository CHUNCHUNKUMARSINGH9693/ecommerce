import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'Work Samples', path: '/samples', icon: '🖼️' },
    { name: 'Refer & Earn', path: '/referrals', icon: '👥' },
    { name: 'Reports', path: '/reports', icon: '📄' },
    { name: 'Support', path: '/support', icon: '💬' },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 bg-white border-r border-slate-200 p-6 flex flex-col">
      <div className="font-black text-2xl text-indigo-600 mb-10 tracking-tighter">
        UTKARSH HOME
      </div>
      
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all
              ${isActive ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-500 hover:bg-slate-50'}
            `}
          >
            <span>{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;