import React from 'react';

const NewArrivals = () => {
  return (
    <div className="bg-[#1a1310] border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden flex flex-col justify-between min-h-[400px] w-full">
      <div className="relative z-10 max-w-[180px]">
        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Limited Collection</span>
        <h2 className="text-white text-5xl font-serif italic leading-tight mt-2">
          New <br /> Arrivals
        </h2>
        <button className="mt-8 bg-white text-black text-[10px] font-black uppercase px-8 py-3 rounded-full hover:bg-gray-200 transition-all">
          Shop Exclusive
        </button>
      </div>

      {/* Product Image Positioning */}
      <div className="absolute right-0 bottom-0 w-full h-full pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" 
          alt="Sneaker"
          className="absolute right-[-20px] bottom-10 w-64 h-auto rotate-[-15deg] drop-shadow-2xl z-20"
        />
      </div>
    </div>
  );
};

export default NewArrivals;