// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import TopNavbar from './TopNavbar';
// import BottomNav from './BottomNav';
// import Sidebar from './Sidebar';

// const MainLayout = () => {
//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       {/* Desktop Sidebar */}
//       <div className="hidden lg:block">
//         <Sidebar />
//       </div>

//       <div className="flex-1 flex flex-col min-w-0">
//         <TopNavbar />
        
//         <main className="flex-1 pb-20 lg:pb-0 overflow-y-auto">
//           <Outlet /> {/* This renders the current route's component */}
//         </main>

//         {/* Mobile Bottom Navigation */}
//         <div className="lg:hidden">
//           <BottomNav />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;


import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import BottomNav from './BottomNav';

const MainLayout = () => {
  return (
    /* The main wrapper now uses the deep chocolate background from your reference image */
    <div className="flex min-h-screen bg-[#1a0f0a] text-white overflow-hidden">
      
      {/* 1. Desktop Sidebar: Locked to the left to prevent duplication */}
      <div className="hidden lg:block border-r border-white/5">
        <Sidebar />
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        
        {/* Luxury Top Bar - Glassmorphism style */}
        <header className="sticky top-0 z-30">
          <TopNavbar />
        </header>
        
        {/* Scrollable Page Content: Where Dashboard.jsx will render */}
        <main className="flex-1 overflow-y-auto no-scrollbar pb-24 lg:pb-0">
          <div className="animate-fade-in max-w-[1600px] mx-auto">
            <Outlet /> 
          </div>
        </main>

        {/* 3. Mobile Bottom Navigation: Replaces Sidebar on small screens */}
        <footer className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
          <BottomNav />
        </footer>

      </div>
    </div>
  );
};

export default MainLayout;