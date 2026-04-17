import React from 'react';
import UserInfo from '../components/UserInfo';
import Settings from '../components/Settings';
import LogoutButton from '../components/LogoutButton';

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#0a0503] p-4 md:p-8">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* 1. Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif italic text-white">Resident Profile</h1>
          <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.3em]">
            Utkarsh Home Vault
          </p>
        </div>

        {/* 2. User Information Section */}
        <UserInfo />

        {/* 3. Settings Section */}
        <Settings />

        {/* 4. Logout Section (Now at the Bottom) */}
        <LogoutButton />
        
      </div>
    </div>
  );
};

export default Profile;