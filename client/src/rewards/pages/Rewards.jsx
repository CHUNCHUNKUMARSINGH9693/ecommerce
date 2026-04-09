import React from 'react';
import BalanceCard from '../components/BalanceCard';
import RewardCard from '../components/RewardCard';

const Rewards = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Your Rewards</h1>
        <p className="text-gray-500 text-sm">Redeem your hard-earned points for exclusive perks.</p>
      </div>

      {/* Balance Overview */}
      <BalanceCard points="4,250" value="$42.50" />

      {/* Rewards Grid */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">Available Redemptions</h2>
          <select className="text-sm border-none bg-transparent font-semibold text-indigo-600 focus:ring-0 cursor-pointer">
            <option>All Categories</option>
            <option>Cashout</option>
            <option>Gift Cards</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <RewardCard 
            title="PayPal Cashout" 
            cost="5000" 
            icon="💰" 
            color="bg-blue-50" 
            tag="Popular"
          />
          <RewardCard 
            title="Amazon Gift Card" 
            cost="2500" 
            icon="🛒" 
            color="bg-orange-50" 
            tag="Hot"
          />
          <RewardCard 
            title="Starbucks Voucher" 
            cost="1200" 
            icon="☕" 
            color="bg-emerald-50" 
          />
        </div>
      </div>
    </div>
  );
};

export default Rewards;