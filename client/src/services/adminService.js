import { adminApi } from './api';

const adminService = {
  /**
   * Log in as administrator
   * @param {Object} credentials - Object containing username and password
   * @returns {Promise} - Promise with login result
   */
  login: async (credentials) => {
    try {
      const response = await adminApi.login(credentials);
      
      // Store the token in localStorage
      if (response.data && response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  /**
   * Get admin profile
   * @returns {Promise} - Promise with admin profile data
   */
  getProfile: async () => {
    try {
      const response = await adminApi.getProfile();
      return response.data;
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      throw error;
    }
  },

  /**
   * Log out admin
   */
  logout: () => {
    localStorage.removeItem('adminToken');
  }
};

export default adminService;
