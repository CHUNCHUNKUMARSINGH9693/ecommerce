import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import ReportTable from '../components/ReportTable';
import ExportButton from '../components/ExportButton';

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  // Hardcoded data based on your luxury real estate management theme
  const reportData = [
    { id: 'REF-101', date: 'Apr 05, 2026', time: '10:30 AM', title: 'Referral Bonus', category: 'Rewards', status: 'Completed', amount: '200' },
    { id: 'CON-202', date: 'Apr 03, 2026', time: '02:15 PM', title: 'Property Consultancy', category: 'Service', status: 'Pending', amount: '1,500' },
    { id: 'PAY-303', date: 'Mar 28, 2026', time: '09:00 AM', title: 'Listing Fee', category: 'Ad Fee', status: 'Completed', amount: '500' },
  ];

  const filteredReports = reportData.filter((item) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      item.id.toLowerCase().includes(q) || item.title.toLowerCase().includes(q);
    const matchesType = filterType === 'All' || item.category.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesType;
  });

  return (
    // Removed min-h-screen to prevent double-scrolling inside MainLayout
    <div className="animate-fade-in space-y-10 text-white">
      
      {/* 🚀 HEADER SECTION: Matches the look in your reports video */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white tracking-tight uppercase">
            Transaction <span className="text-orange-600">Reports</span>
          </h1>
          <p className="text-gray-500 font-medium tracking-wide">
            Securely view and manage your financial vault history.
          </p>
        </div>
        
        {/* Export Button moved to the side as seen in the UI */}
        <ExportButton data={reportData} />
      </div>

      {/* 📊 TABLE CONTAINER: Matches the rounded "Vault" look */}
      <div className="bg-[#140a05] rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden backdrop-blur-md">
        <div className="p-2">
          <FilterBar 
            setSearchTerm={setSearchTerm} 
            setFilterType={setFilterType} 
          />
        </div>

        <div className="px-2 pb-2">
          <ReportTable reports={filteredReports} />
        </div>
      </div>
    </div>
  );
};

export default Reports;