import { paymentsApi } from './api';

const paymentService = {
  /**
   * Initialize a payment with Paystack
   * @param {Object} paymentData - Object containing orderId, email, etc.
   * @returns {Promise} - Promise with payment initialization details
   */
  initiatePayment: async (paymentData) => {
    try {
      const formattedPaymentData = {
        orderId: paymentData.orderId,
        email: 'yakubceeba@gmail.com'
      };
      
      console.log("Sending payment data:", formattedPaymentData);
      const response = await paymentsApi.initiatePayment(formattedPaymentData);
      
      return response.data;
    } catch (error) {
      console.error("Error initializing payment:", error);
      
      // Log detailed error information
      if (error.response && error.response.data) {
        console.error("API error details:", error.response.data);
      }
      
      throw error;
    }
  },

  /**
   * Verify a payment by reference
   * @param {string} reference - Payment reference
   * @returns {Promise} - Promise with payment verification details
   */
  verifyPayment: async (reference) => {
    try {
      const response = await paymentsApi.verifyPayment(reference);
      return response.data;
    } catch (error) {
      console.error("Error verifying payment:", error);
      throw error;
    }
  }
};

export default paymentService;