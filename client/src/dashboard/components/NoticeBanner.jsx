const NoticeBanner = () => (
  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
    <div className="flex items-start">
      <span className="text-amber-500 mr-3 text-lg">⚠️</span>
      <div>
        <h3 className="text-amber-800 font-bold text-sm">Action Required</h3>
        <p className="text-amber-700 text-xs mt-1">
          You have pending penalties. Please resolve them to avoid account suspension.
        </p>
      </div>
    </div>
  </div>
);

export default NoticeBanner;