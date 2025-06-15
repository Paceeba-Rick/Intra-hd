import { ordersApi } from './api';

const orderService = {
  /**
   * Create a new order
   * @param {Object} orderData - Order data including residenceType, name, phoneNumber, etc.
   * @returns {Promise} - Promise with order data
   */
  createOrder: async (orderData) => {
    try {
      // Format request data properly according to API expectations
      const formattedOrderData = {
        name: orderData.name,
        phoneNumber: orderData.phoneNumber,
        residenceType: orderData.residenceType,
        orderDescription: orderData.orderDescription,
        orderAmount: parseFloat(orderData.orderAmount)
      };

      // Add residence-specific fields
      if (orderData.residenceType === 'legon-hall') {
        formattedOrderData.block = orderData.block;
        formattedOrderData.room = orderData.room;
      } else if (orderData.residenceType === 'traditional-halls') {
        formattedOrderData.hall = orderData.hall;
      } else if (orderData.residenceType === 'hostels') {
        formattedOrderData.hostel = orderData.hostel;
        formattedOrderData.block = orderData.block;
      }

      // Clean up undefined values
      Object.keys(formattedOrderData).forEach(key => 
        formattedOrderData[key] === undefined && delete formattedOrderData[key]
      );

      console.log("Sending order data:", formattedOrderData);
      const response = await ordersApi.createOrder(formattedOrderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      
      // Enhanced error reporting
      if (error.response && error.response.data) {
        console.error("API error details:", error.response.data);
        
        if (error.response.data.errors && error.response.data.errors.length > 0) {
          const errorMessage = error.response.data.errors
            .map(err => err.message || err)
            .join(', ');
          throw new Error(`Validation error: ${errorMessage}`);
        } else if (error.response.data.message) {
          throw new Error(error.response.data.message);
        }
      }
      
      throw error;
    }
  },

  /**
   * Get order by ID
   * @param {string} orderId - Order ID
   * @returns {Promise} - Promise with order data
   */
  getOrderById: async (orderId) => {
    try {
      const response = await ordersApi.getOrderById(orderId);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      throw error;
    }
  },

  /**
   * Get all orders for admin
   * @returns {Promise} - Promise with array of orders
   */
  getAllOrders: async () => {
    try {
      const response = await ordersApi.getOrders();
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  /**
   * Update order status
   * @param {string} orderId - Order ID
   * @param {string} status - New status
   * @returns {Promise} - Promise with updated order
   */
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await ordersApi.updateOrderStatus(orderId, status);
      return response.data;
    } catch (error) {
      console.error(`Error updating order ${orderId}:`, error);
      throw error;
    }
  }
};

export default orderService;
