import React from 'react';
import ReferralStats from '../components/ReferralStats';
import InviteBox from '../components/InviteBox';
import ReferralList from '../components/ReferralList';

const Referrals = () => {
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
      <ReferralStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 🎫 Invite Section */}
        <div className="lg:col-span-1">
          <InviteBox referralCode="UTKARSH500" />
        </div>
        
        {/* 📋 History Section */}
        <div className="lg:col-span-2">
          <ReferralList />
        </div>
      </div>
    </div>
  );
};

export default Referrals;