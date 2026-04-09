import React from 'react';
import Gallery from '../components/Gallery';

const Samples = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Work Samples
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Explore our latest projects and architectural designs.
          </p>
        </header>

        <Gallery />
      </div>
    </div>
  );
};

export default Samples;