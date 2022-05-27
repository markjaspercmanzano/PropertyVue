import api from '@/api'

export default {
  getproperties: () =>
    api.get('/api/getproperties').then((response) => response.data),
  getbids: () => api.get(`/api/getbids`).then((response) => response.data),
  getbidvalue: () =>
    api.get('/api/getbidvalue').then((response) => response.data),
}
