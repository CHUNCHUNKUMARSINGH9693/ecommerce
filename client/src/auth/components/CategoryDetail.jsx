import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShieldCheck, Truck, Zap } from 'lucide-react';

const CategoryDetail = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  // Mock Data: In a real app, you would fetch this from an API based on categoryId
  const categoryContent = {
  electronics: {
    name: "Electronics & Tech",
    tagline: "The Future is Here",
    description: "Discover our latest collection of high-performance laptops, smart devices, and professional accessories designed for the modern workspace.",
    featuredProduct: "New DELL XPS 13",
    price: "Starting from $999",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
    accent: "text-blue-600",
    bg: "bg-blue-50"
  },
  fashion: {
    name: "Fashion & Apparel",
    tagline: "Define Your Style",
    description: "From iconic sneakers to contemporary streetwear, explore apparel that blends comfort with high-fashion aesthetics.",
    featuredProduct: "Nike Air Jordan 1",
    price: "Starting from $180",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    accent: "text-orange-600",
    bg: "bg-orange-50"
  },
  beauty: {
    name: "Beauty & Fragrance",
    tagline: "Pure Radiance",
    description: "Indulge in premium skincare and luxury scents that elevate your daily routine and highlight your natural glow.",
    featuredProduct: "Gucci Bloom EDP",
    price: "Starting from $110",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
    accent: "text-purple-600",
    bg: "bg-purple-50"
  },
  kitchen: {
    name: "Home & Kitchen",
    tagline: "Smart Living",
    description: "Professional-grade appliances and modern kitchen essentials designed to make every meal a masterpiece.",
    featuredProduct: "Chef's Air Fryer Pro",
    price: "Starting from $249",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800",
    accent: "text-amber-600",
    bg: "bg-amber-50"
  },
  groceries: {
    name: "Grocery & Food",
    tagline: "Freshly Picked",
    description: "Farm-to-table freshness delivered to your door. Explore organic produce and premium pantry staples.",
    featuredProduct: "Organic Harvest Box",
    price: "Starting from $45",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
    accent: "text-green-600",
    bg: "bg-green-50"
  },
  watches: {
    name: "Luxury & Watches",
    tagline: "Timeless Precision",
    description: "Celebrate every second with our collection of master-crafted timepieces and luxury wristwear.",
    featuredProduct: "Rolex Submariner",
    price: "Starting from $8,500",
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800",
    accent: "text-rose-600",
    bg: "bg-rose-50"
  }
};


  const data = categoryContent[categoryId] || { 
    name: "Coming Soon", 
    description: "We are currently updating this category with exciting new products.",
    bg: "bg-slate-50",
    accent: "text-slate-600"
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-all group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          BACK TO SHOP
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-10">
        {/* Text Content */}
        <div className="space-y-8">
          <div>
            <span className={`inline-block font-black uppercase tracking-widest text-sm mb-4 ${data.accent}`}>
              {data.tagline || "Our Collection"}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-6">
              {data.name}
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
              {data.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Feature icon={<ShieldCheck className="text-green-500" />} text="Official Warranty" />
            <Feature icon={<Truck className="text-blue-500" />} text="Express Shipping" />
            <Feature icon={<Zap className="text-amber-500" />} text="Instant Checkout" />
          </div>

          <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 flex justify-between items-center">
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-tight">Best Seller</p>
              <h3 className="text-xl font-bold text-slate-900">{data.featuredProduct}</h3>
              <p className={`font-black mt-1 ${data.accent}`}>{data.price}</p>
            </div>
            <button onClick={() => navigate('/login')} // Redirects to the login route
               className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all hover:shadow-lg active:scale-95">
                  Explore All
            </button>
          </div>
        </div>

        {/* Image Display */}
        <div className={`relative rounded-[3rem] ${data.bg} p-12 overflow-hidden aspect-square flex items-center justify-center`}>
          <img 
            src={data.image} 
            alt={data.name} 
            className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

const Feature = ({ icon, text }) => (
  <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
    {icon}
    <span className="text-sm font-bold text-slate-700">{text}</span>
  </div>
);

export default CategoryDetail;