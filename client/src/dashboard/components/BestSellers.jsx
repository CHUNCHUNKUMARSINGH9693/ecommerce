import React from 'react';
import { Star } from 'lucide-react';

const BestSellers = () => {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      isHot: true,
    },
    {
      id: 2,
      name: "Casual Sneakers",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
      isHot: false,
    }
  ];

  return (
    <div className="bg-[#1a1614] p-6 rounded-3xl w-full max-w-4xl border border-white/5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-lg font-semibold uppercase tracking-wider">Best Sellers</h2>
        <button className="text-orange-500 text-xs uppercase font-bold hover:underline">View All</button>
      </div>

      {/* Grid: 1 column on mobile, 2 columns on small screens and up */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-[#241e1b] p-4 rounded-2xl relative border border-white/5 group">
            {/* Hot Badge */}
            {product.isHot && (
              <span className="absolute top-4 left-4 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 uppercase">
                Hot
              </span>
            )}
            
            {/* Image Container */}
            <div className="aspect-square w-full mb-4 overflow-hidden rounded-xl bg-[#1a1614] flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-2">
              <p className="text-white text-xl font-bold">${product.price}</p>
              <div className="flex items-center justify-between">
                <div className="flex text-orange-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                {/* Options menu dots */}
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
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