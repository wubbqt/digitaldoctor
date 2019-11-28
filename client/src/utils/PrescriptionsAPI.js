import axios from 'axios';

export default {
  getPrescriptions() {
    return axios.get('/api/prescriptions');
  },
  savePrescription(prescriptionData) {
    return axios.post('/api/prescriptions', prescriptionData);
  },
  getPrescription(id) {
    return axios.get(`/api/prescriptions/${id}`);
  },
  deletePrescription(id) {
    return axios.delete(`/api/prescriptions/${id}`);
  },
  updatePrescription(id) {
    return axios.put(`/api/prescriptions/${id}`);
  },
};
