import React from 'react';
import { Download } from 'lucide-react';

const ExportButton = ({ data }) => {
  const handleExport = () => {
    if (!data || data.length === 0) return;

    // 1. Create CSV Header
    const headers = Object.keys(data[0]).join(",");
    
    // 2. Create CSV Rows
    const rows = data.map(row => 
      Object.values(row).map(value => `"${value}"`).join(",")
    ).join("\n");

    const csvContent = `${headers}\n${rows}`;

    // 3. Create Download Link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.setAttribute("href", url);
    link.setAttribute("download", `Vault_Transaction_Report_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log("Exporting data:", data);
  };

  return (
    <button 
      onClick={handleExport}
      className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 hover:border-orange-500 transition-all active:scale-95 shadow-xl group"
    >
      <Download 
        size={16} 
        className="text-orange-500 group-hover:text-white transition-colors" 
      />
      Export CSV
    </button>
  );
};

export default ExportButton;