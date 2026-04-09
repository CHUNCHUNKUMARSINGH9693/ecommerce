import API from './api';

const reportService = {
  getReferralHistory: async () => {
    const response = await API.get('/reports/referrals');
    return response.data;
  },

  getTransactionReports: async (filters) => {
    const response = await API.get('/reports/transactions', { params: filters });
    return response.data;
  },

  downloadReport: async (reportId) => {
    // Returns a blob for file download
    const response = await API.get(`/reports/export/${reportId}`, { responseType: 'blob' });
    return response;
  }
};

export default reportService;