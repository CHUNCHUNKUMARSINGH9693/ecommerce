import React, { useState, useEffect } from 'react';
import SampleCard from '../components/SampleCard';
import API from '../../services/api';

const WorkSamples = () => {
  const [products, setProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8); // Start with 8 items

  // handleAddToCart Logic remains the same as your previous version...
  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item._id === product._id);
    if (existingItem) { alert("Already in cart!"); return; }
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
    alert(`${product.name} added to cart!`);
  };

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await API.get('/products/inventory');
        if (response.data?.success) setProducts(response.data.data);
      } catch (err) { console.error(err); }
    };
    fetchInventory();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8); // Load 8 more on click
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 text-white max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-black uppercase mb-10 text-center md:text-left">
        Product <span className="text-orange-600">Inventory</span>
      </h1>

      {/* Fully Responsive Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {products.slice(0, visibleCount).map((item) => (
          <SampleCard 
            key={item._id} 
            item={item} 
            onViewDetails={setSelectedItem}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < products.length && (
        <div className="flex justify-center mt-12 mb-8">
          <button 
            onClick={handleLoadMore}
            className="px-10 py-4 bg-orange-600 hover:bg-orange-700 text-white font-black uppercase rounded-xl transition-all active:scale-95 shadow-lg shadow-orange-600/20"
          >
            Load More Products
          </button>
        </div>
      )}

      {/* --- ENHANCED MODAL --- */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
           <div className="w-full max-w-2xl bg-[#140a05] border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 h-64 md:h-auto">
                  <img src={selectedItem.image} className="w-full h-full object-cover" alt={selectedItem.name} />
                </div>
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                  <span className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-2 block">{selectedItem.category}</span>
                  <h2 className="text-2xl md:text-3xl font-black mb-2 leading-tight">{selectedItem.name}</h2>
                  <p className="text-orange-500 text-2xl font-black mb-4">${selectedItem.price}</p>
                  
                  {/* More Details section */}
                  <div className="mb-6">
                    <h4 className="text-white/40 uppercase text-[10px] font-bold tracking-widest mb-2">Description</h4>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {selectedItem.description || "High-quality premium product designed for durability and performance. Perfect for modern lifestyles."}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => {
                        handleAddToCart(selectedItem);
                        setSelectedItem(null);
                      }}
                      className="w-full py-4 bg-orange-600 text-white font-black rounded-xl uppercase hover:bg-white hover:text-black transition-all"
                    >
                      Add to Cart
                    </button>
                    <button onClick={() => setSelectedItem(null)} className="w-full py-3 text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest">
                      ← Back to Gallery
                    </button>
                  </div>
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default WorkSamples;