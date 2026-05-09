import API from './api.js';

export const contactService = {
  submitContact: (data) => API.post('/contact', data)
    .then(res => res.data)
    .catch(err => Promise.reject(err.response?.data?.message || 'Submission failed'))
};

