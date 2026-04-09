import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout wrapper
import MainLayout from '../layout/MainLayout';

// Module Pages (Using your exact folder structure)
import Dashboard from '../dashboard/pages/Dashboard';
import Deals from '../deals/pages/Deals';
import Rewards from '../rewards/pages/Rewards';
import Referrals from '../referrals/pages/Referrals';
import Samples from '../samples/pages/Samples';
import Support from '../support/pages/Support';
import Reports from '../reports/pages/Reports';
import Profile from '../profile/pages/Profile';

/**
 * AppRoutes Component
 * Handles the logic for which page to show based on the browser URL.
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* All internal pages are wrapped in MainLayout. 
        This keeps your Navbar and Sidebar visible while the content changes.
      */}
      <Route path="/" element={<MainLayout />}>
        
        {/* The index route renders the Dashboard when the path is exactly "/" */}
        <Route index element={<Dashboard />} />
        
        {/* Module Routes */}
        <Route path="deals" element={<Deals />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="referrals" element={<Referrals />} />
        <Route path="samples" element={<Samples />} />
        <Route path="support" element={<Support />} />
        <Route path="reports" element={<Reports />} />
        <Route path="profile" element={<Profile />} />

        {/* Wildcard Route: If a user enters a path that doesn't exist, 
          redirect them back to the Dashboard.
        */}
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Route>
    </Routes>
  );
};

export default AppRoutes;