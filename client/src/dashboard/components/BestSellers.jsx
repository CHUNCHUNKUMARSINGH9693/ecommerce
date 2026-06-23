import React from 'react';
import { Star, MoreHorizontal } from 'lucide-react';

const BestSellers = ({ products = [] }) => {
  const displayProducts = products.length > 0 ? products.slice(0, 2) : [
    {
      id: 1,
      name: "AirWave Pro Max",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      isHot: true,
    },
    {
      id: 2,
      name: "Swift-Run V2",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      isHot: false,
    }
  ];

  return (
    <div className="bg-[#1A1613] p-6 rounded-[2rem] border border-white/5 shadow-2xl w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-white text-lg font-black uppercase tracking-[0.2em] italic">Best Sellers</h2>
          <div className="h-1 w-12 bg-orange-600 mt-1 rounded-full" />
        </div>
        <button className="text-white/30 text-[10px] uppercase font-black tracking-widest hover:text-orange-500 transition-colors">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {displayProducts.map((product) => (
          <div key={product.id} className="group relative">
            {/* Card Background with Glow */}
            <div className="bg-[#241E1B] p-5 rounded-[1.5rem] border border-white/5 group-hover:border-orange-500/30 transition-all duration-500 h-full flex flex-col items-center">
              
              {/* Product Showcase (Podium Style) */}
              <div className="relative w-full aspect-square mb-6 flex items-center justify-center">
                {/* 3D Base/Podium Shadow */}
                <div className="absolute bottom-4 w-3/4 h-8 bg-black/40 blur-xl rounded-[100%] group-hover:scale-110 transition-transform duration-500" />
                
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="relative z-10 w-full h-full object-contain transform group-hover:-translate-y-4 transition-transform duration-500 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
                />

                {/* Hot Badge */}
                {product.isHot && (
                  <div className="absolute top-0 left-0 bg-orange-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg z-20">
                    Hot
                  </div>
                )}
              </div>

              {/* Price & Rating */}
              <div className="w-full text-center mt-auto">
                <p className="text-white text-2xl font-black italic tracking-tighter mb-2">
                  ${product.price}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex gap-0.5 text-orange-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} fill="currentColor" />
                    ))}
                  </div>
                  <button className="text-white/20 hover:text-white transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;