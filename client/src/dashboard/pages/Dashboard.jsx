import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import OverviewCards from '../components/OverviewCards';
import AccountHealth from '../components/AccountHealth';
import ActiveDealsCard from '../../actions/components/ActiveDealsCard';
import RewardsCard from '../../actions/components/RewardsCard';
import SupportCard from '../../actions/components/SupportCard';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // 🔒 Protect Dashboard
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="p-6 md:p-10 space-y-10 animate-fade-in">
      {/* 🔥 TOP BAR (HEADER + LOGOUT RIGHT SIDE) */}
      <div className="flex justify-between items-center">

        {/* LEFT: HEADER */}
       
      </div>

      {/* ANNOUNCEMENT */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl flex flex-col md:flex-row justify-between items-center shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="bg-orange-600 px-3 py-1 rounded-lg">
            <span className="text-[10px] font-black uppercase text-white tracking-widest">
              Update
            </span>
          </div>
          <p className="text-gray-300 text-sm font-medium">
            New <span className="text-orange-400 font-bold">Premium Property</span> deals are now live.
          </p>
        </div>
        <button className="text-orange-500 text-sm font-bold hover:text-orange-400 underline">
          View Details
        </button>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-10">
          <OverviewCards />

          <div className="bg-[#140a05] border border-white/5 rounded-[2.5rem] p-8 shadow-inner">
            <h3 className="text-white font-serif text-2xl italic mb-8">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <ActiveDealsCard />
              <RewardsCard />
              <SupportCard />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-10">
          <AccountHealth />

          <div className="bg-gradient-to-br from-orange-700 via-orange-800 to-[#1a0f0a] p-10 rounded-[2.5rem] text-white shadow-2xl border border-white/10">
            <h4 className="font-serif text-3xl leading-tight mb-4">
              Premium <br/> Consultant
            </h4>
            <p className="text-orange-100/70 text-sm italic mb-8">
              "Expert Guidance for Premium Property Investments"
            </p>

            <button className="w-full bg-white text-orange-900 font-black py-4 rounded-2xl text-xs uppercase tracking-widest hover:scale-[1.02] transition-all">
              Upgrade Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;