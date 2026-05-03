import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layout/MainLayout";

// Pages
import Home from "../auth/pages/Home";
import Login from "../auth/pages/Login";
import Register from "../auth/pages/Register";
import Dashboard from "../dashboard/pages/Dashboard";
import Reports from "../reports/pages/Reports";
import WorkSamples from "../samples/pages/WorkSamples"; 
import Referrals from "../referrals/pages/Referrals";
import Support from "../support/pages/Support";
import Profile from "../profile/pages/Profile";
import Cart from "../Cart/Cart";
import CheckoutPage from "../Checkout/pages/CheckoutPage"; // Ensure path matches your folder structure

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  // Loading State with your project's custom spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0503] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* 1. PUBLIC / AUTH ROUTES */}
      <Route path="/" element={!isAuthenticated ? <Home /> : <Navigate to="/dashboard" replace />} />
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" replace />} />

      {/* 2. PROTECTED DASHBOARD SHELL */}
      <Route 
        path="/dashboard" 
        element={isAuthenticated ? <MainLayout /> : <Navigate to="/" replace />}
      >
        {/* Default View: /dashboard */}
        <Route index element={<Dashboard />} />
        
        {/* Analytics & Management */}
        <Route path="reports" element={<Reports />} />
        <Route path="samples" element={<WorkSamples />} /> 
        <Route path="referrals" element={<Referrals />} />
        
        {/* User Specific */}
        <Route path="profile" element={<Profile />} />
        <Route path="support" element={<Support />} />
        
        {/* E-Commerce Flow */}
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>

      {/* 3. CATCH-ALL REDIRECT */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;