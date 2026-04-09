import React from 'react';
import DealCard from './DealCard';

const DealList = () => {
  const mockDeals = [
    {
      id: 1,
      title: "Premium Home Review",
      brand: "Utkarsh Home",
      reward: "$25.00",
      type: "High Priority",
      expiry: "2 days left",
      image: "🏠"
    },
    {
      id: 2,
      title: "App Feedback Session",
      brand: "TechFlow",
      reward: "$15.00",
      type: "Standard",
      expiry: "5 days left",
      image: "📱"
    },
    {
      id: 3,
      title: "Product Unboxing",
      brand: "GlowKit",
      reward: "$40.00",
      type: "Video",
      expiry: "12 hours left",
      image: "📦"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockDeals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
};

export default DealList;