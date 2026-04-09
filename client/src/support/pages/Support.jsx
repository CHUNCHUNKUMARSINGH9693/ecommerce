// import React, { useState } from 'react';
// import ChatBox from '../components/ChatBox';
// import TicketForm from '../components/TicketForm';

// const Support = () => {
//   const [activeTab, setActiveTab] = useState('ticket'); // 'ticket' or 'chat'

//   return (
//     <div className="min-h-screen bg-slate-50 py-12 px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-10">
//           <h1 className="text-3xl font-bold text-slate-900">How can we help?</h1>
//           <p className="text-slate-500 mt-2">Our team usually responds within a few hours.</p>
//         </div>

//         {/* Tab Switcher */}
//         <div className="flex justify-center mb-8">
//           <div className="bg-slate-200 p-1 rounded-xl flex w-full max-w-xs">
//             <button
//               onClick={() => setActiveTab('ticket')}
//               className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
//                 activeTab === 'ticket' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600'
//               }`}
//             >
//               Raise Ticket
//             </button>
//             <button
//               onClick={() => setActiveTab('chat')}
//               className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
//                 activeTab === 'chat' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600'
//               }`}
//             >
//               Live Chat
//             </button>
//           </div>
//         </div>

//         {/* Content Area */}
//         <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
//           {activeTab === 'ticket' ? <TicketForm /> : <ChatBox />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Support;


import React, { useState } from 'react';
import ChatBox from '../components/ChatBox';
import TicketForm from '../components/TicketForm';

const Support = () => {
  const [activeTab, setActiveTab] = useState('chat'); // Defaulting to chat for immediate engagement

  return (
    <div className="min-h-screen bg-[#1a0f0a] py-8 md:py-12 px-4 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        
        {/* Luxury Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-white italic tracking-tight">
            How can we help?
          </h1>
          <p className="text-orange-400/80 mt-4 font-medium tracking-widest text-xs uppercase">
            Our elite team usually responds within a few hours.
          </p>
        </div>

        {/* Premium Tab Switcher - Glassmorphic */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-1.5 rounded-2xl flex w-full max-w-sm shadow-2xl">
            <button
              onClick={() => setActiveTab('ticket')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-500 ${
                activeTab === 'ticket' 
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/40' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Raise Ticket
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-500 ${
                activeTab === 'chat' 
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/40' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Live Chat
            </button>
          </div>
        </div>

        {/* Main Content Area - Luxury Glass Card */}
        <div className="relative group">
          {/* Subtle Outer Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600/20 to-transparent rounded-[2.5rem] blur opacity-30"></div>
          
          <div className="relative bg-[#140a05] rounded-[2.5rem] shadow-2xl border border-white/5 overflow-hidden min-h-[600px] flex flex-col">
            {/* Visual Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 blur-[100px] -mr-32 -mt-32 rounded-full"></div>
            
            <div className="relative flex-1 flex flex-col p-2">
              {activeTab === 'ticket' ? (
                <div className="p-6 md:p-10 animate-fade-in">
                  <TicketForm />
                </div>
              ) : (
                <div className="flex-1 flex flex-col h-[600px] animate-fade-in">
                   {/* Ensure ChatBox has a defined height inside to handle scrolling */}
                  <ChatBox />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Support Footer Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Email Support', value: 'support@utkarshhome.com' },
            { label: 'Direct Line', value: '+91 95601 86633' },
            { label: 'Availability', value: '24/7 Premium Care' }
          ].map((item, index) => (
            <div key={index} className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
              <p className="text-[10px] uppercase tracking-widest text-orange-500 font-bold mb-1">{item.label}</p>
              <p className="text-white font-medium text-sm">{item.value}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Support;