import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { DashboardProvider } from './context/DashboardContext';
import { RewardProvider } from './context/RewardContext';

// Routes
import AppRoutes from './routes/AppRoutes';

/**
 * App Component
 * * We wrap the entire application in:
 * 1. Router: For navigation handling.
 * 2. AuthProvider: To manage user session globally.
 * 3. DashboardProvider: For general UI state (sidebar, notifications).
 * 4. RewardProvider: Specifically for referral points and balance.
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <DashboardProvider>
          <RewardProvider>
            
            {/* Base wrapper with Tailwind global styles */}
            <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
              
              {/* AppRoutes handles the MainLayout and nested page rendering */}
              <AppRoutes />
              
            </div>

          </RewardProvider>
        </DashboardProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;