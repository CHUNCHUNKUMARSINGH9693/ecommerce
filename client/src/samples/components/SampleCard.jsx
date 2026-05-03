import React from 'react';

const SampleCard = ({ item, onViewDetails, onAddToCart }) => {
  return (
    <div className="group bg-[#1A1613] rounded-2xl overflow-hidden transition-all duration-300 border border-white/5 hover:border-orange-500/30 flex flex-col h-full">
      <div className="relative h-48 sm:h-56 overflow-hidden bg-black/40">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'; }}
        />
        
        {/* Quick Add Button - Visible on hover (Desktop) and always on small screens */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(item);
          }}
          className="absolute bottom-3 right-3 bg-orange-600 p-2.5 rounded-lg md:opacity-0 group-hover:opacity-100 transition-all transform hover:bg-orange-500 active:scale-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <div className="p-4 md:p-5 flex flex-col flex-grow">
        <div className="mb-1">
          <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest">
            {item.category}
          </span>
        </div>
        <h3 className="font-bold text-white text-base md:text-lg truncate mb-4">
          {item.name}
        </h3>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg md:text-xl font-black text-white italic">${item.price}</span>
          <button
            className="text-[10px] font-black text-white/50 hover:text-orange-500 uppercase tracking-widest transition-all"
            onClick={() => onViewDetails(item)}
          >
            Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SampleCard;