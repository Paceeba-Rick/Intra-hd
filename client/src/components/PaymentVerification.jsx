import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useOrder } from '../context/OrderContext';
import paymentService from '../services/paymentService';

const PaymentVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { order, updatePayment, clearOrder } = useOrder();
  const [status, setStatus] = useState('verifying'); // verifying, success, failed
  const [message, setMessage] = useState('');
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get('reference');
      
      if (!reference) {
        setStatus('failed');
        setMessage('Invalid payment reference');
        return;
      }

      try {
        const response = await paymentService.verifyPayment(reference);
        
        if (response.success) {
          setStatus('success');
          setMessage(response.message || 'Payment successful!');
          setPaymentDetails(response.data);
          
          // Update payment status in context
          updatePayment({
            reference,
            status: 'completed'
          });
          
          // Clear order data after 10 seconds (for demonstration purposes)
          setTimeout(() => {
            clearOrder();
          }, 10000);
        } else {
          setStatus('failed');
          setMessage(response.message || 'Payment verification failed');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('failed');
        setMessage(error.message || 'An error occurred during payment verification');
      }
    };

    verifyPayment();
  }, [searchParams, updatePayment, clearOrder]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
      {status === 'verifying' && (
        <div className="text-center py-10">
          <motion.div 
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <h2 className="text-xl font-bold text-gray-700 mb-2">Verifying Payment</h2>
          <p className="text-gray-500">Please wait while we verify your payment...</p>
        </div>
      )}

      {status === 'success' && (
        <motion.div 
          className="text-center py-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">{message}</p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
            <h3 className="font-bold text-gray-700 mb-2">Order Summary</h3>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Order Date:</span> {order.orderDate ? new Date(order.orderDate).toLocaleString() : 'N/A'}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Reference:</span> {searchParams.get('reference')}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Amount Paid:</span> GHS {paymentDetails?.amount ? (paymentDetails.amount / 100).toFixed(2) : 'N/A'}
            </p>
          </div>
          
          <p className="text-gray-500 mb-6 text-sm">
            You will be redirected back to the homepage in a few seconds.
          </p>
          
          <motion.button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Homepage
          </motion.button>
        </motion.div>
      )}

      {status === 'failed' && (
        <motion.div 
          className="text-center py-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h2>
          <p className="text-gray-600 mb-6">{message}</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              onClick={() => navigate(`/order/${order.residenceType || ''}`)}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
            
            <motion.button
              onClick={() => navigate('/')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Homepage
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PaymentVerification;
