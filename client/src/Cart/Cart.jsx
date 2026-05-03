import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, Plus, Minus, ArrowLeft, 
  ShoppingBag, CreditCard, Truck 
} from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // 1. Load items and listen for changes from other components (like WorkSamples modal)
  const loadCart = useCallback(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    loadCart();

    // Listen for the 'cartUpdated' event we created in WorkSamples
    window.addEventListener('cartUpdated', loadCart);
    // Listen for storage changes from other tabs
    window.addEventListener('storage', loadCart);

    return () => {
      window.removeEventListener('cartUpdated', loadCart);
      window.removeEventListener('storage', loadCart);
    };
  }, [loadCart]);

  // 2. Sync changes back to localStorage
  const syncCart = (newItems) => {
    setCartItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
    // Notify other components that the cart changed
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const updateQuantity = (id, delta) => {
    const updated = cartItems.map(item => 
      item._id === id ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) } : item
    );
    syncCart(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item._id !== id);
    syncCart(updated);
  };

  // --- CALCULATIONS ---
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const shippingThreshold = 50;
  const shippingCost = 15.00;
  const shipping = subtotal >= shippingThreshold || subtotal === 0 ? 0 : shippingCost;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#120E0B] pb-20 text-white animate-in fade-in duration-500">
      {/* --- HEADER --- */}
      <header className="bg-[#1A1613]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="text-xs font-bold uppercase tracking-widest hidden sm:block">Back</span>
          </button>
          <span className="text-lg font-black uppercase tracking-tighter italic">
            Your Bag <span className="text-[#FF6B00]">({cartItems.length})</span>
          </span>
          <div className="w-10"></div> 
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* --- ITEM LIST --- */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="bg-[#1A1613] rounded-2xl p-4 flex gap-4 border border-white/10 hover:border-white/20 transition-all group">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-black/40 rounded-xl overflow-hidden shrink-0 border border-white/5">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'; }}
                    />
                  </div>

                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm md:text-base font-black text-white uppercase tracking-tight line-clamp-1">{item.name}</h3>
                        <button onClick={() => removeItem(item._id)} className="text-gray-500 hover:text-red-500 transition-colors p-1">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-[10px] font-bold text-[#FF6B00] uppercase mt-1 tracking-widest">{item.category}</p>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="flex items-center bg-black/20 rounded-lg border border-white/5 p-1">
                        <button onClick={() => updateQuantity(item._id, -1)} className="p-1.5 hover:bg-white/10 rounded-md transition-colors"><Minus size={14} /></button>
                        <span className="px-4 text-sm font-black w-8 text-center">{item.quantity || 1}</span>
                        <button onClick={() => updateQuantity(item._id, 1)} className="p-1.5 hover:bg-white/10 rounded-md transition-colors"><Plus size={14} /></button>
                      </div>
                      <p className="font-black text-xl text-white italic">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* --- SUMMARY --- */}
            <div className="lg:col-span-4">
              <div className="bg-[#1A1613] rounded-3xl p-6 border border-white/10 sticky top-24 shadow-2xl">
                <h2 className="text-xl font-black uppercase mb-6 tracking-tight italic">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-bold uppercase tracking-tighter">Subtotal</span>
                    <span className="font-black text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-bold uppercase tracking-tighter">Shipping</span>
                    <span className={`font-black ${shipping === 0 ? "text-green-400" : "text-white"}`}>
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t border-dashed border-white/10 pt-6 flex justify-between items-center">
                    <span className="text-base font-black uppercase italic">Total</span>
                    <span className="text-3xl font-black text-[#FF6B00] italic">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => navigate('/dashboard/checkout', { state: { total } })}
                    className="w-full bg-[#FF6B00] text-white py-5 rounded-2xl font-black uppercase text-sm tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#ff7d26] transition-all shadow-[0_10px_20px_rgba(255,107,0,0.2)] active:scale-[0.97]"
                  >
                    <CreditCard size={20} />
                    Proceed to Pay
                  </button>
                  
                  <div className={`flex items-center gap-2 justify-center text-[10px] font-black uppercase tracking-[0.15em] py-3 rounded-xl transition-all ${subtotal >= 50 ? "bg-green-500/10 text-green-400" : "bg-white/5 text-gray-500"}`}>
                    <Truck size={14} />
                    {subtotal >= 50 ? "Free shipping applied!" : `Add $${(50 - subtotal).toFixed(2)} more for free shipping`}
                  </div>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center animate-in zoom-in-95 duration-500">
            <div className="bg-white/5 p-12 rounded-full mb-8 relative">
              <ShoppingBag size={64} className="text-gray-600" />
              <div className="absolute top-0 right-0 w-6 h-6 bg-[#FF6B00] rounded-full border-4 border-[#120E0B]"></div>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4 italic">Your Bag is Empty</h2>
            <p className="text-gray-500 text-sm mb-10 max-w-xs font-medium">Your next great purchase is just a few clicks away.</p>
            <Link to="/dashboard/samples" className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-[#FF6B00] hover:text-white transition-all shadow-xl">
              Back to Store
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;