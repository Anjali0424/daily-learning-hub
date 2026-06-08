import axios from 'axios';

const api = axios.create({
  // Base URL is the server root. Services will include the /api prefix.
  baseURL: 'http://localhost:2404',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
