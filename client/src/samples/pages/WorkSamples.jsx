import React, { useState, useEffect, useMemo } from 'react';
import SampleCard from '../components/SampleCard';
import API from '../../services/api';

const WorkSamples = () => {
  const [products, setProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Fetch product inventory from API
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await API.get('/products/inventory');
        if (response.data?.success) {
          setProducts(response.data.data);
        }
      } catch (err) {
        console.error("API Error:", err);
      }
    };
    fetchInventory();
  }, []);

  // Generate dynamic categories (Electronics, Fashion, etc.)
  const categories = useMemo(() => {
    const uniqueCats = ['All', ...new Set(products.map(item => item.category))];
    return uniqueCats;
  }, [products]);

  // Filter products based on selected tab
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item._id === product._id);
    if (existingItem) {
      alert("This item is already in your cart!");
      return;
    }
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Sync with navigation bar cart count
    window.dispatchEvent(new Event('cartUpdated'));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 text-white max-w-7xl mx-auto min-h-screen">
      <header className="mb-12">
        <h1 className="text-3xl md:text-5xl font-black uppercase text-center tracking-tighter">
          Work <span className="text-orange-600">Samples</span>
        </h1>
        <p className="text-center text-white/40 mt-2 uppercase text-xs font-bold tracking-[0.2em]">
          Product Categories & Inventory
        </p>
      </header>

      {/* Category Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-7 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
              activeCategory === cat 
                ? 'bg-orange-600 border-orange-600 text-white scale-110 shadow-[0_0_20px_rgba(234,88,12,0.4)]' 
                : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
        {filteredProducts.map((item) => (
          <SampleCard 
            key={item._id} 
            item={item} 
            onViewDetails={setSelectedItem}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Empty State Logic */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-32 border border-dashed border-white/10 rounded-3xl mt-10">
          <p className="text-white/20 font-black uppercase tracking-widest text-lg">
            No items found in {activeCategory}
          </p>
        </div>
      )}

      {/* Detailed View Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
           <div className="w-full max-w-4xl bg-[#0f0804] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 h-80 md:h-[500px]">
                  <img 
                    src={selectedItem.image} 
                    className="w-full h-full object-cover" 
                    alt={selectedItem.name} 
                  />
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <span className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-3 block">
                    {selectedItem.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black mb-4 leading-none uppercase italic">
                    {selectedItem.name}
                  </h2>
                  <p className="text-white text-3xl font-black mb-8 border-b border-white/10 pb-4">
                    ${selectedItem.price}
                  </p>
                  
                  <div className="mb-10">
                    <h4 className="text-white/30 uppercase text-[10px] font-bold tracking-[0.3em] mb-3">Specification</h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {selectedItem.description || "Premium product curated for the Utkarsh Home ecosystem, featuring high-durability materials and modern design aesthetics."}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={() => {
                        handleAddToCart(selectedItem);
                        setSelectedItem(null);
                      }}
                      className="w-full py-5 bg-orange-600 text-white font-black rounded-2xl uppercase hover:bg-white hover:text-black transition-all duration-300 active:scale-95"
                    >
                      Add to Shopping Cart
                    </button>
                    <button 
                      onClick={() => setSelectedItem(null)} 
                      className="w-full py-3 text-white/30 hover:text-white text-[10px] font-black uppercase tracking-[0.3em] transition-colors"
                    >
                      Close Preview
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