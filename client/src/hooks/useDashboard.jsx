import { useState, useEffect, useCallback } from 'react';

export const useDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      // const response = await fetch('/api/dashboard/stats');
      // const result = await response.json();
      
      // Mock data for development
      const mockResult = {
        totalEarnings: 15400,
        activeReferrals: 8,
        conversionRate: "12%",
      };
      
      setData(mockResult);
      setError(null);
    } catch (err) {
      setError("Failed to load dashboard statistics.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { data, loading, error, refresh: fetchStats };
};

export default useDashboard;