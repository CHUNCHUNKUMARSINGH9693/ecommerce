import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, Plus, Minus, ArrowLeft, 
  ShoppingBag, CreditCard, Truck 
} from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();

  // Mock data - In a real app, this would come from your Context or Redux store
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 89.99,
      quantity: 1,
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600",
      category: "Electronics"
    },
    {
      id: 3,
      name: "Smartwatch Series 6",
      price: 199.00,
      quantity: 1,
      img: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Accessories"
    }
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 15.00;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* --- HEADER --- */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-600 hover:text-black transition-colors">
            <ArrowLeft size={20} />
            <span className="text-xs font-bold uppercase tracking-widest hidden sm:block">Back</span>
          </button>
          <span className="text-lg font-black uppercase tracking-tighter">Your Bag ({cartItems.length})</span>
          <div className="w-10"></div> {/* Spacer for symmetry */}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* --- ITEM LIST (LEFT SIDE) --- */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm border border-gray-100">
                  {/* Image */}
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Details */}
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm md:text-base font-black text-slate-800 uppercase tracking-tight">{item.name}</h3>
                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">{item.category}</p>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-gray-50 transition-colors"><Minus size={14} /></button>
                        <span className="px-3 text-sm font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-gray-50 transition-colors"><Plus size={14} /></button>
                      </div>
                      <p className="font-black text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* --- SUMMARY (RIGHT SIDE) --- */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-xl font-black uppercase mb-6 tracking-tight">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">Subtotal</span>
                    <span className="font-black">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">Shipping</span>
                    <span className="font-black">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="border-t border-dashed border-gray-200 pt-4 flex justify-between">
                    <span className="text-base font-black">Total</span>
                    <span className="text-xl font-black text-blue-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98]">
                    <CreditCard size={18} />
                    Checkout Now
                  </button>
                  
                  <div className="flex items-center gap-2 justify-center text-[10px] font-bold text-green-600 uppercase tracking-wider bg-green-50 py-2 rounded-lg">
                    <Truck size={14} />
                    {subtotal > 50 ? "You qualify for free shipping!" : `Add $${(50 - subtotal).toFixed(2)} for free shipping`}
                  </div>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* --- EMPTY STATE --- */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-100 p-8 rounded-full mb-6">
              <ShoppingBag size={48} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Your Bag is Empty</h2>
            <p className="text-gray-500 text-sm mb-8 max-w-xs">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/" className="bg-black text-white px-10 py-4 rounded-xl font-bold uppercase text-xs tracking-widest shadow-xl">
              Start Shopping
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;