import React, { useEffect, useState } from 'react';
import ReferralStats from '../components/ReferralStats';
import InviteBox from '../components/InviteBox';
import ReferralList from '../components/ReferralList';
import API from '../../services/api';

const Referrals = () => {
  const [data, setData] = useState({
    referralCode: 'LOADING',
    stats: {
      totalReferrals: 0,
      successfulReferrals: 0,
      pendingReferrals: 0,
      totalEarnings: 0,
    },
    recentHistory: [],
  });

  useEffect(() => {
    const loadReferrals = async () => {
      try {
        const response = await API.get('/referrals');
        if (response?.data?.success) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error('Failed to load referrals', error);
      }
    };

    loadReferrals();
  }, []);

  const referralRows = data.recentHistory.map((item) => ({
    id: item.id,
    name: item.referredUser?.name || 'New User',
    date: new Date(item.createdAt).toLocaleDateString(),
    status: item.status,
    reward: item.rewardDistributed ? '₹50' : '₹0',
  }));

  return (
    // Removed max-w-6xl and added animate-fade-in to match your Reports page
    <div className="animate-fade-in space-y-10 text-white">
      
      {/* 🚀 Header Section: Matches the branding from your landing page */}
      <div className="space-y-2">
        <h1 className="text-4xl font-black uppercase tracking-tight">
          Refer & <span className="text-orange-600">Earn</span>
        </h1>
        <p className="text-gray-500 font-medium tracking-wide">
          Invite your network to join the vault and unlock exclusive rewards.
        </p>
      </div>

      {/* 📊 Statistics Grid: Ensure ReferralStats uses #140a05 bg */}
      <ReferralStats stats={data.stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 🎫 Invite Section */}
        <div className="lg:col-span-1">
          <InviteBox referralCode={data.referralCode} />
        </div>
        
        {/* 📋 History Section */}
        <div className="lg:col-span-2">
          <ReferralList referrals={referralRows} />
        </div>
      </div>
    </div>
  );
};

export default Referrals;