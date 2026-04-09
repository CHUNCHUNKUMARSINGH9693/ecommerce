import { useState, useMemo } from 'react';

export const useReports = (initialData = []) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  // useMemo ensures we only re-filter data when searchTerm or filterType changes
  const filteredData = useMemo(() => {
    return initialData.filter((item) => {
      const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.type?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterType === 'All' || item.type === filterType;
      
      return matchesSearch && matchesFilter;
    });
  }, [initialData, searchTerm, filterType]);

  return {
    filteredData,
    setSearchTerm,
    setFilterType,
    currentFilter: filterType,
    currentSearch: searchTerm
  };
};

export default useReports;