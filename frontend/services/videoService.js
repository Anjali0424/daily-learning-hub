import api from './api';

export const uploadVideo = async ({ title, subject, description, uploadDate, file }) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('subject', subject);
  formData.append('description', description);
  formData.append('uploadDate', uploadDate);
  formData.append('file', file);

  const response = await api.post('/api/videos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getVideos = async (filters = {}) => {
  const response = await api.get('/api/videos', { params: filters });
  return response.data;
};

export const getVideoSubjects = async () => {
  const response = await api.get('/api/videos/subjects');
  return response.data;
};

export const deleteVideo = async (id) => {
  const response = await api.delete(`/api/videos/${id}`);
  return response.data;
};
