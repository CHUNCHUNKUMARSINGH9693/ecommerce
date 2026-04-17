import React, { useState } from 'react';
import ChatBox from '../components/ChatBox';
import TicketForm from '../components/TicketForm';

const Support = () => {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    // Updated container to match Vault padding
    <div className="animate-fade-in space-y-10">
      
      {/* Luxury Header Section */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-white italic tracking-tight">
          How can we help?
        </h1>
        <p className="text-orange-400/80 mt-4 font-medium tracking-widest text-[10px] uppercase">
          Our elite team usually responds within a few hours.
        </p>
      </div>

      {/* Premium Tab Switcher */}
      <div className="flex justify-center">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-1.5 rounded-2xl flex w-full max-w-sm shadow-2xl">
          <button
            onClick={() => setActiveTab('ticket')}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-500 ${
              activeTab === 'ticket' 
              ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/40' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Raise Ticket
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-500 ${
              activeTab === 'chat' 
              ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/40' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Live Chat
          </button>
        </div>
      </div>

      {/* Main Content Area - Matches Vault Panels */}
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600/20 to-transparent rounded-[2.5rem] blur opacity-30"></div>
        <div className="relative bg-[#140a05] rounded-[2.5rem] shadow-2xl border border-white/5 overflow-hidden min-h-[500px]">
          <div className="p-4 md:p-8">
            {activeTab === 'ticket' ? <TicketForm /> : <ChatBox />}
          </div>
        </div>
      </div>

      {/* Support Footer Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Email Support', value: 'support@utkarshhome.com' },
          { label: 'Direct Line', value: '+91 95601 86633' },
          { label: 'Availability', value: '24/7 Premium Care' }
        ].map((item, index) => (
          <div key={index} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] text-center group hover:border-orange-600/30 transition-all">
            <p className="text-[10px] uppercase tracking-widest text-orange-500 font-black mb-1">{item.label}</p>
            <p className="text-white font-medium text-sm">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Support;