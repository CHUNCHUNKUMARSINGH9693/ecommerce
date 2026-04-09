import React, { createContext, useState } from 'react';

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePropertyCount, setActivePropertyCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const addNotification = (msg) => {
    setNotifications(prev => [...prev, { id: Date.now(), message: msg }]);
  };

  return (
    <DashboardContext.Provider value={{ 
      isSidebarOpen, 
      toggleSidebar, 
      activePropertyCount, 
      setActivePropertyCount,
      notifications 
    }}>
      {children}
    </DashboardContext.Provider>
  );
};