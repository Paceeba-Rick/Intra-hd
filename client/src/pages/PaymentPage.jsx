import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useOrder } from '../context/OrderContext';
import PaymentRedirect from '../components/PaymentRedirect';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { order } = useOrder();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Give a small delay to ensure context is loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Redirect to home if no order data after delay
      if (!order || !order.residenceType) {
        navigate('/', { replace: true });
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [order, navigate]);

  const handleBack = () => {
    if (order && order.residenceType) {
      navigate(`/order/${order.residenceType}`);
    } else {
      navigate('/');
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <motion.div 
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          ></motion.div>
          <p className="mt-4 text-gray-600">Loading payment information...</p>
        </div>
      </div>
    );
  }

  // If no order data after loading completes, show error
  if (!order || !order.residenceType) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">No Order Found</h2>
          <p className="mb-6 text-gray-600">
            We couldn't find your order information. Please start a new order.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  // If we have order data, show the payment page
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <PaymentRedirect orderData={order} onBack={handleBack} />
    </div>
  );
};

export default PaymentPage;
