import React from 'react';
import SampleCard from '../components/SampleCard';

const WorkSamples = () => {
  const sampleData = [
    // --- ELECTRONICS ---
    { id: 1, title: "Premium Wireless Headphones", category: "Electronics", price: 299.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", tag: "Best Seller", rating: 4.8 },
    { id: 2, title: "Ultra-Slim Gaming Laptop", category: "Electronics", price: 1299.00, image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed", tag: "Hot", rating: 4.9 },
    { id: 3, title: "Noise Cancelling Earbuds", category: "Electronics", price: 129.99, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df", tag: "Trending", rating: 4.7 },
    { id: 4, title: "Mechanical RGB Keyboard", category: "Electronics", price: 159.00, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae", tag: "New", rating: 4.6 },
    { id: 5, title: "4K Mirrorless Camera", category: "Electronics", price: 899.00, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32", tag: "Professional", rating: 4.9 },
    { id: 6, title: "Smart Home Assistant", category: "Electronics", price: 79.99, image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc", tag: "Sale", rating: 4.4 },

    // --- ACCESSORIES ---
    { id: 7, title: "Classic Leather Watch", category: "Accessories", price: 150.00, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314", tag: "Limited", rating: 4.5 },
    { id: 8, title: "Heritage Canvas Backpack", category: "Accessories", price: 65.00, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa", tag: "Durable", rating: 4.6 },
    { id: 9, title: "Modern Polarized Sunglasses", category: "Accessories", price: 85.00, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f", tag: "Flash Sale", rating: 4.4 },
    { id: 10, title: "Minimalist Leather Wallet", category: "Accessories", price: 45.00, image: "https://images.unsplash.com/photo-1627123424574-724758594e93", tag: "New Arrival", rating: 4.8 },
    { id: 11, title: "Gold Plated Cufflinks", category: "Accessories", price: 120.00, image: "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599", tag: "Luxury", rating: 4.7 },
    { id: 12, title: "Stainless Steel Bottle", category: "Accessories", price: 30.00, image: "https://images.unsplash.com/photo-1602143399827-bd959517b58e?auto=format&fit=crop&w=800&q=80", tag: "Eco", rating: 4.5 },    { id: 13, title: "Minimalist Cotton Tee", category: "Fashion", price: 35.00, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", tag: "Essential", rating: 4.2 },
    { id: 14, title: "Luxury Silk Evening Dress", category: "Fashion", price: 210.00, image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15", tag: "Premium", rating: 4.3 },
    { id: 15, title: "Urban Denim Jacket", category: "Fashion", price: 95.00, image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2", tag: "Best Seller", rating: 4.6 },
    { id: 16, title: "Cashmere Winter Scarf", category: "Fashion", price: 55.00, image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9", tag: "Cozy", rating: 4.9 },
    { id: 17, title: "Tailored Slim Fit Suit", category: "Fashion", price: 450.00, image: "https://images.unsplash.com/photo-1594932224827-ec4b59ca583a", tag: "Classic", rating: 4.8 },
    { id: 18, title: "Breathable Mesh Sneakers", category: "Fashion", price: 80.00, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", tag: "Athletic", rating: 4.7 },

    // --- HOME & LIFESTYLE ---
    { id: 19, title: "Ergonomic Office Chair", category: "Lifestyle", price: 350.00, image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1", tag: "Comfort", rating: 4.8 },
    { id: 20, title: "Scented Soy Candle Set", category: "Lifestyle", price: 25.00, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59", tag: "Gift", rating: 4.5 },
    { id: 21, title: "Electric Pour-Over Kettle", category: "Lifestyle", price: 110.00, image: "https://images.unsplash.com/photo-1574170623305-6f86641550d3", tag: "Modern", rating: 4.9 },
    { id: 22, title: "Ceramic Minimalist Vase", category: "Lifestyle", price: 40.00, image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427", tag: "Decor", rating: 4.6 },
    { id: 23, title: "Adjustable Standing Desk", category: "Lifestyle", price: 499.00, image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c", tag: "Productive", rating: 4.8 },
    { id: 24, title: "Bluetooth Turntable", category: "Lifestyle", price: 180.00, image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617", tag: "Vintage", rating: 4.7 },
  ];

  return (
    <div className="animate-fade-in space-y-10 text-white p-6 md:p-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-black uppercase tracking-tight">
          Product <span className="text-orange-600">Inventory</span>
        </h1>
        <p className="text-gray-500 font-medium tracking-wide">
          A collection of high-end consumer goods from our digital marketplace.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {sampleData.map((item) => (
          <SampleCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default WorkSamples;