import React, { useState, useEffect } from 'react'; // Fixes the ReferenceError
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext"; 
import API from '../../services/api'; 
import { 
  ShoppingBag, Search, User, 
  ShoppingCart, Truck, Headset, Menu, X,
  Smartphone, Watch, Shirt, Laptop, Briefcase, Glasses, Heart
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth(); 
  
  // This is the state that needed useEffect to work
  const [displayCategories, setDisplayCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Data for Categories
 const categories = [
  { name: "Home", icon: <Shirt size={20} />, color: "bg-orange-100", path: "/" },
  { name: "Shop", icon: <Smartphone size={20} />, color: "bg-blue-100", path: "#shop" },
  { name: "Categories", icon: <Laptop size={20} />, color: "bg-purple-100", path: "#categories" },
  { name: "Deals", icon: <Watch size={20} />, color: "bg-green-100", path: "/deals" },
  { name: "Blog", icon: <Glasses size={20} />, color: "bg-yellow-100", path: "#blog" },
];

  // Data for Trending Products
  const trendingProducts = [
    { id: 1, name: "Wireless Headphones", price: "$89.99", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600", category: "Electronics" },
    { id: 2, name: "Stylish Sunglasses", price: "$59.00", oldPrice: "$120.00", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600", category: "Eyewear", tag: "Sale" },
    { id: 3, name: "Smartwatch Series 6", price: "$199.00", img: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600", category: "Accessories" },
    { id: 4, name: "Casual Sneakers", price: "$69.99", img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=600", category: "Fashion" },
  ];

  const blogPosts = [
    { title: "5 Trends Shaping 2026", snippet: "Learn which products are trending and how shoppers are choosing smarter styles.", date: "Apr 24, 2026" },
    { title: "Refresh Your Workspace", snippet: "Find the best gadgets and decor to upgrade productivity in style.", date: "Apr 18, 2026" },
    { title: "Styling Tips for Spring", snippet: "Mix bold pieces and subtle textures for a premium modern look.", date: "Apr 10, 2026" },
  ];

useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true); // Start loading
        const response = await API.get('/products/inventory');
        if (response.data?.success) {
          const products = response.data.data;
          
          const uniqueCats = [...new Set(products.map(p => p.category))];
          const featuredItems = uniqueCats.map(cat => {
            return products.find(p => p.category === cat);
          }).slice(0, 4);

          setDisplayCategories(featuredItems);
        }
      } catch (err) {
        console.error("Inventory sync error:", err);
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };
    fetchCategories();
  }, []);


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
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900 selection:bg-blue-100 font-sans">
      
      {/* --- 1. HEADER SECTION --- */}
<header className="sticky top-0 z-50 bg-slate-950 text-white shadow-2xl shadow-slate-900/30">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col gap-4 py-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-[220px]">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-slate-700 bg-slate-900 text-slate-200 shadow-sm transition hover:bg-slate-800"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-500 text-white shadow-xl">
              <ShoppingBag size={22} />
            </div>
            <div>
              <p className="text-base font-black uppercase tracking-[0.35em]">UTKARSH</p>
              <p className="text-[10px] uppercase tracking-[0.4em] text-slate-300">Admin Dashboard</p>
            </div>
          </Link>
        </div>

        <div className="flex-1 min-w-[220px]">
          <div className="relative rounded-full border border-slate-700 bg-slate-900/95 py-3 px-4 shadow-lg">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search products, deals, reports..."
              className="w-full bg-transparent pl-12 text-sm text-slate-100 outline-none placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 min-w-[220px] justify-end">
          <button
            onClick={handleAccountClick}
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 text-sm font-semibold text-slate-100 shadow-sm transition hover:bg-slate-800"
          >
            <User size={16} />
            Account
          </button>

          <button
            onClick={handleCartClick}
            className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-700"
          >
            <ShoppingCart size={16} />
            <span>Cart</span>
            <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-sky-500 px-2 text-[11px] font-black leading-none text-white">3</span>
          </button>
        </div>
      </div>

      <div className="h-px bg-slate-800" />

      <div className="hidden lg:flex justify-center items-center overflow-x-auto gap-3 py-4">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (cat.path.startsWith('#')) {
                setTimeout(() => {
                  document.getElementById(cat.path.replace('#', ''))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 20);
              } else {
                navigate(cat.path);
              }
            }}
            className="whitespace-nowrap rounded-full border border-slate-700 bg-slate-900/90 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100 transition hover:border-slate-500 hover:bg-slate-800"
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>

    {isMenuOpen && (
      <div className="mt-4 space-y-2 rounded-3xl border border-slate-800 bg-slate-900/95 p-4 shadow-xl lg:hidden">
        <div className="grid gap-2">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsMenuOpen(false);
                if (cat.path.startsWith('#')) {
                  setTimeout(() => {
                    document.getElementById(cat.path.replace('#', ''))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 50);
                } else {
                  navigate(cat.path);
                }
              }}
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-4 text-left text-sm font-semibold uppercase tracking-[0.2em] text-slate-100 transition hover:border-slate-600 hover:bg-slate-800"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
</header>


      {/* --- 2. HERO SECTION --- */}
<section className="relative overflow-hidden bg-slate-950 text-white">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.25),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.18),_transparent_30%)]" />
  <div className="absolute inset-y-0 right-0 w-full md:w-1/2 bg-[linear-gradient(90deg,transparent_0%,rgba(15,23,42,0.95)_35%,rgba(15,23,42,1)_100%)]" />

  <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 grid gap-10 lg:grid-cols-12 items-center">
    <div className="lg:col-span-6 space-y-8">
      <span className="inline-flex rounded-full border border-slate-700 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-slate-200 backdrop-blur-sm">Spring 2026</span>
      <div className="space-y-5">
        <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">Modern essentials crafted for your everyday lifestyle.</h1>
        <p className="max-w-xl text-lg md:text-2xl text-slate-300">Premium products, thoughtful details, and effortless shopping — all in one premium ecommerce experience.</p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <button onClick={() => navigate('/login')} className="inline-flex items-center justify-center rounded-full bg-sky-500 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl transition hover:bg-sky-400">
          Shop now
        </button>
        <button onClick={handleAccountClick} className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-white/10 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-white/20">
          Join the club
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_100px_rgba(15,23,42,0.12)] backdrop-blur-xl">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-500/15 text-sky-200"><Truck size={20} /></div>
          <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-white">Fast shipping</p>
          <p className="mt-2 text-sm text-slate-300">Free delivery on orders over $50.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_100px_rgba(15,23,42,0.12)] backdrop-blur-xl">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-50/10 text-slate-100"><Headset size={20} /></div>
          <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-white">24/7 support</p>
          <p className="mt-2 text-sm text-slate-300">Always here to help with every order.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_100px_rgba(15,23,42,0.12)] backdrop-blur-xl">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-500/15 text-emerald-200"><Heart size={20} /></div>
          <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-white">Premium quality</p>
          <p className="mt-2 text-sm text-slate-300">Curated products with stunning design.</p>
        </div>
      </div>
    </div>

    <div className="lg:col-span-6 relative">
      <div className="absolute -left-12 top-10 h-40 w-40 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="absolute -right-20 bottom-16 h-52 w-52 rounded-full bg-emerald-400/15 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-4 rounded-[2rem] bg-slate-950 p-5 shadow-xl">
            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800" alt="Hero product" className="h-72 w-full rounded-[1.75rem] object-cover" />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Featured product</p>
              <h2 className="mt-3 text-2xl font-black">AirWave Pro</h2>
              <p className="mt-2 text-sm text-slate-400">Wireless headphones with immersive sound and premium comfort.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-[2rem] bg-white/5 p-5 text-white shadow-xl">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-300">Highlights</p>
              <h3 className="mt-3 text-xl font-black">Ultra-fast checkout</h3>
              <p className="mt-2 text-sm text-slate-300">One-step ordering with secure payment processing.</p>
            </div>
            <div className="rounded-[2rem] bg-white/5 p-5 text-white shadow-xl">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-300">Inspiration</p>
              <h3 className="mt-3 text-xl font-black">Smart style edit</h3>
              <p className="mt-2 text-sm text-slate-300">Find pieces that fit your look and lifestyle.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* --- 3. TRENDING PRODUCTS --- */}
<section id="shop" className="scroll-mt-24 max-w-7xl mx-auto px-4 py-16 md:py-20">
  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
    <div>
      <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Popular right now</p>
      <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-950">Trending Products</h2>
    </div>
    <button
      onClick={() => navigate('/login')}
      className="shrink-0 rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-700 transition hover:border-slate-300 hover:bg-slate-950 hover:text-white"
    >
      View All
    </button>
  </div>

  <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-[1.5fr_1fr]">
    <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-6 md:p-8 text-white shadow-2xl">
      <div className="absolute -left-16 top-10 h-44 w-44 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="absolute -right-14 bottom-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="relative z-10 grid gap-6 sm:grid-cols-2">
        {trendingProducts.slice(0, 2).map((p) => (
          <div key={p.id} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-4 md:p-5 shadow-xl backdrop-blur-xl transition hover:-translate-y-1.5">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <span className="inline-flex rounded-full border border-slate-700 px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-slate-300">{p.category}</span>
                <h3 className="text-base md:text-lg font-black leading-tight">{p.name}</h3>
                <p className="text-sm text-slate-300">{p.price}</p>
              </div>
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-[1.5rem] bg-white/10 p-2 md:p-3 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img src={p.img} alt={p.name} className="h-full w-full object-contain" />
              </div>
            </div>
            {p.tag && <span className="mt-4 inline-flex rounded-full bg-sky-500/15 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-sky-200">{p.tag}</span>}
          </div>
        ))}
      </div>
    </div>

    <div className="grid gap-6">
      {trendingProducts.slice(2).map((p) => (
        <div key={p.id} className="group overflow-hidden rounded-[2rem] border border-slate-200/10 bg-white shadow-xl transition hover:-translate-y-1.5 hover:shadow-2xl">
          <div className="relative h-48 md:h-64 overflow-hidden bg-slate-950">
            <img src={p.img} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
          <div className="p-4 md:p-5">
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">{p.category}</p>
            <h3 className="mt-3 text-lg md:text-xl font-black text-slate-950">{p.name}</h3>
            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="text-base md:text-lg font-black text-slate-900">{p.price}</span>
              <button onClick={() => navigate('/login')} className="rounded-full bg-slate-950 px-3 md:px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-slate-800">
                Shop
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


     {/* --- 4. NEW ARRIVALS & PROMO SECTION --- */}
<section 
      id="categories" 
      className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-slate-50 overflow-hidden"
    >
      <div className="grid gap-8 lg:grid-cols-12 items-stretch">
        
        {/* --- LEFT SIDE: Featured Banner (Stack on Mobile, 5-cols on Desktop) --- */}
        <div className="lg:col-span-5 relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-slate-950 text-white shadow-2xl min-h-[350px] lg:h-full">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000" 
            className="absolute inset-0 w-full h-full object-cover opacity-50" 
            alt="Product Collections"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
          
          <div className="relative h-full p-6 md:p-10 lg:p-12 flex flex-col justify-end items-start">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-slate-200 backdrop-blur-sm">
              Featured 2026
            </span>
            <h3 className="mt-4 text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight">
              Shop by <span className="text-sky-400">Category</span>
            </h3>
            <p className="mt-3 max-w-xs text-sm md:text-base text-slate-300 leading-relaxed">
              Explore our curated collections synchronized directly from your product inventory.
            </p>
            <button 
              onClick={() => navigate('/dashboard/work-samples')}
              className="mt-6 md:mt-8 w-full sm:w-auto rounded-full bg-sky-500 px-8 py-3.5 text-xs md:text-sm font-black uppercase tracking-[0.2em] text-slate-950 transition-all hover:bg-sky-400 active:scale-95 shadow-lg"
            >
              Browse Inventory
            </button>
          </div>
        </div>

        {/* --- RIGHT SIDE: Category Cards (Stack on Mobile, 7-cols on Desktop) --- */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between px-1">
            <div className="space-y-1">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-slate-400 font-bold">Top Picks</p>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-slate-950">Live Collections</h2>
            </div>
            <button 
              onClick={() => navigate('/login')}
              className="group flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-950 transition-colors"
            >
              View All <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Fully Responsive Grid: 1 col on mobile, 2 cols on tablet/desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {loading ? (
              // Skeleton Loader
              [1, 2, 3, 4].map((n) => (
                <div key={n} className="h-64 rounded-[1.8rem] bg-slate-200 animate-pulse" />
              ))
            ) : (
              displayCategories.map((item) => (
                <div 
                  key={item._id} 
                  onClick={() => navigate('/dashboard/work-samples')} 
                  className="group cursor-pointer overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl active:scale-[0.98]"
                >
                  <div className="aspect-[4/3] sm:aspect-square md:aspect-[4/3] overflow-hidden bg-slate-100">
                    <img 
                      src={item.image} 
                      alt={item.category} 
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                  </div>
                  <div className="p-4 md:p-6 flex justify-between items-center">
                    <div className="overflow-hidden">
                      <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-sky-600 block mb-1">Explore</span>
                      <h3 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tighter truncate">
                        {item.category}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 h-10 w-10 md:h-12 md:w-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                      <span className="text-xl">→</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>

<section id="blog" className="scroll-mt-24 max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8 md:mb-10">
    <div>
      <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Latest reads</p>
      <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-950">From our blog</h2>
    </div>
    <button 
      onClick={() => navigate('/login')}
      className="rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-700 transition hover:bg-slate-950 hover:text-white"
    >
      View All Posts
    </button>
  </div>

  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {blogPosts.map((post, index) => (
      <div key={post.title} className="group overflow-hidden rounded-[2rem] border border-slate-200/20 bg-white shadow-xl transition hover:-translate-y-1.5 hover:shadow-2xl">
        <div className="relative h-48 overflow-hidden bg-slate-950">
          <img 
            src={`https://images.unsplash.com/photo-${index === 0 ? '1507003211169-0a1dd7228f2d' : index === 1 ? '1486312338219-ce68e2c6f44d' : '1506905925346-21bda4d32df4'}?q=80&w=600`} 
            alt={post.title} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-slate-900 font-bold">Article</span>
          </div>
        </div>
        <div className="p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400 font-semibold">{post.date}</p>
          <h4 className="mt-3 text-xl font-black text-slate-950 leading-tight">{post.title}</h4>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">{post.snippet}</p>
          <button 
            onClick={() => navigate('/login')}
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-sky-600 transition"
          >
            Read more
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    ))}
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