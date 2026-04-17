import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Briefcase, Users, LifeBuoy, User, FileText, icons } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    // ✅ Updated paths to match your /dashboard nesting
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} />},
    { name: 'Samples', path: '/dashboard/samples', icon: <Briefcase size={20} /> },
    { name: 'Refer', path: '/dashboard/referrals', icon: <Users size={20} /> },
    { name: 'Reports', path: '/dashboard/reports', icon: <FileText size={20}/>},
    { name: 'Support', path: '/dashboard/support', icon: <LifeBuoy size={20} /> },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 w-full bg-[#140a05]/90 backdrop-blur-xl border-t border-white/5 flex justify-around items-center py-3 px-1 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          // end={item.path === '/dashboard'} // Prevents 'Home' from staying active on sub-pages
          className={({ isActive }) => `
            flex flex-col items-center gap-1 flex-1 text-[8px] font-black uppercase tracking-widest transition-all duration-300
            ${isActive ? 'text-orange-500 scale-110' : 'text-gray-500 hover:text-gray-300'}
          `}
        >
          <span className="transition-transform duration-300">{item.icon}</span>
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;