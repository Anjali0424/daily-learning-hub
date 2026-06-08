import api from './api';

export const submitAttempt = async (attemptData) => {
  const response = await api.post('/api/attempts', attemptData);
  return response.data;
};

export const getWorkspaceStatus = async () => {
  const response = await api.get('/api/attempts/workspace-status');
  return response.data;
};
