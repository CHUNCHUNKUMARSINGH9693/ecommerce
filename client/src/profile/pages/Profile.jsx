import React from 'react';
import UserInfo from '../components/UserInfo';
import Settings from '../components/Settings';
import LogoutButton from '../components/LogoutButton';

const Profile = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">Account Profile</h1>
          <LogoutButton />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Main Identity Section */}
          <UserInfo />

          {/* Configuration Section */}
          <Settings />
        </div>
      </div>
    </div>
  );
};

export default Profile;