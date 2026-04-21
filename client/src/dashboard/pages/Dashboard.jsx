import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, Gem, ShieldCheck, Zap, 
  ArrowUpRight, User, Search, Bell 
} from 'lucide-react';

// Component Imports
import OverviewCards from '../components/OverviewCards';
import AccountHealth from '../components/AccountHealth';
import RecentOrders from '../components/RecentOrders';
import ActiveDealsCard from '../../actions/components/ActiveDealsCard';
import RewardsCard from '../../actions/components/RewardsCard';
import SupportCard from '../../actions/components/SupportCard';
import BestSellers from '../components/BestSellers';


const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="bg-[#0f0a07] min-h-screen text-white p-4 md:p-8 lg:p-12 space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-24 md:pb-12 selection:bg-orange-500/30">
          <OverviewCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* LEFT COLUMN: MAIN FEED */}
        <div className="lg:col-span-2 w-full space-y-5">
          
          {/* ORDERS TABLE */}
          <div className="transition-all hover:translate-y-[-4px] duration-500">
          </div>

          {/* NEW ARRIVALS / PROMO SECTION */}
          <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-700 to-orange-950 rounded-[3rem] p-10 md:p-14 group cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.5) w-full]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px]  rounded-full -mr-32 -mt-32 group-hover:bg-white/20 transition-all duration-1000 flex justify-centre" />
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="space-y-6 text-center md:text-left">
                <div className="inline-block px-4 py-1 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-[0.3em]">
                  Limited Collection
                </div>
                <h2 className="text-6xl md:text-7xl font-black uppercase italic leading-[0.85] tracking-tighter">
                  New<br /><span className="text-orange-200">Arrivals</span>
                </h2>
                <button className="mt-4 bg-white text-black px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-orange-500 hover:text-white transition-all transform active:scale-95 shadow-2xl">
                  Shop Exclusive
                </button>
              </div>
              
              <div className="relative group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 ease-out">
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" 
                  className="w-72 md:w-80 drop-shadow-[0_50px_50px_rgba(0,0,0,0.7)] -rotate-12"
                  alt="Sneaker Drop"
                />
              </div>
            </div>
          </section>
        
          <RecentOrders />
          
          {/* VAULT ACTIONS */}
          <section className="bg-[#1a1310] border border-white/5 rounded-[3rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-600/10 rounded-2xl text-orange-500">
                  <TrendingUp size={28} />
                </div>
                <h3 className="text-white font-black uppercase italic text-2xl tracking-widest">Vault Actions</h3>
              </div>
              <ArrowUpRight className="text-gray-700 group-hover:text-orange-500 transition-colors" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <ActiveDealsCard />
              <RewardsCard />
              <SupportCard />
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: ACCOUNT & TIERS */}
        <div className="space-y-10 w-full">   
          <div className="flex justify-center w-full">
           <BestSellers />
          </div>

          <div className="hover:scale-[1.02] transition-transform duration-500">
            <AccountHealth />
          </div>
          
          {/* PLATINUM MEMBERSHIP CARD */}
          <div className="relative overflow-hidden bg-gradient-to-b from-[#2a1810] to-black p-10 rounded-[3rem] text-white shadow-2xl border border-white/10 group min-h-[450px] flex flex-col justify-between">
            <Gem className="absolute -top-12 -right-12 text-orange-600/5 w-64 h-64 rotate-12 transition-transform duration-1000 group-hover:rotate-45" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <Zap className="text-orange-500 animate-pulse" size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500/80">Membership Tier</span>
              </div>
              <h4 className="font-black text-5xl xl:text-6xl uppercase italic leading-none mb-6 tracking-tighter">
                Platinum <br/> <span className="text-orange-500">Access</span>
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed font-medium uppercase tracking-widest max-w-[240px]">
                Unlock 0% trading fees and priority drop notifications.
              </p>
            </div>

            <button className="relative z-10 w-full bg-white text-black font-black py-5 rounded-[1.5rem] text-xs uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-white transition-all duration-500 shadow-xl shadow-black">
              Upgrade Now
            </button>
          </div>

          {/* CONCIERGE ACCESS */}
          <button 
            onClick={() => navigate('/dashboard/support')}
            className="w-full p-8 bg-[#1a1310] border border-white/5 rounded-[2.5rem] flex items-center justify-between group hover:border-orange-500/40 transition-all active:scale-95 shadow-xl"
          >
            <div className="flex items-center gap-6 text-left">
              <div className="w-16 h-16 rounded-[1.5rem] bg-orange-600/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                <User size={32} />
              </div>
              <div>
                <p className="text-xs font-black text-white uppercase tracking-tighter">Personal Help</p>
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] mt-1">Contact Concierge</p>
              </div>
            </div>
            <div className="p-3 bg-white/5 rounded-full group-hover:bg-orange-500 transition-colors">
              <ArrowUpRight className="text-gray-400 group-hover:text-white transition-all" size={20} />
            </div>
          </button>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;