import React, { useEffect, useRef, useState } from 'react';
import API from '../../services/api'; 

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { sender: 'system', text: 'Welcome to Shop, How can i assist you?', time: '10:00 AM' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage = {
      sender: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // UPDATED: Ensure this matches your router.post('/ai-chat', chatWithAI) in supportRoutes.js
      // If your axios base URL doesn't include /v1, use: API.post('/v1/support/ai-chat', ...)
      const { data } = await API.post('/support/ai-chat', { message: currentInput });

      if (data.success) {
        setMessages((prev) => [...prev, {
          sender: 'system',
          text: data.reply,
          time: data.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    } catch (err) {
      console.error("AI Chat Error:", err);
      setMessages((prev) => [...prev, {
        sender: 'system',
        text: "Our AI concierge is temporarily offline. A human consultant will be with you shortly.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#140a05] text-white">
      {/* Chat Body */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 no-scrollbar min-h-[400px]"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div
              className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl shadow-xl border ${
                msg.sender === 'user'
                  ? 'bg-orange-600 border-orange-400 text-white rounded-tr-none'
                  : 'bg-white/10 backdrop-blur-md border-white/10 text-gray-100 rounded-tl-none'
              }`}
            >
              <p className="text-xs md:text-sm leading-relaxed font-medium">{msg.text}</p>
              <span className="text-[9px] md:text-[10px] mt-2 block opacity-60 uppercase tracking-widest font-bold">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-white/5 border-t border-white/5 backdrop-blur-lg">
        <div className="relative flex items-center gap-2 md:gap-3 bg-[#1a0f0a] border border-white/10 p-1.5 md:p-2 rounded-2xl focus-within:border-orange-500 transition-all shadow-inner">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none outline-none px-3 md:px-4 py-2 text-white placeholder:text-gray-600 text-xs md:text-sm"
          />
          <button 
            onClick={handleSendMessage}
            disabled={isTyping}
            className="bg-orange-600 hover:bg-orange-500 disabled:bg-gray-700 text-white font-bold py-2 px-4 md:px-6 rounded-xl text-[10px] md:text-xs uppercase tracking-widest transition-all active:scale-95"
          >
            {isTyping ? 'Wait' : 'Send'}
          </button>
        </div>
        <p className="text-[8px] md:text-[9px] text-center text-gray-600 mt-3 uppercase tracking-[0.2em]">
          Utkarsh Home Concierge • Secure Channel
        </p>
      </div>
    </div>
  );
};

export default ChatBox;