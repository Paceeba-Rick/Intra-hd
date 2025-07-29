import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrderForm from '../components/OrderForm';
import { useOrder } from '../context/OrderContext';

const OrderPage = () => {
  const { residenceType } = useParams();
  const navigate = useNavigate();
  const { updateOrder } = useOrder();
  
  // Validate residenceType
  useEffect(() => {
    const validResidenceTypes = ['legon-hall', 'traditional-halls', 'hostels'];
    if (!validResidenceTypes.includes(residenceType)) {
      navigate('/');
    }
  }, [residenceType, navigate]);

  const handleOrderSubmit = (data) => {
    // Update the context with order data
    updateOrder({
      residenceType,
      ...data
    });
    
    // Navigate to payment page
    navigate('/payment');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <OrderForm 
        residenceType={residenceType} 
        onSubmit={handleOrderSubmit} 
        onBack={handleBack}
      />
    </div>
  );
};

export default OrderPage;
