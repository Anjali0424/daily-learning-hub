import api from './api';

export const sendNotification = async (message) => {
  const response = await api.post(`/api/notifications?message=${encodeURIComponent(message)}`);
  return response.data;
};

export const getAllNotifications = async () => {
  const response = await api.get('/api/notifications');
  return response.data;
};
