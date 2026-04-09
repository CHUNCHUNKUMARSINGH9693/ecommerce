import React, { useState } from 'react';

const InviteBox = ({ referralCode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-lg">
      <h3 className="text-lg font-semibold mb-2">Spread the Word</h3>
      <p className="text-indigo-100 text-sm mb-6">
        Share this code with friends. When they sign up, you both get rewarded!
      </p>
      
      <div className="space-y-4">
        <div className="bg-indigo-700/50 border border-indigo-400 rounded-lg p-4 text-center">
          <span className="text-xs uppercase text-indigo-200 block mb-1">Your Referral Code</span>
          <span className="text-2xl font-mono font-bold tracking-widest">{referralCode}</span>
        </div>
        
        <button 
          onClick={handleCopy}
          className="w-full bg-white text-indigo-600 font-bold py-3 rounded-lg hover:bg-indigo-50 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
    </div>
  );
};

export default InviteBox;