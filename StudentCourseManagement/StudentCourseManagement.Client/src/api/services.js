import api from './axios'

export const authApi = {
  login: (payload) => api.post('/auth/login', payload),
}

export const dashboardApi = {
  getStats: () => api.get('/dashboard/stats'),
}

export const studentsApi = {
  getAll: (search = '') => api.get('/students', { params: { search } }),
  getById: (id) => api.get(`/students/${id}`),
  create: (payload) => api.post('/students', payload),
  update: (id, payload) => api.put(`/students/${id}`, payload),
  remove: (id) => api.delete(`/students/${id}`),
}

export const coursesApi = {
  getAll: (search = '') => api.get('/courses', { params: { search } }),
  getById: (id) => api.get(`/courses/${id}`),
  create: (payload) => api.post('/courses', payload),
  update: (id, payload) => api.put(`/courses/${id}`, payload),
  remove: (id) => api.delete(`/courses/${id}`),
}

export const enrollmentsApi = {
  getAll: () => api.get('/enrollments'),
  getById: (id) => api.get(`/enrollments/${id}`),
  create: (payload) => api.post('/enrollments', payload),
  update: (id, payload) => api.put(`/enrollments/${id}`, payload),
  remove: (id) => api.delete(`/enrollments/${id}`),
}
