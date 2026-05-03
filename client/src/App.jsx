import React from 'react';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { DashboardProvider } from './context/DashboardContext';
import { RewardProvider } from './context/RewardContext';

// Routes
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <RewardProvider>
          {/* 
              REMOVED: Stripe Elements wrapper. 
              Razorpay handles its own UI through the window.Razorpay object. 
          */}
          <div className="min-h-screen font-sans antialiased bg-[#120E0B] text-white selection:bg-orange-500/30">
            <AppRoutes />
          </div>
        </RewardProvider>
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;