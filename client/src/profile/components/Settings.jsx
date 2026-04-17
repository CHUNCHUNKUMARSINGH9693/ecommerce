import React, { useState } from 'react';
import { Bell, Key, Shield, ArrowRight } from 'lucide-react';

const Settings = () => {
  const [notifs, setNotifs] = useState(true);

  return (
    <div className="bg-[#140a05] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-xl">
      <div className="p-6 border-b border-white/5">
        <h3 className="text-sm font-black text-white uppercase tracking-widest">Vault Preferences</h3>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Luxury Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Global Alerts</p>
            <p className="text-[9px] text-gray-500 uppercase mt-1">Real-time property updates</p>
          </div>
          <button 
            onClick={() => setNotifs(!notifs)}
            className={`w-12 h-6 rounded-full transition-all relative ${notifs ? 'bg-orange-600' : 'bg-white/10'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-lg ${notifs ? 'left-7' : 'left-1'}`} />
          </button>
        </div>

        {/* Action List */}
        <div className="space-y-2">
          <SettingLink icon={<Key size={14}/>} text="Credentials" />
          <SettingLink icon={<Shield size={14}/>} text="Privacy Protocol" />
          <SettingLink icon={<Bell size={14}/>} text="Notification Center" />
        </div>
      </div>
    </div>
  );
};

const SettingLink = ({ icon, text }) => (
  <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group">
    <div className="flex items-center gap-3">
      <span className="text-orange-600">{icon}</span>
      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest group-hover:text-white transition-colors">{text}</span>
    </div>
    <ArrowRight size={12} className="text-gray-600 group-hover:translate-x-1 transition-transform" />
  </button>
);

export default Settings;