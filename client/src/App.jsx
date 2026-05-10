import React from 'react';
import { Toaster } from 'react-hot-toast'; // Highly recommended for e-commerce feedback

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { DashboardProvider } from './context/DashboardContext';
import { RewardProvider } from './context/RewardContext';

// Routes
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './auth/components/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <RewardProvider>
          {/* Main Container */}
          <div className="min-h-screen font-sans antialiased bg-[#FCFCFD] text-slate-900 selection:bg-orange-500/30">
            
            {/* Global Toaster: 
               This allows you to show "Added to Cart" or "Logged In" 
               popups from anywhere in your app.
            */}
            <Toaster position="top-center" reverseOrder={false} />
            <ScrollToTop /> 
            <AppRoutes />
          </div>
        </RewardProvider>
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;