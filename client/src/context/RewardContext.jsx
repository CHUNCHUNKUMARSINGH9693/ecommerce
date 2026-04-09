import React, { createContext, useState } from 'react';

export const RewardContext = createContext();

export const RewardProvider = ({ children }) => {
  const [rewardData, setRewardData] = useState({
    balance: 0,
    totalReferrals: 0,
    referralCode: "CHUN2026", // Default or fetched from API
  });

  const updateBalance = (newAmount) => {
    setRewardData(prev => ({ ...prev, balance: prev.balance + newAmount }));
  };

  const syncRewards = async () => {
    // Logic to fetch from backend (e.g., GET /api/rewards)
    console.log("Syncing reward balance with database...");
  };

  return (
    <RewardContext.Provider value={{ ...rewardData, updateBalance, syncRewards }}>
      {children}
    </RewardContext.Provider>
  );
};