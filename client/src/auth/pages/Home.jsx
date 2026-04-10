import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Sparkles, CreditCard, Box, Zap, ShoppingCart } from 'lucide-react';

const Home = () => {
  // Mock data for luxury products (Fashion/Tech/Lifestyle)
  const products = [
    { id: 1, name: "Obsidian Chronograph", price: "$1,200", tag: "Limited Edition" },
    { id: 2, name: "Premium Leather Tote", price: "$850", tag: "Handcrafted" },
    { id: 3, name: "Titanium Wireless Buds", price: "$400", tag: "New Arrival" },
    { id: 4, name: "Midnight Fragrance", price: "$250", tag: "Best Seller" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0503] text-white selection:bg-orange-600">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 blur-[140px] rounded-full"></div>

        <div className="relative z-10 space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-orange-500 animate-pulse">
            <Sparkles size={14} /> Global Shipping Available
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.85]">
            Utkarsh <span className="text-orange-600">Store</span>
          </h1>
          
          <p className="text-gray-500 text-sm md:text-xl tracking-[0.3em] uppercase font-light max-w-2xl mx-auto">
            Curated Excellence for the Modern Minimalist
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
            <Link to="/login" className="px-12 py-5 bg-white text-black font-black rounded-2xl uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all flex items-center justify-center gap-3 group">
              Shop Collection <ShoppingCart className="group-hover:scale-110 transition-transform" size={20} />
            </Link>
            <Link to="/register" className="px-12 py-5 border border-white/20 text-white font-black rounded-2xl uppercase tracking-widest hover:border-orange-600 transition-all">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* 2. E-COMMERCE USP SECTION (Unique Selling Points) */}
      <section className="py-20 border-y border-white/5 bg-[#0e0705]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-3">
            <Box className="mx-auto text-orange-600" size={32} />
            <h3 className="text-lg font-bold uppercase tracking-widest">Express Delivery</h3>
            <p className="text-gray-500 text-sm italic">Premium packaging with 48-hour global arrival.</p>
          </div>
          <div className="space-y-3 border-x border-white/5">
            <Zap className="mx-auto text-orange-600" size={32} />
            <h3 className="text-lg font-bold uppercase tracking-widest">Flash Drops</h3>
            <p className="text-gray-500 text-sm italic">Exclusive weekly releases for community members.</p>
          </div>
          <div className="space-y-3">
            <CreditCard className="mx-auto text-orange-600" size={32} />
            <h3 className="text-lg font-bold uppercase tracking-widest">Secure Checkout</h3>
            <p className="text-gray-500 text-sm italic">Encrypted payments with crypto and card support.</p>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT GRID */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black uppercase italic">New <span className="text-orange-600">Arrivals</span></h2>
            <p className="text-gray-500 uppercase tracking-widest text-[10px] mt-2 font-bold">The latest in high-end design</p>
          </div>
          <Link to="/login" className="text-orange-600 font-bold uppercase text-xs tracking-widest border-b border-orange-600/20 pb-1 hover:text-white transition-colors flex items-center gap-2">
            View All Products <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item) => (
            <div key={item.id} className="group relative bg-[#140a05] border border-white/5 rounded-3xl p-5 hover:border-orange-600/50 transition-all">
              {/* Product Card Image Container */}
              <div className="aspect-square bg-[#1a0f0a] rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center">
                <div className="absolute top-4 left-4 bg-orange-600 text-[9px] font-black uppercase px-3 py-1 rounded-full z-10">
                  {item.tag}
                </div>
                
                {/* Visual Placeholder for Product */}
                <div className="w-full h-full bg-gradient-to-tr from-orange-600/5 to-transparent flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                   <ShoppingBag size={56} className="text-white/5 group-hover:text-orange-600/20 transition-colors" />
                </div>

                {/* Hover Quick Add Overlay */}
                <Link 
                  to="/login" 
                  className="absolute bottom-0 left-0 right-0 bg-white text-black text-center py-4 font-black uppercase text-xs tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  Quick Add to Bag
                </Link>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-lg group-hover:text-orange-500 transition-colors uppercase tracking-tight">{item.name}</h4>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-orange-500 text-sm font-black italic tracking-widest">{item.price}</span>
                  <Link to="/login" className="p-2 border border-white/10 rounded-full hover:bg-orange-600 hover:border-orange-600 transition-all">
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="py-16 border-t border-white/5 text-center bg-[#0a0503]">
        <h2 className="text-2xl font-black italic text-white/20 uppercase mb-8 tracking-[1em]">UTKARSH</h2>
        <div className="flex justify-center gap-8 mb-8 text-xs font-bold text-gray-600 uppercase tracking-widest">
          <Link to="/login" className="hover:text-white transition-colors">Support</Link>
          <Link to="/login" className="hover:text-white transition-colors">Privacy</Link>
          <Link to="/login" className="hover:text-white transition-colors">Shipping</Link>
        </div>
        <p className="text-gray-700 text-[9px] uppercase tracking-[0.5em]">
          &copy; 2026 Utkarsh Digital Commerce. Engineered for Luxury.
        </p>
      </footer>
    </div>
  );
};

export default Home;