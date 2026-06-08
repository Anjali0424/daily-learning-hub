import api from './api';

export const getQuestionsByModule = async (moduleId) => {
  const response = await api.get(`/api/questions/module/${moduleId}`);
  return response.data;
};
