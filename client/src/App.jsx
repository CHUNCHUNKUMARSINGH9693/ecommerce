import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { DashboardProvider } from './context/DashboardContext';
import { RewardProvider } from './context/RewardContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <RewardProvider>
          {/* The bg-[#0a0503] ensures a dark luxury theme across the whole app */}
          <div className="min-h-screen font-sans antialiased bg-[#0a0503] text-white">
            <AppRoutes />
          </div>
        </RewardProvider>
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;