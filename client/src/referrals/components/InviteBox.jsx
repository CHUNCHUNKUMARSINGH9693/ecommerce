import React, { useState } from 'react';

const InviteBox = ({ referralCode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#1A1613] rounded-2xl p-6 text-white shadow-lg border border-white/10">
      <h3 className="text-lg font-semibold mb-2">Spread the Word</h3>
      <p className="text-gray-400 text-sm mb-6">
        Share this code with friends. When they sign up, you both get rewarded!
      </p>
      
      <div className="space-y-4">
        <div className="bg-black/30 border border-white/10 rounded-lg p-4 text-center">
          <span className="text-xs uppercase text-gray-400 block mb-1">Your Referral Code</span>
          <span className="text-2xl font-mono font-bold tracking-widest">{referralCode}</span>
        </div>
        
        <button 
          onClick={handleCopy}
          className="w-full bg-[#FF6B00] text-white font-bold py-3 rounded-lg hover:bg-[#ff7d26] transition-colors"
        >
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
    </div>
  );
};

export default InviteBox;