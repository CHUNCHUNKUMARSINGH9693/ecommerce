import React from 'react';
import { Mail, ShieldCheck, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const UserInfo = () => {
  const { user } = useAuth();
  const displayName = user?.name || "Premium Resident";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="bg-[#140a05] rounded-[2.5rem] border border-white/10 p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-600/10 blur-[100px] rounded-full"></div>

      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
        {/* Large Avatar */}
        <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white text-5xl font-black shadow-[0_20px_50px_rgba(234,88,12,0.3)] border-4 border-[#1a0f0a]">
          {initial}
        </div>

        <div className="text-center md:text-left flex-1 min-w-0">
          <h2 className="text-2xl font-serif italic text-white mb-2">{displayName}</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-[9px] font-black uppercase tracking-widest rounded-full">
              Identity Verified
            </span>
            <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[9px] font-black uppercase tracking-widest rounded-full">
              Platinum Tier
            </span>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        <DetailItem icon={<Mail size={18}/>} label="Primary Email" value={user?.email || "Not Provided"} />
        <DetailItem icon={<Calendar size={18}/>} label="Member Since" value="April 2026" />
        <DetailItem icon={<MapPin size={18}/>} label="Access Location" value="Private Vault" />
        <DetailItem icon={<ShieldCheck size={18}/>} label="Security Protocol" value="Encrypted (JWT)" />
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="bg-white/5 p-5 rounded-3xl border border-white/5 flex items-center gap-4 group hover:bg-white/[0.07] transition-colors">
    <div className="text-orange-600">{icon}</div>
    <div className="min-w-0">
      <p className="text-[7px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">{label}</p>
      <p className="text-gray-200 text-sm font-medium truncate">{value}</p>
    </div>
  </div>
);

export default UserInfo;