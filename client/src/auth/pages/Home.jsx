import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext"; 
import { 
  ShoppingBag, Search, Heart, User, 
  ShoppingCart, Truck, Headset, Menu, X,
  Smartphone, Watch, Shirt, Laptop, Briefcase, Glasses
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth(); 

  // Data for Categories
 const categories = [
  { name: "Home", icon: <Shirt size={20} />, color: "bg-orange-100", path: "/" },
  { name: "Shop", icon: <Smartphone size={20} />, color: "bg-blue-100", path: "#shop" },
  { name: "New Arrival", icon: <Laptop size={20} />, color: "bg-purple-100", path: "#new-arrivals" },
  { name: "Deals", icon: <Watch size={20} />, color: "bg-green-100", path: "/deals" },
  { name: "Categories", icon: <Briefcase size={20} />, color: "bg-red-100", path: "/categories" },
  { name: "Blog", icon: <Glasses size={20} />, color: "bg-yellow-100", path: "/blog" },
];

  // Data for Trending Products
  const trendingProducts = [
    { id: 1, name: "Wireless Headphones", price: "$89.99", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600", category: "Electronics" },
    { id: 2, name: "Stylish Sunglasses", price: "$59.00", oldPrice: "$120.00", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600", category: "Eyewear", tag: "Sale" },
    { id: 3, name: "Smartwatch Series 6", price: "$199.00", img: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600", category: "Accessories" },
    { id: 4, name: "Casual Sneakers", price: "$69.99", img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=600", category: "Fashion" },
  ];

  const handleAccountClick = () => {
    isAuthenticated ? navigate('/dashboard') : navigate('/login');
  };

  // ✅ 4. New Cart Click Handler (Redirect logic)
  const handleCartClick = () => {
    if (!isAuthenticated) {
      // Pass the destination to the login page state
      navigate('/login', { state: { from: '/dashboard/cart' } });
    } else {
      navigate('/dashboard/cart');
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 font-sans">
      
      {/* --- 1. HEADER SECTION --- */}
<header className="sticky top-0 bg-white z-50 border-b border-gray-100">
  {/* TOP ROW: Logo, Hamburger, and Icons */}
  <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
    
    {/* Mobile Menu Button */}
    <button 
      onClick={() => setIsMenuOpen(!isMenuOpen)} 
      className="lg:hidden p-2 -ml-2 text-slate-600"
    >
      {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>

    {/* Logo */}
    <Link to="/" className="flex items-center gap-2 shrink-0">
      <div className="bg-black p-1.5 rounded-lg">
        <ShoppingBag className="text-white" size={18} />
      </div>
      <span className="text-xl font-black tracking-tight uppercase">Utkarsh</span>
    </Link>

    {/* DESKTOP SEARCH (Visible on Desktop only) */}
    <div className="hidden lg:flex flex-1 max-w-xl px-4">
      <div className="relative flex items-center w-full">
        <input 
          type="text" 
          placeholder="Search products..." 
          className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 px-6 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
        />
        <button className="absolute right-1 p-2 bg-slate-800 text-white rounded-full">
          <Search size={16} />
        </button>
      </div>
    </div>

    {/* Action Icons */}
    <div className="flex items-center gap-3 md:gap-8 text-gray-500 shrink-0">
      {/* Account Icon */}
      <div onClick={handleAccountClick} className="flex flex-col items-center cursor-pointer group">
        <User size={20} className="group-hover:text-black transition-colors" />
        <span className="hidden sm:block text-[10px] mt-1 font-bold uppercase tracking-tight">Account</span>
      </div>

      {/* ✅ FIXED CART ICON (Handles Login Redirect) */}
      <div onClick={handleCartClick} className="flex flex-col items-center cursor-pointer relative group">
        <div className="relative">
          <ShoppingCart size={20} className="group-hover:text-black transition-colors" />
          <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[9px] font-bold px-1.5 rounded-full">3</span>
        </div>
        <span className="hidden sm:block text-[10px] mt-1 font-bold uppercase tracking-tight">Cart</span>
      </div>
    </div>
  </div>

  {/* MOBILE SEARCH BAR (Visible only on Mobile) */}
  <div className="lg:hidden px-4 pb-3">
    <div className="relative flex items-center w-full">
      <input 
        type="text" 
        placeholder="Search products..." 
        className="w-full bg-gray-100 border-none rounded-xl py-2.5 px-5 text-sm outline-none focus:ring-1 focus:ring-blue-400"
      />
      <Search className="absolute right-4 text-gray-400" size={18} />
    </div>
  </div>

  {/* MOBILE MENU DROPDOWN */}
  {isMenuOpen && (
    <div className="lg:hidden bg-white border-t border-gray-100 p-4 flex flex-col gap-3">
      {categories.map((cat, idx) => (
        <button 
          key={idx} 
          onClick={() => {
            setIsMenuOpen(false);
            if (cat.path === "#shop") {
              document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
            } else {
              navigate(cat.path);
            }
          }}
          className="text-left py-2 text-xs font-bold uppercase tracking-widest text-slate-600"
        >
          {cat.name}
        </button>
      ))}
    </div>
  )}

  {/* DESKTOP CATEGORY BAR */}
  <nav className="hidden lg:block bg-white border-t border-gray-50 py-3">
    <div className="max-w-7xl mx-auto px-4 flex justify-center gap-10 text-[11px] font-bold uppercase tracking-widest text-gray-400">
      {categories.map((cat, idx) => (
        <button 
         key={idx} 
    onClick={() => {
      setIsMenuOpen(false);

      if (cat.path.startsWith("#")) {
        const targetId = cat.path.replace("#", "");
        
        // Use setTimeout to ensure the browser has registered the click 
        // and any potential re-renders are finished
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }
        }, 10);
      } else {
        navigate(cat.path);
      }
    }}
          className="hover:text-black transition-colors"
        >
          {cat.name}
        </button>
      ))}
    </div>
  </nav>
</header>


      {/* --- 2. HERO SECTION --- */}
<section className="relative min-h-[500px] md:h-[600px] overflow-hidden group">
  {/* Background Image with Overlay */}
  <div className="absolute inset-0">
    <img 
      src="https://images.pexels.com/photos/3965548/pexels-photo-3965548.jpeg?auto=compress&cs=tinysrgb&w=1600" 
      className="w-full h-full object-cover object-center transition-transform duration-[3s] hover:scale-105" 
      alt="Shopping Together"
    />
    <div className="absolute inset-0 bg-black/30 md:bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
  </div>

  {/* Hero Content */}
  <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center pt-10 md:pt-0">
    <div className="max-w-2xl text-white space-y-4 md:space-y-6">
      <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-tight md:leading-none drop-shadow-md">
        Spring <br className="hidden md:block" /> Collection 2024
      </h1>
      <p className="text-lg md:text-2xl font-medium text-white/90 drop-shadow-sm max-w-xs md:max-w-none">
        Fresh Styles for the New Season
      </p>
      <button 
        onClick={() => navigate('/login')} 
        className="mt-4 bg-white text-black px-8 py-3 md:px-12 md:py-4 rounded-xl font-bold uppercase text-[10px] md:text-[11px] tracking-[0.2em] shadow-xl hover:bg-slate-100 hover:scale-105 transition-all duration-300"
      >
        Shop Now
      </button>
    </div>
  </div>

  {/* Info Bar (Optimized for Mobile Swipe) */}
  <div className="absolute bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-100">
    <div className="max-w-7xl mx-auto flex md:grid md:grid-cols-2 overflow-x-auto md:overflow-x-visible no-scrollbar">
      
      {/* Free Shipping */}
      <div 
        onClick={() => navigate('/login')}
        className="flex items-center gap-4 md:gap-5 px-6 py-5 md:py-6 shrink-0 md:shrink-1 cursor-pointer hover:opacity-70 transition-opacity min-w-[280px] md:min-w-0"
      >
        <div className="p-2.5 md:p-3 bg-slate-100 rounded-xl">
          <Truck size={20} className="md:w-6 md:h-6 text-slate-900" />
        </div>
        <div>
          <p className="text-xs md:text-sm font-black uppercase tracking-tight text-slate-900">Free Shipping</p>
          <p className="text-[10px] md:text-[11px] text-slate-500 font-bold uppercase tracking-wider">On Orders Over $50</p>
        </div>
      </div>

      {/* Support */}
      <div 
        onClick={() => navigate('/login')}
        className="flex items-center gap-4 md:gap-5 px-6 py-5 md:py-6 shrink-0 md:shrink-1 border-l border-slate-200 cursor-pointer hover:opacity-70 transition-opacity min-w-[280px] md:min-w-0"
      >
        <div className="p-2.5 md:p-3 bg-slate-100 rounded-xl">
          <Headset size={20} className="md:w-6 md:h-6 text-slate-900" />
        </div>
        <div>
          <p className="text-xs md:text-sm font-black uppercase tracking-tight text-slate-900">24/7 Support</p>
          <p className="text-[10px] md:text-[11px] text-slate-500 font-bold uppercase tracking-wider">Secure Payment Guarantee</p>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* --- 3. TRENDING PRODUCTS --- */}
<section id="shop" className="max-w-7xl mx-auto px-4 py-12 md:py-16">
  {/* Header Section */}
  <div className="flex items-center justify-between gap-4 mb-8 md:mb-10">
    <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-slate-800 whitespace-nowrap">
      Trending Products
    </h2>
    <div className="hidden sm:block flex-grow h-[1px] bg-gray-200"></div>
    <button 
      onClick={() => navigate('/login')} 
      className="shrink-0 px-4 py-2 md:px-5 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-gray-50 border border-gray-200 rounded-md hover:bg-black hover:text-white transition-all shadow-sm"
    >
      View All
    </button>
  </div>

  {/* Product Grid: Now 2 columns on mobile, 4 on desktop */}
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
    {trendingProducts.map((p) => (
      <div key={p.id} className="group cursor-pointer">
        {/* Adjusted padding and aspect ratio for mobile */}
        <div className="aspect-[3/4] md:aspect-[4/5] bg-gray-50 rounded-xl md:rounded-2xl mb-3 md:mb-4 relative overflow-hidden flex items-center justify-center p-4 md:p-6">
          <img 
            src={p.img} 
            alt={p.name} 
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
          />
        </div>
        
        {/* Text Container */}
        <div className="px-1 space-y-0.5 md:space-y-1">
          <p className="text-[9px] md:text-[11px] font-bold text-gray-400 uppercase truncate">
            {p.name}
          </p>
          <p className="text-base md:text-xl font-black">
            {p.price}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>



     {/* --- 4. NEW ARRIVALS & PROMO SECTION --- */}
<section 
  id="new-arrivals" 
  className="scroll-mt-24 max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 bg-white overflow-hidden"
>
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
    
    {/* 1. LEFT SIDE: SPRING ESCAPE SALE BANNER */}
    <div className="lg:col-span-5 relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden h-[400px] md:h-[600px] shadow-xl group order-2 lg:order-1">
      <img 
        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000" 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
        alt="Spring Escape Sale"
      />
      <div className="absolute inset-0 bg-cyan-500/30 md:bg-cyan-500/40 mix-blend-multiply"></div>
      
      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end items-start text-white bg-gradient-to-t from-black/70 via-transparent to-transparent">
        <h3 className="text-4xl md:text-6xl font-black italic uppercase leading-[0.9] mb-3 tracking-tighter">
          SPRING <br/> ESCAPE <br/> SALE
        </h3>
        <p className="text-xl md:text-2xl font-bold mb-6 md:mb-8">Up To 60% OFF</p>
        <button 
          onClick={() => navigate('/login')}
          className="bg-white text-black px-8 py-3 md:px-10 md:py-4 rounded-xl font-bold uppercase text-[10px] md:text-xs tracking-widest hover:bg-black hover:text-white transition-all shadow-lg active:scale-95"
        >
          Explore Collection
        </button>
      </div>
    </div>

    {/* 2. RIGHT SIDE: NEW ARRIVALS GRID */}
    <div className="lg:col-span-7 flex flex-col order-1 lg:order-2">
      <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-slate-900 whitespace-nowrap">
          New Arrivals
        </h2>
        <div className="flex-grow h-[1px] bg-slate-200"></div>
        <button 
          onClick={() => navigate('/login')}
          className="shrink-0 px-3 py-2 md:px-5 md:py-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-gray-50 border border-gray-200 rounded-md hover:bg-black hover:text-white transition-all shadow-sm"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-6 flex-grow">
        {[
          { name: "Elegant Dress", price: "$89.90", img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=400" },
          { name: "Bluetooth Speaker", price: "$199.00", img: "https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg?auto=compress&cs=tinysrgb&w=400" },
          { name: "Gaming Laptop", price: "$199.00", img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=400" },
          { name: "Leather Backpack", price: "$69.99", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400" },
        ].map((item, idx) => (
          <div key={idx} onClick={() => navigate('/login')} className="group cursor-pointer border border-slate-100 rounded-2xl md:rounded-3xl p-3 md:p-6 hover:shadow-xl transition-all bg-white flex flex-col items-center text-center">
            <div className="aspect-square w-full mb-3 md:mb-6 overflow-hidden flex items-center justify-center">
              <img src={item.img} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" alt={item.name} />
            </div>
            <h4 className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-slate-900 mb-1 line-clamp-1">{item.name}</h4>
            <p className="text-xs md:text-sm font-bold text-slate-500">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

{/* --- HIGH VISIBILITY SECTION DIVIDER --- */}
<div className="w-full bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <div className="w-full h-[2px] bg-gray-200 my-16 rounded-full opacity-100"></div>
  </div>
</div>


      {/* --- 5. FOOTER SECTION --- */}
      <footer className="bg-[#f8fafc] border-t border-gray-100 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-16 border-b border-gray-200/60">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-2xl font-black uppercase tracking-tighter">Join Our Newsletter</h3>
              <div className="flex gap-2 max-w-md mt-4">
                <input type="email" placeholder="Enter your email" className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                <button className="bg-black text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest">Subscribe</button>
              </div>
            </div>
            
            <div className="flex flex-col gap-6 justify-center">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm"><Truck size={24} className="text-blue-600" /></div>
                <div><p className="text-sm font-black uppercase tracking-tight">Free Delivery</p><p className="text-[11px] text-gray-400">On all orders over $50</p></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm"><Headset size={24} className="text-blue-600" /></div>
                <div><p className="text-sm font-black uppercase tracking-tight">24/7 Support</p><p className="text-[11px] text-gray-400">Secure Payment Guarantee</p></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-16 text-gray-500">
            <div className="col-span-2 space-y-6">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-black p-2 rounded-lg"><ShoppingBag className="text-white" size={20} /></div>
                <span className="text-2xl font-black text-slate-900 tracking-tight uppercase">Utkarsh</span>
              </Link>
              <p className="text-sm leading-relaxed max-w-xs">Elevate your lifestyle with our curated collection of premium products. Quality meets modern design.</p>
            </div>
            <div>
              <h4 className="font-black uppercase text-[11px] text-slate-900 tracking-widest mb-6">Shop</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li>New Arrivals</li>
                <li>Best Sellers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase text-[11px] text-slate-900 tracking-widest mb-6">Care</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li>Order Tracking</li>
                <li>Shipping Policy</li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-gray-200/60 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">© 2024 Utkarsh Store. All rights reserved.</p>
            <div className="flex items-center gap-3 opacity-60">
              <div className="bg-white px-3 py-1.5 border border-gray-200 rounded-md text-[10px] font-black uppercase">Visa</div>
              <div className="bg-white px-3 py-1.5 border border-gray-200 rounded-md text-[10px] font-black uppercase">Mastercard</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;