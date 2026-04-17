import React from 'react';
import SampleCard from '../components/SampleCard';

const WorkSamples = () => {
  // Use the updated data from your Gallery file
  const sampleData = [
    {
      id: 1,
      title: "Luxury Villa - Greater Noida",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      tag: "Completed"
    },
    {
      id: 2,
      title: "Modern Office Suite",
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
      tag: "Ongoing"
    },
    {
      id: 3,
      title: "Ayodhya Heritage Stay",
      category: "Hospitality",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada",
      tag: "New Launch"
    },
    {
      id: 4,
      title: "Minimalist Apartment",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
      tag: "Completed"
    }
  ];

  return (
    <div className="animate-fade-in space-y-10 text-white">
      <div className="space-y-2">
        <h1 className="text-4xl font-black uppercase tracking-tight">
          Work <span className="text-orange-600">Samples</span>
        </h1>
        <p className="text-gray-500 font-medium tracking-wide">
          Explore our portfolio of luxury real estate and architectural excellence.
        </p>
      </div>

      {/* Grid structure from your Gallery file */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {sampleData.map((item) => (
          <SampleCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default WorkSamples;