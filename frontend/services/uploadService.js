import api from './api';

export const saveUpload = async (fileUrl, fileType) => {
  const response = await api.post(`/api/uploads?fileUrl=${encodeURIComponent(fileUrl)}&fileType=${fileType}`);
  return response.data;
};

export const getAllUploads = async () => {
  const response = await api.get('/api/uploads');
  return response.data;
};
