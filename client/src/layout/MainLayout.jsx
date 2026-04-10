import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import BottomNav from './BottomNav';
import { useAuth } from '../context/AuthContext';

const MainLayout = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0503] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ✅ CRITICAL REDIRECT: Ensure this points to "/" (Home)
  // This solves the "white screen" hang by unmounting the layout immediately.
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#1a0f0a] text-white overflow-hidden">
      <div className="hidden lg:block border-r border-white/5">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <header className="sticky top-0 z-30">
          <TopNavbar />
        </header>
        
        <main className="flex-1 overflow-y-auto no-scrollbar pb-24 lg:pb-0">
          <div className="animate-fade-in max-w-[1600px] mx-auto p-4 md:p-8">
            <Outlet /> 
          </div>
        </main>

        <footer className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
          <BottomNav />
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;