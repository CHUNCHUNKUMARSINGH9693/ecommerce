import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DashboardProvider } from './context/DashboardContext';
import { RewardProvider } from './context/RewardContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;