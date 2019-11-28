import axios from 'axios';

export default {
  getLogs() {
    return axios.get('/api/logs');
  },
  saveLog(logData) {
    return axios.post('/api/logs', logData);
  },
  getLog(id) {
    return axios.get(`/api/logs/${id}`);
  },
  deleteLog(id) {
    return axios.delete(`/api/logs/${id}`);
  },
  updateLog(id) {
    return axios.put(`/api/logs/${id}`);
  },
};
