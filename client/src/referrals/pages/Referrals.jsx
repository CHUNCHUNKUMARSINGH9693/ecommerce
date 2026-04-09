import React from 'react';
import ReferralStats from '../components/ReferralStats';
import InviteBox from '../components/InviteBox';
import ReferralList from '../components/ReferralList';

const Referrals = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Refer & Earn</h1>
          <p className="text-slate-500">Invite your friends and track your rewards.</p>
        </div>
      </div>

      <ReferralStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <InviteBox referralCode="UTKARSH500" />
        </div>
        <div className="lg:col-span-2">
          <ReferralList />
        </div>
      </div>
    </div>
  );
};

export default Referrals;