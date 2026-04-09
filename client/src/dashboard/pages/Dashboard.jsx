// import React from 'react';
// import Header from '../components/Header';
// import OverviewCards from '../components/OverviewCards';
// import AccountHealth from '../components/AccountHealth';
// import ActiveDealsCard from '../../actions/components/ActiveDealsCard';
// import RewardsCard from '../../actions/components/RewardsCard';
// import SupportCard from '../../actions/components/SupportCard';

// const Dashboard = () => {
//   return (
//     <div className="p-6 md:p-10 space-y-10 animate-fade-in">
      
//       {/* 1. Luxury Header */}
//       <Header title="Good Afternoon, Jay" subtitle="Here is what's happening today." />

//       {/* 2. Glassmorphic Announcement */}
//       <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl flex flex-col md:flex-row justify-between items-center shadow-2xl">
//         <div className="flex items-center gap-4">
//           <div className="bg-orange-600 px-3 py-1 rounded-lg">
//             <span className="text-[10px] font-black uppercase text-white tracking-widest">New</span>
//           </div>
//           <p className="text-gray-300 text-sm font-medium">
//             Check out the <span className="text-orange-400">Premium Property</span> codes in your settings.
//           </p>
//         </div>
//         <button className="text-orange-500 text-sm font-bold hover:text-orange-400 underline underline-offset-4 decoration-2 transition-all">
//           View Details
//         </button>
//       </div>

//       {/* 3. Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
//         {/* Left: Stats & Actions */}
//         <div className="lg:col-span-2 space-y-10">
//           <OverviewCards />
          
//           <div className="bg-[#140a05] border border-white/5 rounded-[2.5rem] p-8 shadow-inner-glow">
//             <h3 className="text-white font-serif text-2xl italic mb-8">Quick Actions</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                <ActiveDealsCard />
//                <RewardsCard />
//                <SupportCard />
//             </div>
//           </div>
//         </div>

//         {/* Right: Health & Premium CTA */}
//         <div className="space-y-10">
//           <AccountHealth />
          
//           {/* Luxury CTA Card - Matches your Landing Page image */}
//           <div className="bg-gradient-to-br from-orange-700 via-orange-800 to-[#1a0f0a] p-10 rounded-[2.5rem] text-white shadow-2xl border border-white/10 relative overflow-hidden group">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-white/20 transition-all duration-500" />
            
//             <h4 className="font-serif text-3xl leading-tight mb-4">Premium <br/>Consultant</h4>
//             <p className="text-orange-100/70 text-sm italic mb-8">"Expert Guidance for Premium Property Investments"</p>
            
//             <button className="w-full bg-white text-orange-900 font-black py-4 rounded-2xl text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform active:scale-95 shadow-xl">
//               Upgrade Now
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React from 'react';
// import Header from '../components/Header';
// import OverviewCards from '../components/OverviewCards';
// import AccountHealth from '../components/AccountHealth';
// import ActiveDealsCard from '../../actions/components/ActiveDealsCard';
// import RewardsCard from '../../actions/components/RewardsCard';
// import SupportCard from '../../actions/components/SupportCard';

// const Dashboard = () => {
//   return (
//     /* NOTE: We removed <Sidebar /> and the outer "flex" container.
//        This component now only handles the content inside the chocolate area.
//     */
//     <div className="p-4 md:p-8 animate-fade-in"> 
      
//       {/* 1. Header Section */}
//       <Header title="Good Afternoon, Jay" subtitle="Here is what's happening today." />

//       {/* 2. Premium Announcement Banner */}
//       <div className="mt-8 bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
//         <div className="flex items-center gap-4">
//           <div className="bg-gradient-to-r from-orange-600 to-orange-400 p-1 px-3 rounded-lg shadow-lg">
//             <span className="text-[10px] font-black text-white uppercase tracking-tighter">New Update</span>
//           </div>
//           <p className="text-gray-300 text-sm font-medium">
//             Check out the new <span className="text-orange-400">Product Code</span> update in your settings!
//           </p>
//         </div>
//         <button className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2 px-5 rounded-full border border-white/10 transition-all active:scale-95">
//           View Details
//         </button>
//       </div>

//       {/* 3. Main Dashboard Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        
//         {/* LEFT COLUMN: Stats and Actions */}
//         <div className="lg:col-span-2 space-y-8">
          
//           {/* Stats Cards (Now Glassmorphic) */}
//           <OverviewCards />
          
//           {/* Quick Actions Container */}
//           <div className="bg-[#140a05] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 blur-3xl rounded-full" />
            
//             <div className="flex items-center justify-between mb-8">
//                <h3 className="text-white font-serif text-2xl italic tracking-wide">Quick Actions</h3>
//                <div className="h-[1px] flex-1 bg-white/5 mx-6" />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                <ActiveDealsCard />
//                <RewardsCard />
//                <SupportCard />
//             </div>
//           </div>
//         </div>

//         {/* RIGHT COLUMN: Health & Premium CTA */}
//         <div className="space-y-8">
          
//           {/* Account Health Meter */}
//           <AccountHealth />
          
//           {/* High-End CTA Card */}
//           <div className="relative group cursor-pointer">
//             {/* Outer Glow */}
//             <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-orange-900 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
//             <div className="relative bg-gradient-to-br from-orange-700 via-orange-800 to-[#1a0f0a] p-10 rounded-[2.5rem] text-white shadow-2xl border border-white/10">
//               <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-orange-300">Consultancy</span>
//               <h4 className="font-serif text-3xl mt-4 leading-tight">Premium <br/>Consultant</h4>
              
//               <p className="text-orange-100/70 text-sm mt-4 italic font-light leading-relaxed">
//                 "Expert Guidance for Premium <br/>Property Investments"
//               </p>
              
//               <button className="mt-8 w-full bg-white text-orange-900 hover:bg-orange-50 transition-all font-black py-4 px-4 rounded-2xl text-xs uppercase tracking-widest shadow-xl transform group-hover:translate-y-[-2px]">
//                 Upgrade Now
//               </button>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';
import Header from '../components/Header';
import OverviewCards from '../components/OverviewCards';
import AccountHealth from '../components/AccountHealth';
import ActiveDealsCard from '../../actions/components/ActiveDealsCard';
import RewardsCard from '../../actions/components/RewardsCard';
import SupportCard from '../../actions/components/SupportCard';

const Dashboard = () => {
  return (
    <div className="p-6 md:p-10 space-y-10 animate-fade-in">
      
      {/* Header with Luxury Typography */}
      <Header title="Good Afternoon, Jay" subtitle="Here is what's happening today." />

      {/* Glassmorphic Announcement Banner */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl flex flex-col md:flex-row justify-between items-center shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="bg-orange-600 px-3 py-1 rounded-lg">
            <span className="text-[10px] font-black uppercase text-white tracking-widest">Update</span>
          </div>
          <p className="text-gray-300 text-sm font-medium">
            New <span className="text-orange-400 font-bold text-md">Premium Property</span> deals are now live.
          </p>
        </div>
        <button className="text-orange-500 text-sm font-bold hover:text-orange-400 underline underline-offset-4 transition-all">
          View Details
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Stats and Action Section */}
        <div className="lg:col-span-2 space-y-10">
          <OverviewCards />
          
          <div className="bg-[#140a05] border border-white/5 rounded-[2.5rem] p-8 shadow-inner">
            <h3 className="text-white font-serif text-2xl italic mb-8 tracking-wide">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
               <ActiveDealsCard />
               <RewardsCard />
               <SupportCard />
            </div>
          </div>
        </div>

        {/* Right Side Health & Premium CTA */}
        <div className="space-y-10">
          <AccountHealth />
          
          {/* Luxury CTA matching your Reference Image */}
          <div className="bg-gradient-to-br from-orange-700 via-orange-800 to-[#1a0f0a] p-10 rounded-[2.5rem] text-white shadow-2xl border border-white/10 group">
            <h4 className="font-serif text-3xl leading-tight mb-4">Premium <br/>Consultant</h4>
            <p className="text-orange-100/70 text-sm italic mb-8 leading-relaxed">
              "Expert Guidance for Premium Property Investments"
            </p>
            
            <button className="w-full bg-white text-orange-900 font-black py-4 rounded-2xl text-xs uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl">
              Upgrade Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;