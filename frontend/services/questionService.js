import api from './api';

export const getQuestionsByModule = async (moduleId) => {
  const response = await api.get(`/api/modules/${moduleId}/questions`);
  return response.data.data;
};

export const submitAnswers = async (moduleId, answers) => {
  const response = await api.post('/api/modules/submit', {
    moduleId,
    answers
  });
  return response.data.data;
};
