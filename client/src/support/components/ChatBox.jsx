import React, { useEffect, useRef, useState } from 'react';

const ChatBox = () => {
  // 1. Manage messages and input state locally
  const [messages, setMessages] = useState([
    { sender: 'system', text: 'Welcome to Utkarsh Home. How can I assist you with your property search today?', time: '10:00 AM' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 2. Handle Sending Messages & Mock Reply
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      sender: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate a Concierge Reply after 1 second
    setTimeout(() => {
      const systemReply = {
        sender: 'system',
        text: "I've received your inquiry regarding premium property investments. A senior consultant will join this chat shortly.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, systemReply]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#140a05] text-white">
      {/* Chat Body */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar min-h-[450px]"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl shadow-xl border ${
                msg.sender === 'user'
                  ? 'bg-orange-600 border-orange-400 text-white rounded-tr-none'
                  : 'bg-white/10 backdrop-blur-md border-white/10 text-gray-100 rounded-tl-none'
              }`}
            >
              <p className="text-sm leading-relaxed font-medium">
                {msg.text}
              </p>
              <span className="text-[10px] mt-2 block opacity-60 uppercase tracking-widest font-bold">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Luxury Input Area */}
      <div className="p-6 bg-white/5 border-t border-white/5 backdrop-blur-lg">
        <div className="relative flex items-center gap-3 bg-[#1a0f0a] border border-white/10 p-2 rounded-2xl focus-within:border-orange-500 transition-all shadow-inner">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-white placeholder:text-gray-500 text-sm"
          />
          <button 
            onClick={handleSendMessage}
            className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95"
          >
            Send
          </button>
        </div>
        <p className="text-[9px] text-center text-gray-500 mt-3 uppercase tracking-[0.2em]">
          Utkarsh Home Concierge • Secure Channel
        </p>
      </div>
    </div>
  );
};

export default ChatBox;