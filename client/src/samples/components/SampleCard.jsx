import React from 'react';

const SampleCard = ({ item, onViewDetails, onAddToCart }) => {
  return (
    <div 
      onClick={() => onViewDetails(item)}
      className="group bg-[#1A1613] rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500 border border-white/5 hover:border-orange-500/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col h-full cursor-pointer relative w-full"
    >
      {/* Image Container - Aspect ratio keeps it consistent across devices */}
      <div className="relative aspect-[4/3] sm:aspect-square md:aspect-[4/5] overflow-hidden bg-black/40">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'; }}
        />
        
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1613] via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 md:top-4 md:left-4">
           <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[8px] md:text-[10px] font-black text-orange-500 uppercase tracking-widest border border-white/10">
            {item.category}
          </span>
        </div>

        {/* Quick Add Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(item);
          }}
          className="absolute bottom-3 right-3 md:bottom-5 md:right-5 bg-orange-600 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-2xl translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black active:scale-90 z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow text-center">
        {/* Status Indicators - Centered */}
        <div className="flex justify-center items-center mb-3 gap-3">
          <span className="hidden sm:block text-[9px] font-bold text-white/30 uppercase tracking-tighter">
            Premium
          </span>
          <span className="text-[9px] font-black text-green-500 uppercase tracking-tighter flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> In Stock
          </span>
        </div>
        
        {/* Title - Centered with line clamp */}
        <h3 className="font-bold text-white text-lg sm:text-xl md:text-2xl leading-tight group-hover:text-orange-500 transition-colors duration-300 mb-4 line-clamp-2">
          {item.name}
        </h3>
        
        {/* Price Section - Centered at the bottom */}
        <div className="mt-auto pt-4 border-t border-white/5 flex flex-col items-center justify-center">
          <span className="text-[9px] md:text-[10px] text-white/30 uppercase font-black tracking-[0.2em] mb-1">
            Price
          </span>
          <span className="text-2xl sm:text-3xl md:text-4xl font-black text-white italic tracking-tighter">
            ${item.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SampleCard;