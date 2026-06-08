import api from './api';

export const getAllModules = async () => {
  const response = await api.get('/api/modules');
  return response.data;
};
