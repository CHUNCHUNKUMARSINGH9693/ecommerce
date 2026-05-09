import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Laptop, 
  Shirt, 
  Sparkles, 
  Utensils, 
  ShoppingCart, 
  Watch, 
  ArrowRight 
} from 'lucide-react';

const CategoryCard = ({ title, itemName, description, icon: Icon, image, bgColor, textColor, path }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(path)}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl ${bgColor} p-6 md:p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer border border-slate-100`}
    >
      {/* Top Section: Icon & Description */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-2xl bg-white shadow-sm ${textColor}`}>
            <Icon size={24} strokeWidth={2.5} />
          </div>
          <div className={`${textColor} opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0`}>
            <ArrowRight size={20} />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tight">
          {title}
        </h3>
        <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed max-w-[200px]">
          {description}
        </p>
      </div>

      {/* Middle Section: Image (Fixed Height Container) */}
      <div className="relative h-40 md:h-48 my-6 flex items-center justify-center">
        <img 
          src={image} 
          alt={itemName} 
          className="max-h-full max-w-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-multiply" 
        />
      </div>

      {/* Bottom Section: Label */}
      <div className="text-center relative z-10">
        <span className="inline-block text-slate-800 font-bold text-sm bg-white/80 backdrop-blur-md py-2 px-6 rounded-full shadow-sm border border-white/50">
          {itemName}
        </span>
      </div>
    </div>
  );
};

const ShopByCategories = () => {
  const categories = [
    {
      title: "Electronics & Tech",
      itemName: "New DELL XPS 13",
      description: "Cutting-edge laptops and accessories for your digital life.",
      path: "/category/electronics",
      icon: Laptop,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-blue-50/50",
      textColor: "text-blue-600"
    },
    {
      title: "Fashion & Apparel",
      itemName: "Nike Air Jordan 1",
      description: "Stay ahead of the trend with curated streetwear and footwear.",
      path: "/category/fashion",
      icon: Shirt,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-orange-50/50",
      textColor: "text-orange-600"
    },
    {
      title: "Beauty & Fragrance",
      itemName: "Gucci Bloom",
      description: "Luxury fragrances and skincare for a premium care routine.",
      path: "/category/beauty",
      icon: Sparkles,
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-purple-50/50",
      textColor: "text-purple-600"
    },
    {
      title: "Home & Kitchen",
      itemName: "Microwave Oven",
      description: "High-performance tools for the modern culinary space.",
      path: "/category/kitchen",
      icon: Utensils,
      image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-amber-50/50",
      textColor: "text-amber-600"
    },
    {
      title: "Grocery & Food",
      itemName: "Premium Rice",
      description: "Farm-fresh produce and daily essentials delivered fast.",
      path: "/category/groceries",
      icon: ShoppingCart,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-green-50/50",
      textColor: "text-green-600"
    },
    {
      title: "Luxury & Watches",
      itemName: "Rolex Submariner",
      description: "Timepieces that combine timeless style with precision.",
      path: "/category/watches",
      icon: Watch,
      image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-rose-50/50",
      textColor: "text-rose-600"
    }
  ];

  return (
    <section id="categories" className="py-24 bg-[#FCFCFD]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter uppercase">
            Shop By Categories
          </h2>
          <div className="flex items-center gap-4">
            <span className="h-[2px] w-12 bg-slate-200"></span>
            <div className="bg-rose-500 p-2 rounded-lg shadow-md rotate-3 group">
              <ShoppingCart size={18} className="text-white" strokeWidth={3} />
            </div>
            <span className="h-[2px] w-12 bg-slate-200"></span>
          </div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <CategoryCard key={index} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategories;