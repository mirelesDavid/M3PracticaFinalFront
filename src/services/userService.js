import api from './api';

export const userService = {
  getAll: async () => {
    const response = await api.get('/poty');
    return response.data;
  },

  create: async (userData) => {
    const response = await api.post('/poty/register', userData);
    return response.data;
  },

  update: async (id, userData) => {
    const response = await api.put(`/poty/${id}`, userData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/poty/${id}`);
    return response.data;
  }
}; 