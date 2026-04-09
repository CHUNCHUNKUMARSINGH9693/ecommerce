const TopBanner = () => (
  <div className="bg-pink-100 border border-pink-200 p-4 rounded-2xl flex justify-between items-center">
    <div className="flex items-center gap-3">
      <div className="bg-pink-500 text-white p-2 rounded-lg text-xs font-bold uppercase">New</div>
      <p className="text-pink-900 font-medium text-sm md:text-base">
        Check out the new Product Code update in your settings!
      </p>
    </div>
    <button className="text-pink-700 hover:underline text-sm font-bold">View Details</button>
  </div>
);

export default TopBanner;