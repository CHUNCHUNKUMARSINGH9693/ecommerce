import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import BottomNav from './BottomNav';
import { useAuth } from '../context/AuthContext';

const MainLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#120E0B] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    // Set fixed height to screen to allow internal scrolling only
    <div className="flex h-screen bg-[#120E0B] text-white overflow-hidden font-sans">
      
      {/* SIDEBAR - Desktop */}
      <aside className="hidden lg:block w-72 border-r border-white/5 flex-shrink-0">
        <Sidebar />
      </aside>

      {mobileSidebarOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-40"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="lg:hidden fixed left-0 top-0 h-full w-72 z-50 border-r border-white/10 bg-[#120E0B]">
            <Sidebar onNavigate={() => setMobileSidebarOpen(false)} />
          </aside>
        </>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 relative h-full">
        
        {/* TOP NAVIGATION */}
        <header className="sticky top-0 z-50 flex-shrink-0">
          <TopNavbar onToggleSidebar={() => setMobileSidebarOpen((prev) => !prev)} />
        </header>
        
        {/* SCROLLABLE PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar pb-24 lg:pb-8">
          <div className="max-w-[1400px] mx-auto p-4 md:p-8">
            {/* The 'key' ensures that when the URL changes, 
               React drops the old component and mounts the new one instantly.
            */}
            <Outlet key={location.pathname} /> 
          </div>
        </main>

        {/* BOTTOM NAVIGATION - Mobile Only */}
        <footer className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#120E0B]/80 backdrop-blur-lg">
          <BottomNav />
        </footer>

      </div>
    </div>
  );
};

export default MainLayout;