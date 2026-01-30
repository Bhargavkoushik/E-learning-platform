import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

// Course API
export const courseAPI = {
  getCourses: (params) => api.get('/courses', { params }),
  getCourse: (id) => api.get(`/courses/${id}`),
  createCourse: (courseData) => api.post('/courses', courseData),
  updateCourse: (id, courseData) => api.put(`/courses/${id}`, courseData),
  deleteCourse: (id) => api.delete(`/courses/${id}`),
  addLesson: (courseId, lessonData) => api.post(`/courses/${courseId}/lessons`, lessonData),
  updateLesson: (courseId, lessonId, lessonData) => 
    api.put(`/courses/${courseId}/lessons/${lessonId}`, lessonData),
  deleteLesson: (courseId, lessonId) => 
    api.delete(`/courses/${courseId}/lessons/${lessonId}`),
  addReview: (courseId, reviewData) => api.post(`/courses/${courseId}/reviews`, reviewData),
};

// Enrollment API
export const enrollmentAPI = {
  enrollCourse: (courseId) => api.post(`/enrollments/${courseId}`),
  getMyEnrollments: () => api.get('/enrollments'),
  getEnrollment: (courseId) => api.get(`/enrollments/${courseId}`),
  updateProgress: (courseId, lessonId) => 
    api.put(`/enrollments/${courseId}/progress`, { lessonId }),
  getAllEnrollments: () => api.get('/enrollments/admin/all'),
};

// User API
export const userAPI = {
  getUsers: () => api.get('/users'),
  getUserById: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

export default api;
