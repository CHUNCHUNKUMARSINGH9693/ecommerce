import React from 'react';

const ExportButton = ({ data }) => {
  const handleExport = () => {
    console.log("Exporting data:", data);
    alert("Preparing CSV download...");
    // You could use a library like 'json-to-csv' or 'jspdf' here
  };

  return (
    <button 
      onClick={handleExport}
      className="flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-700 transition-all active:scale-95 shadow-md"
    >
      <span>📥</span>
      Export CSV
    </button>
  );
};

export default ExportButton;