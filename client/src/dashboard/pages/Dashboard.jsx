import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Gem, ShieldCheck, Zap, ArrowUpRight, User } from 'lucide-react';
import OverviewCards from '../components/OverviewCards';
import AccountHealth from '../components/AccountHealth';
import ActiveDealsCard from '../../actions/components/ActiveDealsCard';
import RewardsCard from '../../actions/components/RewardsCard';
import SupportCard from '../../actions/components/SupportCard';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="p-4 md:p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 text-white min-h-screen pb-24 md:pb-10">
      
      {/* 🏆 HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif italic text-white tracking-tight">Executive Dashboard</h1>
          <p className="text-orange-500/60 text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black mt-1">
            Utkarsh Home • Private Vault Access Active
          </p>
        </div>
        <div className="flex items-center self-start gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-md">
          <ShieldCheck className="text-green-500" size={14} />
          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-300">Identity Verified</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-10">
          <OverviewCards />
          
          <section className="relative bg-[#140a05] border border-white/5 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-orange-600" size={24} />
                <h3 className="text-white font-serif text-xl md:text-2xl italic tracking-wide">Vault Actions</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <ActiveDealsCard />
              <RewardsCard />
              <SupportCard />
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8 md:space-y-10">
          <AccountHealth />
          
          <div className="relative overflow-hidden bg-gradient-to-br from-[#2a1810] via-[#1a0f0a] to-black p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-white shadow-2xl border border-white/10">
            <Gem className="absolute -top-6 -right-6 text-orange-600/10 w-40 h-40 rotate-12" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="text-orange-500 animate-pulse" size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500/80">Membership Tier</span>
              </div>
              <h4 className="font-serif text-3xl md:text-4xl leading-tight mb-4 tracking-tight">
                Platinum <br/> <span className="text-orange-500">Access</span>
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-[200px]">
                Unlock exclusive member-only pricing and early drop access to luxury assets.
              </p>
              <button className="w-full bg-white text-[#1a0f0a] font-black py-4 md:py-5 rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-white transition-all duration-300 active:scale-95">
                Upgrade to Platinum
              </button>
            </div>
          </div>

          {/* 🛠️ FIXED NAVIGATION: Click goes to Support/Profile */}
          <div 
            onClick={() => navigate('/dashboard/support')}
            className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-600/20 flex items-center justify-center text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <User size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-tighter">Need Assistance?</p>
                <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest mt-0.5">Contact Concierge</p>
              </div>
            </div>
            <ArrowUpRight className="text-gray-600 group-hover:text-orange-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={18} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;