
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import orderService from '../services/orderService';
import paymentService from '../services/paymentService';

function PaymentRedirect({ orderData, onBack }) {
  const navigate = useNavigate();
  const { updateOrder, updatePayment } = useOrder();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    let timer;
    if (isRedirecting && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handlePayment();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRedirecting, countdown]);

  const getResidenceName = () => {
    switch (orderData.residenceType) {
      case 'legon-hall': return 'Legon Hall (Main)';
      case 'traditional-halls': return orderData.hall || 'Traditional Hall';
      case 'hostels': return orderData.hostel || 'Hostel';
      default: return '';
    }
  };

  const formatAddress = () => {
    switch (orderData.residenceType) {
      case 'legon-hall':
        return `Block ${orderData.block || 'N/A'}, Room ${orderData.room || 'N/A'}, Legon Hall`;
      case 'traditional-halls':
        return getResidenceName();
      case 'hostels':
        return `Block ${orderData.block || 'N/A'}, ${getResidenceName()}`;
      default:
        return '';
    }
  };

  const handlePayment = async () => {
    if (paymentInitiated) return;
    
    setPaymentInitiated(true);
    
    try {
      // Prepare order data (remove fields not accepted by API)
      const orderDataToSend = { ...orderData };
      
      delete orderDataToSend.totalAmount;
      delete orderDataToSend.deliveryFee;
      
      // Create order
      const orderResponse = await orderService.createOrder(orderDataToSend);
      
      if (!orderResponse.success) {
        throw new Error(orderResponse.message || 'Failed to create order');
      }

      console.log("Order created:", orderResponse);
      
      setOrderId(orderResponse.data.id);
      
      // Update order context with server response
      updateOrder({
        ...orderData,
        id: orderResponse.data.id,
        orderDate: orderResponse.data.createdAt
      });
      
      // Prepare payment data (ONLY orderId and email as specified in the Postman collection)
      const paymentData = {
        orderId: orderResponse.data.id,
        email: `${orderData.name.replace(/\s+/g, '').toLowerCase()}@example.com`
      };
      
      console.log("Initializing payment with:", paymentData);
      const paymentResponse = await paymentService.initiatePayment(paymentData);
      
      if (!paymentResponse.success) {
        throw new Error(paymentResponse.message || 'Payment initialization failed');
      }
      
      console.log("Payment initialized:", paymentResponse);
      
      // Update payment info in context
      updatePayment({
        reference: paymentResponse.data.reference,
        status: 'pending'
      });
      
      // Redirect to Paystack payment URL
      window.location.href = paymentResponse.data.authorization_url;
      
    } catch (err) {
      console.error('Payment initialization error:', err);
      
      // Extract the most useful error message with more detail
      let errorMessage = 'Failed to initialize payment. Please try again.';
      if (err.response && err.response.data) {
        if (err.response.data.errors && err.response.data.errors.length > 0) {
          // Join multiple validation errors
          errorMessage = `Validation errors: ${err.response.data.errors.map(e => e.message || e).join(', ')}`;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setPaymentInitiated(false);
      setIsRedirecting(false);
      setCountdown(5);
    }
  };

  const startRedirect = () => {
    setIsRedirecting(true);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    },
    exit: { opacity: 0, y: -20 }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // If there's no order data, show error
  if (!orderData || !orderData.residenceType) {
    return (
      <div className="text-center py-6">
        <p className="text-red-500">Error: No order data found</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Return to Homepage
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      className="max-w-3xl mx-auto text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div 
        className="flex justify-center mb-6"
        variants={itemVariants}
      >
        {/* <AnimatedImage 
          src={campusImages.payment} 
          alt="Payment" 
          className="w-full max-w-md h-64 object-contain"
        /> */}
      </motion.div>

      <motion.h2 
        className="text-2xl font-bold text-blue-800 mb-4"
        variants={itemVariants}
      >
        Order Summary
      </motion.h2>

      <motion.div 
        className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8"
        variants={itemVariants}
      >
        <motion.div 
          className="grid grid-cols-2 gap-4 text-left mb-4"
          variants={itemVariants}
        >
          <div>
            <p className="text-gray-500 text-sm">Name</p>
            <p className="font-medium">{orderData.name || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Phone</p>
            <p className="font-medium">{orderData.phoneNumber || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Delivery Location</p>
            <p className="font-medium">{formatAddress()}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Order Amount</p>
            <p className="font-medium">GHS {parseFloat(orderData.orderAmount || 0).toFixed(2)}</p>
          </div>
        </motion.div>

        <motion.div 
          className="text-left"
          variants={itemVariants}
        >
          <p className="text-gray-500 text-sm">Order Description</p>
          <p className="font-medium">{orderData.orderDescription || 'No description provided'}</p>
        </motion.div>

        <motion.div 
          className="mt-4 pt-4 border-t border-gray-200"
          variants={itemVariants}
        >
          <div className="flex justify-between">
            <p className="text-gray-500">Delivery Fee:</p>
            <p className="font-medium">GHS 6.00</p>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-gray-800 font-bold">Total Amount:</p>
            <p className="font-bold">GHS {(parseFloat(orderData.orderAmount || 0) + 6).toFixed(2)}</p>
          </div>
        </motion.div>
      </motion.div>

      {error && (
        <motion.div
          className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="font-medium">{error}</p>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {isRedirecting ? (
          <motion.div 
            key="redirecting"
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="flex justify-center items-center mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="h-12 w-12 border-b-2 border-blue-700 rounded-full"></div>
            </motion.div>
            <motion.p 
              className="text-xl font-medium"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Redirecting to payment in {countdown} seconds...
            </motion.p>
            <p className="text-gray-600 mt-2">
              Please don't close this window during the payment process
            </p>
          </motion.div>
        ) : (
          <motion.div 
            key="payment-info"
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            variants={itemVariants}
          >
            <p className="mb-4">
              You'll be redirected to complete your payment of 
              <motion.span 
                className="font-bold px-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              > GHS {(parseFloat(orderData.orderAmount || 0) + 6).toFixed(2)} </motion.span>
              via PayStack
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="flex justify-between"
        variants={itemVariants}
      >
        <motion.button
          onClick={onBack}
          disabled={isRedirecting}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Edit Order
        </motion.button>
        
        {!isRedirecting && (
          <motion.button
            onClick={startRedirect}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Proceed to Payment
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}

export default PaymentRedirect;
