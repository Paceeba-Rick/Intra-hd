import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      config.headers['x-auth-token'] = adminToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Orders API
export const ordersApi = {
  createOrder: (orderData) => {
    return api.post('/orders', orderData);
  },
  getOrders: () => {
    return api.get('/orders');
  },
  getOrderById: (id) => {
    return api.get(`/orders/${id}`);
  },
  getOrdersByUser: (userId) => {
    return api.get(`/orders/user/${userId}`);
  },
  updateOrderStatus: (id, status) => {
    return api.put(`/orders/${id}`, { status });
  },
  deleteOrder: (id) => {
    return api.delete(`/orders/${id}`);
  }
};

// Payments API
export const paymentsApi = {
  initiatePayment: (paymentData) => {
    return api.post('/payments/initialize', paymentData);
  },
  verifyPayment: (reference) => {
    return api.get(`/payments/verify/${reference}`);
  }
};

// Admin API
export const adminApi = {
  login: (credentials) => {
    return api.post('/admin/login', credentials);
  },
  getProfile: () => {
    return api.get('/admin/profile');
  }
};

export default api;
