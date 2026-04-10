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

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; 

  return (
    <Routes>
      {/* 🏠 Public: Home is always accessible */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" replace />} />

      {/* 🔒 Private: Changed redirect from "/login" to "/" */}
      <Route 
        path="/dashboard" 
        element={isAuthenticated ? <MainLayout /> : <Navigate to="/" replace />}
      >
        <Route index element={<Dashboard />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* Catch-all: Send everything else to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;