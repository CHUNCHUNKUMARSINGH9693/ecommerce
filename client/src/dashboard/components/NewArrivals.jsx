import React from 'react';

const NewArrivals = () => {
  return (
    <div className="relative w-full min-h-[400px] md:min-h-[450px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-white/5 shadow-[0_40px_80px_rgba(0,0,0,0.6)] group cursor-pointer bg-[#0A0706]">
      
      {/* 1. Signature Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_#FF7A00_0%,_#FF4D00_40%,_#990000_100%)] transition-transform duration-1000 group-hover:scale-105" />
      
      {/* 2. Textural Overlays */}
      <div className="absolute inset-0 bg-black/10 opacity-30 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-white/10" />

      <div className="relative z-20 p-10 md:p-14 h-full flex flex-col justify-center">
        
        {/* Collection Badge */}
        <div className="mb-6">
          <span className="bg-white/10 backdrop-blur-xl px-5 py-2 rounded-xl text-[9px] text-white/90 font-black uppercase tracking-[0.3em] border border-white/10 inline-block italic shadow-xl">
            Limited Collection
          </span>
        </div>

        {/* 3. High-Fidelity 3D Typography */}
        <div className="relative select-none">
          <h2 className="text-6xl md:text-[5.5rem] font-black uppercase italic leading-[0.85] tracking-tighter text-[#3D1405] drop-shadow-[0_2px_0px_rgba(255,255,255,0.15)]">
            <span className="block mb-2 filter drop-shadow-[6px_8px_4px_rgba(0,0,0,0.4)]">New</span>
            <span className="block filter drop-shadow-[6px_8px_4px_rgba(0,0,0,0.4)]">Arrivals</span>
          </h2>
          {/* Subtle Ambient Text Glow */}
          <div className="absolute inset-0 text-white/5 blur-[12px] pointer-events-none transition-opacity group-hover:opacity-20">
            New <br /> Arrivals
          </div>
        </div>
        
        {/* 4. Action Button */}
        <div className="mt-10">
          <button className="bg-white/10 backdrop-blur-2xl text-white text-[10px] font-black uppercase px-10 py-4 rounded-2xl border border-white/15 shadow-2xl hover:bg-white hover:text-[#990000] transition-all duration-500 transform hover:scale-105 active:scale-95 italic tracking-widest flex items-center gap-3 group/btn">
            Shop Exclusive
            <span className="text-lg group-hover/btn:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* 5. Floating 3D Product Podium */}
        <div className="absolute right-[2%] top-1/2 -translate-y-1/2 w-[55%] md:w-[48%] aspect-[1.1/1]">
          <div className="relative w-full h-full transform rotate-[-12deg] group-hover:rotate-[-6deg] group-hover:scale-110 transition-all duration-1000 ease-out">
            {/* The Glass Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-black/60 backdrop-blur-md rounded-[3rem] border border-white/10 shadow-[30px_60px_100px_rgba(0,0,0,0.6)]" />
            
            {/* 3D Product */}
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80" 
              alt="Premium Sneaker"
              className="absolute inset-0 w-full h-full object-contain scale-125 -translate-y-8 drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)] filter brightness-110"
            />
            
            {/* Ambient Lighting Particles */}
            <div className="absolute -inset-10 bg-orange-400/10 blur-[100px] rounded-full pointer-events-none animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;