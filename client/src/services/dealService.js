import API from './api';

const dealService = {
  getAllSamples: async (category = '') => {
    const response = await API.get(`/samples?category=${category}`);
    return response.data;
  },

  getDealById: async (id) => {
    const response = await API.get(`/deals/${id}`);
    return response.data;
  },

  createConsultancyRequest: async (formData) => {
    const response = await API.post('/deals/consult', formData);
    return response.data;
  }
};

export default dealService;Aki mujhe pyar Kariti kashkoy ladki