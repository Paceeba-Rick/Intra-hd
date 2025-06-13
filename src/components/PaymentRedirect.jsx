import { useState, useEffect } from 'react';
import { useOrder } from '../context/OrderContext';
import AnimatedImage from './AnimatedImage';
import { campusImages } from '../assets/campusImages';
import { initiatePayment } from '../utils/paymentHelper';

function PaymentRedirect({ orderData, onBack }) {
  const { order } = useOrder();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  useEffect(() => {
    let timer;
    if (isRedirecting) {
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
  }, [isRedirecting]);

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
        return `Block ${orderData.block}, Room ${orderData.room}, Legon Hall`;
      case 'traditional-halls':
        return getResidenceName();
      case 'hostels':
        return `Block ${orderData.block}, ${getResidenceName()}`;
      default:
        return '';
    }
  };

  const handlePayment = () => {
    if (!paymentInitiated) {
      setPaymentInitiated(true);
      initiatePayment({
        amount: parseFloat(orderData.orderAmount) * 100, // Convert to pesewas for PayStack
        email: `${orderData.name.replace(/\s+/g, '').toLowerCase()}@example.com`, // Generate an email since we don't collect it
        name: orderData.name,
        phone: orderData.phoneNumber,
        metadata: {
          order_id: `ORD-${Date.now()}`,
          residence_type: orderData.residenceType,
          address: formatAddress(),
          description: orderData.orderDescription
        }
      });
    }
  };

  const startRedirect = () => {
    setIsRedirecting(true);
  };

  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="flex justify-center mb-6">
        <AnimatedImage 
          src={campusImages.payment} 
          alt="Payment" 
          className="w-full max-w-md h-64 object-contain"
        />
      </div>

      <h2 className="text-2xl font-bold text-blue-800 mb-4">
        Order Summary
      </h2>

      <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-2 gap-4 text-left mb-4">
          <div>
            <p className="text-gray-500 text-sm">Name</p>
            <p className="font-medium">{orderData.name}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Phone</p>
            <p className="font-medium">{orderData.phoneNumber}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Delivery Location</p>
            <p className="font-medium">{formatAddress()}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Order Amount</p>
            <p className="font-medium">GHS {parseFloat(orderData.orderAmount).toFixed(2)}</p>
          </div>
        </div>

        <div className="text-left">
          <p className="text-gray-500 text-sm">Order Description</p>
          <p className="font-medium">{orderData.orderDescription}</p>
        </div>
      </div>

      {isRedirecting ? (
        <div className="mb-8">
          <div className="flex justify-center items-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
          <p className="text-xl font-medium">
            Redirecting to PayStack payment in {countdown} seconds...
          </p>
          <p className="text-gray-600 mt-2">
            Please don't close this window during the payment process
          </p>
        </div>
      ) : (
        <div className="mb-8">
          <p className="mb-4">
            You'll be redirected to PayStack to complete your payment of 
            <span className="font-bold"> GHS {parseFloat(orderData.orderAmount) + 6} </span>

          </p>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={onBack}
          disabled={isRedirecting}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Edit Order
        </button>
        
        {!isRedirecting && (
          <button
            onClick={startRedirect}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Proceed to Payment
          </button>
        )}
      </div>
    </div>
  );
}

export default PaymentRedirect;