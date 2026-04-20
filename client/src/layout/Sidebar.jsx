import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Users, FileText, LifeBuoy } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Work Samples', icon: <Briefcase size={20} />, path: '/dashboard/samples' },
    { name: 'Refer & Earn', icon: <Users size={20} />, path: '/dashboard/referrals' },
    { name: 'Reports', icon: <FileText size={20} />, path: '/dashboard/reports' },
    { name: 'Support', icon: <LifeBuoy size={20} />, path: '/dashboard/support' },
    { name: 'Cart', icon: <Briefcase size={20} />, path: '/dashboard/cart' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-[#0a0503] border-r border-white/5 h-screen sticky top-0">
      <div className="p-8">
        <h2 className="text-orange-600 font-serif text-2xl italic tracking-tighter">Utkarsh Home</h2>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            // ✅ This is the secret: it adds orange styling when the page is active
            className={({ isActive }) => `
              flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group
              ${isActive 
                ? 'bg-orange-600/10 text-orange-500 border border-orange-600/20' 
                : 'text-gray-500 hover:bg-white/5 hover:text-white'}
            `}
          >
            <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;