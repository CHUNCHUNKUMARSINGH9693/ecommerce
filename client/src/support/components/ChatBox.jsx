import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api'; 
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const ChatBox = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useCart();
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

  const handleAddToCart = (e, product) => {
    if (e) e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/dashboard/cart' } });
    } else {
      // Logic to add to cart context
      setCart([...cart, product]);
      alert(`✅ ${product.name} added to cart!`);
    }
  };

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
      const { data } = await API.post('/support/ai-chat', { message: currentInput });

      if (data.success) {
        setMessages((prev) => [...prev, {
          sender: 'system',
          text: data.reply,
          products: data.products || [],
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
              
              {/* Product Cards Layout */}
              {msg.products && msg.products.length > 0 && (
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {msg.products.map((product) => (
                    <div 
                      key={product._id} 
                      className="bg-black/40 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex flex-col gap-2 hover:border-orange-500/50 transition-all shadow-lg text-left"
                    >
                      {/* Image */}
                      <div className="aspect-video w-full rounded-xl overflow-hidden bg-black/20 relative group">
                        <img 
                          src={`${API.defaults.baseURL}/products/product-photo/${product._id}`} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30";
                          }}
                        />
                        {product.tag && product.tag !== 'none' && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-orange-600 text-white text-[8px] font-black uppercase tracking-wider">
                            {product.tag}
                          </span>
                        )}
                      </div>
                      
                      {/* Details */}
                      <div className="flex flex-col flex-1">
                        <span className="text-[9px] uppercase font-bold text-orange-500 tracking-wider">
                          {product.category}
                        </span>
                        <h4 className="text-xs font-bold text-white mt-0.5 line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="text-[10px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                      
                      {/* Action */}
                      <div className="flex items-center justify-between mt-1 pt-2 border-t border-white/5">
                        <span className="text-sm font-black text-white">
                          ${product.price}
                        </span>
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className="bg-orange-600 hover:bg-orange-500 active:scale-95 text-white font-bold text-[9px] uppercase tracking-wider py-1.5 px-3 rounded-lg transition-all"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

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
          Chunchun Home Concierge • Secure Channel
        </p>
      </div>
    </div>
  );
};

export default ChatBox;