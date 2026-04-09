import React, { useState } from 'react';

const Settings = () => {
  const [notifs, setNotifs] = useState(true);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h3 className="font-bold text-slate-800">Account Settings</h3>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Toggle Option */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-700">Email Notifications</p>
            <p className="text-sm text-slate-500">Receive updates about new properties.</p>
          </div>
          <button 
            onClick={() => setNotifs(!notifs)}
            className={`w-12 h-6 rounded-full transition-colors relative ${notifs ? 'bg-indigo-600' : 'bg-slate-300'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${notifs ? 'left-7' : 'left-1'}`} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 space-y-3">
          <button className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 font-medium text-slate-700 transition-colors">
            Change Password
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 font-medium text-slate-700 transition-colors">
            Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;