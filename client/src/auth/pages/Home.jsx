import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import API from '../../services/api'; 
import { 
  ShoppingBag, Search, User, Truck, Headset, Menu, X,
  Smartphone, Watch, Briefcase, Glasses, Heart,
  Users, ShieldCheck, RotateCcw, Shirt, Laptop, Sparkles, Utensils, ShoppingCart, Sofa, Dog
} from 'lucide-react';

import { productService } from '../../services/productService';
import {
  CATEGORIES,
  CATEGORY_LABELS,
  CATEGORY_STYLES
} from "../../utils/constants";
import { useCart } from "@/context/CartContext";
import ShopByCategories from "../components/ShopByCategories";
const Home = () => {
  const navigate = useNavigate();
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    subject: "Project Inquiry",
    message: "",
  });
  const [contactLoading, setContactLoading] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/v1/contact", contactFormData);
      if (data.success) {
        toast.success("Message sent successfully!", {
          duration: 4000,
          position: "top-center",
          style: { borderRadius: "15px", background: "#1e293b", color: "#fff" },
        });
        setContactFormData({ name: "", email: "", subject: "Project Inquiry", message: "" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setContactLoading(false);
    }
  };


  // 1. Add these states to your Home component
const [newsletterEmail, setNewsletterEmail] = useState("");

// 2. Add the submission function
const handleNewsletterSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post("http://localhost:5000/api/v1/newsletter/subscribe", { 
      email: newsletterEmail 
    });
    if (data.success) {
      toast.success(data.message);
      setNewsletterEmail(""); // Clear input
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth(); 
  
  // Data states
  const [displayCategories, setDisplayCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inventory, setInventory] = useState([]); // Add this line!
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart(); 
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBlogExpanded, setIsBlogExpanded] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Categories navigation (Deals removed)
  const navLinks = [
    { name: "Home", icon: <Shirt size={20} />, color: "bg-orange-100", path: "/" },
    { name: "Shop", icon: <Smartphone size={20} />, color: "bg-blue-100", path: "#shop" },
    { name: "Categories", icon: <Laptop size={20} />, color: "bg-purple-100", path: "#categories" },
    {name : "About Us", icon: <Briefcase size={20} />, color: "bg-green-100", path: "#about" },
    {name: "Contact", icon: <ShieldCheck size={20} />, color: "bg-pink-100", path: "#contact"},
    { name: "Blog", icon: <Glasses size={20} />, color: "bg-yellow-100", path: "#blog" },
  ];

 const iconMap = {
    "Electronics": <Laptop size={24} />,
    "Fashion": <Shirt size={24} />,
    "Beauty": <Sparkles size={24} />,
    "Kitchen": <Utensils size={24} />,
    "Grocery": <ShoppingCart size={24} />,
    "Luxury": <Watch size={24} />,
    "Furniture": <Sofa size={24} />,
    "Pets": <Dog size={24} />,
  };

  const themeMap = {
    0: "bg-blue-50 text-blue-600",
    1: "bg-orange-50 text-orange-600",
    2: "bg-purple-50 text-purple-600",
    3: "bg-stone-50 text-stone-600",
    4: "bg-emerald-50 text-emerald-600",
    5: "bg-rose-50 text-rose-600",
    6: "bg-green-50 text-green-600",
    7: "bg-sky-50 text-sky-600",
  };


  const allBlogPosts = [
  { id: 1, title: "5 Trends Shaping 2026", snippet: "Learn which products are trending and how shoppers choose styles.", date: "Apr 24, 2026", imgIndex: 0, content: "Detailed breakdown of 2026 market shifts..." },
  { id: 2, title: "Refresh Your Workspace", snippet: "Find the best gadgets and decor to upgrade productivity in style.", date: "Apr 18, 2026", imgIndex: 1, content: "Ergonomics and aesthetic workspace guide..." },
  { id: 3, title: "Styling Tips for Spring", snippet: "Mix bold pieces and subtle textures for a premium modern look.", date: "Apr 10, 2026", imgIndex: 2, content: "Spring collection matching guide..." },
  { id: 4, title: "Eco-Friendly Packaging", snippet: "How we are reducing our carbon footprint one delivery at a time.", date: "Apr 05, 2026", imgIndex: 3, content: "Our sustainability journey..." },
  { id: 5, title: "The Future of Smart Tech", snippet: "Integrating AI into your daily household routines seamlessly.", date: "Mar 28, 2026", imgIndex: 4, content: "Smart home integration tips..." },
  { id: 6, title: "Minimalist Wardrobe", snippet: "Less is more: Building a capsule collection that lasts years.", date: "Mar 22, 2026", imgIndex: 5, content: "Capsule wardrobe basics..." },
  { id: 7, title: "Modern Interior Design", snippet: "Transform your living room with these five simple changes.", date: "Mar 15, 2026", imgIndex: 6, content: "Interior design trends..." },
  { id: 8, title: "The Art of Gifting", snippet: "Personalized gift ideas for every occasion and personality.", date: "Mar 10, 2026", imgIndex: 7, content: "Gifting strategy and ideas..." },
  { id: 9, title: "Digital Nomad Essentials", snippet: "The gear you need to work effectively from anywhere in the world.", date: "Mar 02, 2026", imgIndex: 8, content: "Remote work gear list..." },
  { id: 10, title: "Skincare Myths Debunked", snippet: "The science behind healthy skin and the products you actually need.", date: "Feb 25, 2026", imgIndex: 9, content: "Dermatologist backed advice..." },
  { id: 11, title: "Sustainable Fashion", snippet: "Why slow fashion is the future of the clothing industry.", date: "Feb 18, 2026", imgIndex: 10, content: "Full report on ethics..." },
  { id: 12, title: "Gourmet Coffee at Home", snippet: "Master the art of the pour-over and espresso in your kitchen.", date: "Feb 12, 2026", imgIndex: 11, content: "Coffee brewing techniques..." },
  { id: 13, title: "Fitness Tech Review", snippet: "The best smartwatches and trackers to monitor your health.", date: "Feb 05, 2026", imgIndex: 12, content: "Wearable tech comparisons..." },
  { id: 14, title: "Home Office Lighting", snippet: "How the right light improves your mood and focus while working.", date: "Jan 28, 2026", imgIndex: 13, content: "Lighting design guide..." },
  { id: 15, title: "Travel Photography 101", snippet: "Capture better memories with these essential camera tips.", date: "Jan 20, 2026", imgIndex: 14, content: "Photography masterclass..." },
  { id: 16, title: "Outdoor Living Spaces", snippet: "Create a sanctuary in your backyard or balcony this summer.", date: "Jan 15, 2026", imgIndex: 15, content: "Patio and garden ideas..." },
  { id: 17, title: "The Power of Organization", snippet: "Declutter your life and mind with these proven methods.", date: "Jan 08, 2026", imgIndex: 16, content: "Organizational psychology..." },
  { id: 18, title: "Smart Kitchen Appliances", snippet: "Make cooking easier with the latest connected kitchen tech.", date: "Jan 02, 2026", imgIndex: 17, content: "Kitchen tech reviews..." },
  { id: 19, title: "Yoga for Beginners", snippet: "Start your wellness journey with these basic daily stretches.", date: "Dec 25, 2025", imgIndex: 18, content: "Getting started with yoga..." },
  { id: 20, title: "Winter Care Essentials", snippet: "Protecting your gadgets and home during the cold months.", date: "Dec 18, 2025", imgIndex: 19, content: "Winter maintenance guide..." },
  { id: 21, title: "Creative Journaling", snippet: "How writing daily can boost your creativity and mental health.", date: "Dec 10, 2025", imgIndex: 20, content: "Journaling prompts and tips..." }
];

  // Logic: Show only 3 posts unless "View All" is clicked
  const displayedPosts = isBlogExpanded ? allBlogPosts : allBlogPosts.slice(0, 3);


  const categoryNames = Object.keys(CATEGORY_STYLES);

  const handleAccountClick = () => {
    isAuthenticated ? navigate('/dashboard') : navigate('/login');
  };

  const handleCartClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/dashboard/cart' } });
    } else {
      navigate('/dashboard/cart');
    }
  };


  const handleAddToCart = (e, product) => {
  if (e) e.stopPropagation();
  if (!isAuthenticated) {
    navigate('/login', { state: { from: '/dashboard/cart' } });
  } else {
    // Logic to add to cart context
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  }
};

const filteredProducts = products.filter((product) => {
  // If search is empty, show everything
  if (!searchQuery) return true;
  
  const name = product.name?.toLowerCase() || "";
  const category = product.category?.toLowerCase() || "";
  const query = searchQuery.toLowerCase();

  return name.includes(query) || category.includes(query);
});

  // Replace your two separate useEffects with this cleaner version:

  useEffect(() => {
  const fetchAndGroupCategories = async () => {
    try {
      setLoading(true);
      // Fetch products using your existing API setup
      const res = await API.get(`/products?t=${new Date().getTime()}`);      
      const allProducts = res.data?.data || [];
      setProducts(allProducts);

      const uniqueCategoryMap = new Map();

      allProducts.forEach((product) => {
        const catName = product.category?.trim();
        
        // Only add a category if it's not already in our Map
        if (catName && !uniqueCategoryMap.has(catName.toLowerCase())) {
          uniqueCategoryMap.set(catName.toLowerCase(), {
            _id: product._id,
            name: catName, 
            // This pulls the first product name as a sub-label like in your reference image
            subLabel: product.name, 
            image: `http://localhost:5000/api/v1/products/product-photo/${product._id}`
          });
        }
      });

      setDisplayCategories(Array.from(uniqueCategoryMap.values()));
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAndGroupCategories();
}, []);


  const handleProtectedAction = (e, destination) => {
    if (e) e.stopPropagation(); 
    if (!isAuthenticated) {
      navigate('/login', { state: { from: destination } });
    } else {
      navigate(destination);
    }
  };

const handleShowMore = () => {
  if (!isAuthenticated) {
    navigate("/login", {
      state: { from: "/dashboard/samples" },
    });
  } else {
    navigate("/dashboard/samples");
  }
};

  


  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900 font-sans">
      
      {/* Header */}
    <header className="sticky top-0 z-50 bg-white backdrop-blur-md border-b border-slate-200 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-20">
      {/* LEFT: Mobile Menu & Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white transition-transform group-hover:scale-105">
            <ShoppingBag size={20} />
          </div>
          <span className="text-2xl font-black uppercase tracking-tight text-slate-900">
            SHOP
          </span>
        </Link>
      </div>

      {/* DESKTOP NAV */}
      <nav className="hidden lg:flex items-center gap-8">
        {navLinks.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (cat.path.startsWith("#")) {
                document.getElementById(cat.path.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
              } else {
                navigate(cat.path);
              }
            }}
            className="text-sm font-bold uppercase tracking-widest text-slate-600 hover:text-black transition"
          >
            {cat.name}
          </button>
        ))}
      </nav>

      {/* RIGHT SIDE: Search, Account, Cart */}
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2.5 rounded-full hover:bg-slate-100 transition"
          >
            <Search size={22} />
          </button>

          {showSearch && (
            <div className="absolute right-0 top-14 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-slate-900 outline-none"
              />

              {/* SEARCH RESULTS DROPDOWN */}
              <div className="mt-3 max-h-72 overflow-y-auto">
                {/* Only show results if the user has typed something */}
                {searchQuery && filteredProducts.slice(0, 5).map((product) => (
                  <div
                    key={product._id}
                    onClick={() => {
                      navigate(`/product/${product._id}`);
                      setShowSearch(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 cursor-pointer"
                  >
                    <img
                      src={`http://localhost:5000/api/v1/products/product-photo/${product._id}`}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                      onError={(e) => (e.target.src = "https://placehold.co/80")}
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-900 truncate w-40">
                        {product.name}
                      </p>
                      <p className="text-xs text-slate-500">${product.price}</p>
                    </div>
                  </div>
                ))}

                {searchQuery && filteredProducts.length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-4">
                    No products found
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <button onClick={handleAccountClick} className="hidden sm:flex p-2.5 rounded-full hover:bg-slate-100 transition">
          <User size={22} />
        </button>

        <button onClick={handleCartClick} className="relative p-2.5 rounded-full hover:bg-slate-100 transition">
          <ShoppingCart size={22} />
          <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
            {cart?.length || 0}
          </span>
        </button>
      </div>
    </div>
  </div>
</header>

      {/* Hero */}
     <section className="relative overflow-hidden bg-white text-slate-900 border-b border-slate-100">
  {/* Decorative Background Glows - Hidden on small screens to save performance */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
    <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
    <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-indigo-50 rounded-full blur-[100px] opacity-50" />
  </div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-24 lg:py-32 grid gap-12 lg:grid-cols-12 items-center">
    
    {/* Left Content Column: Responsive Order (1 on mobile) */}
    <div className="lg:col-span-7 space-y-6 md:space-y-10 order-1">
      <div className="flex justify-center lg:justify-start">
        <span className="inline-flex rounded-full border border-blue-100 bg-blue-50/50 px-4 md:px-5 py-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-blue-600">
          New Spring Collection
        </span>
      </div>
      
      <div className="space-y-4 md:space-y-6 text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] lg:leading-[0.95] tracking-tighter text-slate-950">
          Modern essentials <br className="hidden sm:block" />
          <span className="text-blue-600">for your lifestyle.</span>
        </h1>
        <p className="max-w-xl mx-auto lg:mx-0 text-base md:text-lg lg:text-xl text-slate-500 font-medium leading-relaxed">
          Premium products, thoughtful details, and effortless shopping — all in one elevated experience.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <button onClick={() => navigate('/login')} className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-slate-950 px-8 md:px-10 py-4 md:py-5 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white shadow-2xl transition-all hover:bg-blue-600 hover:-translate-y-1 active:scale-95">
          Shop the drop
        </button>
        <button onClick={handleAccountClick} className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 md:px-10 py-4 md:py-5 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-900 transition-all hover:bg-slate-50 hover:border-slate-300">
          Join the club
        </button>
      </div>

      {/* Mini Feature Grid: Responsive 1 col on small, 3 on large */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 pt-4">
        {[
          { icon: <Truck size={18} />, title: "Fast Shipping", desc: "Free over $50", color: "text-blue-600", bg: "bg-blue-50" },
          { icon: <Headset size={18} />, title: "24/7 Support", desc: "Always online", color: "text-indigo-600", bg: "bg-indigo-50" },
          { icon: <Heart size={18} />, title: "Premium", desc: "Curated quality", color: "text-rose-600", bg: "bg-rose-50" }
        ].map((item, i) => (
          <div key={i} className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-0 group rounded-3xl border border-slate-100 bg-slate-50/50 p-4 md:p-6 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">
            <div className={`flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-2xl ${item.bg} ${item.color}`}>{item.icon}</div>
            <div className="sm:mt-4 text-left">
               <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-900">{item.title}</p>
               <p className="text-[10px] md:text-xs text-slate-400 font-medium">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Right Visual Column: Responsive Order (2 on mobile) */}
    <div className="lg:col-span-5 relative order-2 lg:order-2">
      <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-slate-100 bg-white p-3 md:p-4 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] transition-transform duration-700 hover:rotate-1">
        <div className="grid gap-3 md:gap-4">
          {/* Main Product Card */}
          <div className="group space-y-3 md:space-y-4 rounded-[1.5rem] md:rounded-[2.5rem] bg-slate-50 p-3 md:p-4 transition-colors hover:bg-white">
            <div className="relative overflow-hidden rounded-[1.25rem] md:rounded-[2rem]">
              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800" 
                alt="Hero product" 
                className="h-48 sm:h-64 md:h-80 w-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-blue-600">Best Seller</div>
            </div>
            <div className="px-1 md:px-2 pb-1">
              <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Audio Essentials</p>
              <h2 className="mt-1 text-xl md:text-2xl font-black text-slate-950">AirWave Pro Max</h2>
              <div className="mt-3 md:mt-4 flex items-center justify-between">
                <span className="text-lg md:text-xl font-black text-blue-600">$249.00</span>
                <button className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-slate-950 text-white flex items-center justify-center hover:bg-blue-600 transition-colors">+</button>
              </div>
            </div>
          </div>

          {/* Secondary Stats/Highlight - Simplified for mobile */}
          <div className="flex items-center gap-3 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 bg-white p-3 md:p-4 shadow-sm">
             <div className="flex -space-x-2 md:-space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="h-6 w-6 md:h-8 md:w-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                  </div>
                ))}
             </div>
             <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500">Joined by 12k+ members</p>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</section>

      {/* SHOP SECTION */}
    <section id="shop" className="w-full bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight uppercase leading-none">
            Shop <span className="text-indigo-600">Collection</span>
          </h2>
          <p className="text-slate-500 text-sm mt-4">
            {products?.length > 0
              ? `Showing 8 of ${products.length} unique items`
              : "No items found"}
          </p>
          
          {loading && (
            <div className="flex items-center gap-2 text-slate-500 font-medium mt-4">
              <div className="animate-spin h-5 w-5 border-2 border-slate-950 border-t-transparent rounded-full"></div>
              <span className="text-sm">Updating...</span>
            </div>
          )}
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {products.length > 0 ? (
            products.slice(0, 8).map((p) => (
              <div 
                key={p._id || p.id} 
                onClick={() => navigate(`/product/${p._id || p.id}`)}
                className="group cursor-pointer flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-slate-100 p-6">
                  <img
            src={p.image || "https://placehold.co/400"}
            alt={p.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/400";
           }}
          />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-sm">
                    {p.tag || 'New Arrival'}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-slate-900 text-base md:text-lg mb-4 line-clamp-1">
                    {p.name}
                  </h3>
                  
                  {/* Price and Actions */}
                  <div className="mt-auto flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 line-through font-medium">
                        ${(parseFloat(p.price?.toString().replace('$', '') || 0) * 1.2).toFixed(0)}
                      </span>
                      <span className="text-xl font-black text-slate-900">
                        {p.price?.toString().startsWith('$') ? p.price : `$${p.price}`}
                      </span>
                    </div>
                    
                    <button 
                      onClick={(e) => handleAddToCart(e, p)}
                      className="bg-slate-950 hover:bg-indigo-600 text-white p-3 rounded-xl transition-colors duration-300 active:scale-95"
                      aria-label="Add to cart"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : !loading && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center px-4">
                <div className="bg-slate-100 p-6 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-slate-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900">No items found</h3>
                <p className="text-slate-500 max-w-xs mx-auto">We couldn't find any products right now.</p>
            </div>
          )}
        </div>

        {/* More Button */}
        {products.length > 8 && (
          <div className="flex justify-center mt-16">
            <button
              onClick={handleShowMore}
              className="group relative px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              SHOW MORE COLLECTION
            </button>
          </div>
        )}
      </div>
    </section>

      {/* SHOP BY CATEGORIES SECTION */}
     <ShopByCategories />

      {/* About - #about */}
      <section id="about" className="py-24 px-6 lg:px-20 bg-white text-slate-900 border-y border-slate-50">
  <div className="max-w-7xl mx-auto">
    
    {/* Header Section */}
    <div className="text-center mb-20">
      <span className="inline-block px-8 py-3 rounded-full bg-slate-50 border border-slate-200 text-sm font-black uppercase tracking-[0.2em] mb-8 shadow-sm text-blue-600">
        About Utkarsh Store
      </span>
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[-0.02em] leading-[0.9] text-slate-950">
        Premium Experience <br className="md:hidden" />
        <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-2">
          Curated for Excellence
        </span>
      </h2>
    </div>

    {/* Statistics Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 mb-24">
      
      {/* Products Card */}
      <div className="group text-center p-10 bg-slate-50 rounded-[3rem] border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:bg-white hover:-translate-y-2">
        <div className="inline-flex w-24 h-24 bg-white rounded-3xl items-center justify-center mb-6 mx-auto border border-slate-200 shadow-sm group-hover:bg-blue-50 transition-all duration-500">
          <ShoppingBag className="w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform" />
        </div>
        <h3 className="text-5xl font-black text-slate-950 mb-4 tracking-tighter">1,247+</h3>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Premium Products</p>
      </div>

      {/* Customers Card */}
      <div className="group text-center p-10 bg-slate-50 rounded-[3rem] border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:bg-white hover:-translate-y-2">
        <div className="inline-flex w-24 h-24 bg-white rounded-3xl items-center justify-center mb-6 mx-auto border border-slate-200 shadow-sm group-hover:bg-blue-50 transition-all duration-500">
          <Users className="w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform" />
        </div>
        <h3 className="text-5xl font-black text-slate-950 mb-4 tracking-tighter">25K+</h3>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Happy Customers</p>
      </div>

      {/* Delivery Success Card */}
      <div className="group text-center p-10 bg-slate-50 rounded-[3rem] border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:bg-white hover:-translate-y-2">
        <div className="inline-flex w-24 h-24 bg-white rounded-3xl items-center justify-center mb-6 mx-auto border border-slate-200 shadow-sm group-hover:bg-blue-50 transition-all duration-500">
          <Truck className="w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform" />
        </div>
        <h3 className="text-5xl font-black text-slate-950 mb-4 tracking-tighter">99.9%</h3>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Delivery Success</p>
      </div>
      
    </div>

    {/* Footer CTA */}
  </div>
</section>



{/* Contact Section - #contact */}
      <section id="contact" className="py-24 px-6 lg:px-20 bg-slate-50">
  <div className="max-w-7xl mx-auto">
    
    {/* SECTION HEADER */}
    <div className="text-center mb-20">
      <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase mb-4">
        Get <span className="text-indigo-600">In</span> Touch
      </h2>
      <div className="flex items-center justify-center gap-4">
        <div className="h-[2px] w-12 bg-blue-600"></div>
        <p className="text-slate-500 font-bold tracking-[0.2em] uppercase text-xs">
          Contact our support team 24/7
        </p>
        <div className="h-[2px] w-12 bg-blue-600"></div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      
      {/* LEFT SIDE: INFO & MAP */}
      <div className="space-y-12">
        <div className="space-y-6">
          <h3 className="text-4xl font-black text-slate-900 uppercase">Let's Talk.</h3>
          <p className="text-slate-500 font-medium leading-relaxed max-w-md">
            Have a question about a product or your order? Our team is ready to help you provide the best experience.
          </p>
        </div>

        {/* INFO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
              📍
            </div>
            <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-2">Our Location</h4>
            <p className="text-slate-500 text-sm leading-relaxed">
              Greater Noida, Uttar Pradesh, India
            </p>
          </div>

          <div className="p-8 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
              ✉️
            </div>
            <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-2">Email Support</h4>
            <p className="text-slate-500 text-sm">support@utkarshhome.com</p>
          </div>
        </div>

        {/* GOOGLE MAPS EMBED */}
        <div className="rounded-[3rem] overflow-hidden shadow-2xl h-72 border-8 border-white">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112130.34445638891!2d77.38984903330691!3d28.47724749377478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc1df09cfd46b%3A0x6690dd2de3a1415b!2sGreater%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1715264000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            className="grayscale hover:grayscale-0 transition-all duration-1000"
          ></iframe>
        </div>
      </div>

      {/* RIGHT SIDE: CONTACT FORM */}
     <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-64 w-64 bg-slate-50 rounded-full opacity-50"></div>
            
            <form onSubmit={handleContactSubmit} className="relative z-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={contactFormData.name}
                    onChange={(e) => setContactFormData({...contactFormData, name: e.target.value})} 
                    placeholder="full name"
                    className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-[1.5rem] outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Email</label>
                  <input 
                    type="email" 
                    required
                    value={contactFormData.email} 
                    onChange={(e) => setContactFormData({...contactFormData, email: e.target.value})}
                    placeholder="example@mail.com"
                    className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-[1.5rem] outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Subject</label>
                <select 
                  value={contactFormData.subject}   
                  onChange={(e) => setContactFormData({...contactFormData, subject: e.target.value})}                  className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-[1.5rem] outline-none transition-all font-bold text-slate-900 appearance-none"
                >
                  <option value="Project Inquiry">Project Inquiry</option>
                  <option value="Customer Support">Customer Support</option>
                  <option value="Partnership">Partnership</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Message</label>
                <textarea 
                  rows="4" 
                  required
                  value={contactFormData.message}             
                  onChange={(e) => setContactFormData({...contactFormData, message: e.target.value})}     
                  placeholder="Tell us what you're thinking..."
                  className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-[2rem] outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300 resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="group w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-xs hover:bg-blue-600 hover:shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:-translate-y-2 transition-all duration-500 flex items-center justify-center gap-4 disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>


      {/* Blog */}
    <section id="blog" className="scroll-mt-24 max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8 md:mb-10">
    <div>
      <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Latest reads</p>
      <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-950">From our blog</h2>
    </div>
    
    {/* VIEW ALL BUTTON TOGGLE */}
    <button 
      onClick={() => setIsBlogExpanded(!isBlogExpanded)} 
      className="rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-700 transition hover:bg-slate-950 hover:text-white"
    >
      {isBlogExpanded ? "Show Less" : "View All Posts"}
    </button>
  </div>

  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {displayedPosts.map((post) => (
    <div 
      key={post.id} 
      // 1. ADD ONCLICK TO THE ENTIRE CONTAINER
      onClick={() => setSelectedPost(post)}
      // 2. ADD CURSOR-POINTER SO USERS KNOW IT'S CLICKABLE
      className="group cursor-pointer overflow-hidden rounded-[2rem] border border-slate-200/20 bg-white shadow-xl transition hover:-translate-y-1.5 hover:shadow-2xl"
    >
      <div className="relative h-48 overflow-hidden bg-slate-950">
        <img 
          src={`https://picsum.photos/seed/${post.id + 50}/600/400`} 
          alt={post.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Decorative Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-slate-900 font-bold">
            Read Article
          </span>
        </div>
      </div>

      <div className="p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400 font-semibold">{post.date}</p>
        <h4 className="mt-3 text-xl font-black text-slate-950 leading-tight group-hover:text-blue-600 transition-colors">
          {post.title}
        </h4>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-2">
          {post.snippet}
        </p>
        
        <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:gap-4 transition-all">
          Read more <span className="text-blue-600">→</span>
        </div>
      </div>
    </div>
  ))}
</div>

  {/* FULL POST DETAIL VIEW (Modal Overlay) */}
  {selectedPost && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl">
        <button 
          onClick={() => setSelectedPost(null)}
          className="absolute top-6 right-6 h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center font-bold hover:bg-red-50 hover:text-red-600 transition"
        >
          ✕
        </button>
        <p className="text-blue-600 font-bold uppercase tracking-widest text-sm">{selectedPost.date}</p>
        <h2 className="text-4xl md:text-5xl font-black text-slate-950 mt-4 mb-8 uppercase tracking-tighter">
          {selectedPost.title}
        </h2>
        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-medium">
          {selectedPost.content}
          <p className="mt-4">Additional detailed content for the article goes here... You can pass HTML or long strings from your database.</p>
        </div>
      </div>
    </div>
  )}
</section>


      {/* Divider */}
      <div className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="w-full h-[2px] bg-gray-200 my-16 rounded-full opacity-100"></div>
        </div>
      </div>

      {/* Footer */}
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
  <div className="max-w-7xl mx-auto px-6">
    
    {/* TOP TRUST BAR: Horizontal Layout */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-16 border-b border-slate-50">
      <div className="flex items-center gap-4">
        <Truck className="text-blue-600" size={32} strokeWidth={1.5} />
        <div>
          <h5 className="font-bold text-slate-900 text-sm uppercase tracking-tight">Free Shipping</h5>
          <p className="text-slate-500 text-xs">On all orders over $50</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <RotateCcw className="text-blue-600" size={32} strokeWidth={1.5} />
        <div>
          <h5 className="font-bold text-slate-900 text-sm uppercase tracking-tight">Easy Returns</h5>
          <p className="text-slate-500 text-xs">30 days return policy</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ShieldCheck className="text-blue-600" size={32} strokeWidth={1.5} />
        <div>
          <h5 className="font-bold text-slate-900 text-sm uppercase tracking-tight">Secure Payment</h5>
          <p className="text-slate-500 text-xs">100% secure checkout</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Headset className="text-blue-600" size={32} strokeWidth={1.5} />
        <div>
          <h5 className="font-bold text-slate-900 text-sm uppercase tracking-tight">24/7 Support</h5>
          <p className="text-slate-500 text-xs">Dedicated support team</p>
        </div>
      </div>
    </div>

    {/* MAIN FOOTER CONTENT */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16">
      
      {/* Brand & Socials */}
      <div className="lg:col-span-3 space-y-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg"><ShoppingBag className="text-white" size={20} /></div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">ShopHub</span>
        </Link>
        <p className="text-slate-500 text-sm leading-relaxed">
          Your one-stop destination for trendy, high-quality products at the best prices. Shop more, save more.
        </p>
        <div className="flex gap-3">
          {['fb', 'ig', 'tw', 'yt'].map((social) => (
            <div key={social} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-blue-600 hover:text-blue-600 cursor-pointer transition-all uppercase text-[10px] font-bold">
              {social}
            </div>
          ))}
        </div>
      </div>

      {/* Links Columns */}
      <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Shop</h4>
          <ul className="space-y-2 text-sm text-slate-500 font-medium">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">New Arrivals</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Best Sellers</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Men & Women</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Accessories</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Service</h4>
          <ul className="space-y-2 text-sm text-slate-500 font-medium">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Contact Us</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Shipping Policy</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Return Policy</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">About Us</h4>
          <ul className="space-y-2 text-sm text-slate-500 font-medium">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Our Story</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Careers</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Blog</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Affiliate</li>
          </ul>
        </div>
      </div>

      {/* Newsletter & Apps */}
      <div className="lg:col-span-3 space-y-8">
        <div className="space-y-4">
          <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Newsletter</h4>
          <div className="relative">
            <form onSubmit={handleNewsletterSubmit} className="relative">
      <input 
        type="email" 
        value={newsletterEmail} // Controlled input
        onChange={(e) => setNewsletterEmail(e.target.value)}
        placeholder="Enter your email" 
        required
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600" 
      />
      <button 
        type="submit" 
        className="absolute right-2 top-1.5 bottom-1.5 bg-blue-600 text-white px-3 rounded-lg text-xs font-bold transition-transform active:scale-90"
      >
        →
      </button>
    </form>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Download Our App</h4>
          <div className="flex flex-col gap-2">
             <div className="bg-slate-900 text-white px-4 py-2 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-blue-600 transition-colors">
               <span className="text-[10px] uppercase font-bold leading-tight">Get it on <br /><span className="text-sm">Google Play</span></span>
             </div>
             <div className="bg-slate-900 text-white px-4 py-2 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-blue-600 transition-colors">
               <span className="text-[10px] uppercase font-bold leading-tight">Download on <br /><span className="text-sm">App Store</span></span>
             </div>
          </div>
        </div>
      </div>
    </div>

    {/* BOTTOM BAR */}
    <div className="pt-8 border-t border-slate-50 flex flex-col md:row justify-between items-center gap-6">
      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
        © 2026 ShopHub. All Rights Reserved.
      </p>
      <div className="flex gap-3 grayscale opacity-60">
        <div className="bg-white px-2 py-1 border border-slate-200 rounded text-[9px] font-black uppercase">Visa</div>
        <div className="bg-white px-2 py-1 border border-slate-200 rounded text-[9px] font-black uppercase">Mastercard</div>
        <div className="bg-white px-2 py-1 border border-slate-200 rounded text-[9px] font-black uppercase">PayPal</div>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Home;

