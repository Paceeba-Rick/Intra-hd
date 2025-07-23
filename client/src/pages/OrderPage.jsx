import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrderForm from '../components/OrderForm';
import VendorItems from '../components/VendorItems';
import Cart from '../components/Cart';
import { useOrder } from '../context/OrderContext';

// Mock data for vendor items
const mockItems = [
  { id: 1, name: 'Jollof Rice', description: 'A popular West African dish.', price: 15.00, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Fried Rice', description: 'A classic Ghanaian dish.', price: 15.00, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Waakye', description: 'A nutritious Ghanaian dish.', price: 12.00, image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Banku and Tilapia', description: 'A popular Ghanaian dish.', price: 25.00, image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Fufu and Soup', description: 'A staple Ghanaian dish.', price: 20.00, image: 'https://via.placeholder.com/150' },
  { id: 6, name: 'Kenkey and Fish', description: 'A popular Ga dish.', price: 18.00, image: 'https://via.placeholder.com/150' },
];


const OrderPage = () => {
  const { residenceType } = useParams();
  const navigate = useNavigate();
  const { order, updateOrder, addToCart, removeFromCart } = useOrder();
  const cartItems = order.items;
  
  // Validate residenceType
  useEffect(() => {
    const validResidenceTypes = ['legon-hall', 'traditional-halls', 'hostels'];
    if (!validResidenceTypes.includes(residenceType)) {
      navigate('/');
    }
  }, [residenceType, navigate]);

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const handleOrderSubmit = (data) => {
    // Update the context with order data
    updateOrder({
      residenceType,
      ...data,
    });
    
    // Navigate to payment page
    navigate('/payment');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-6">Order from Vendors</h2>
          <VendorItems items={mockItems} onAddToCart={handleAddToCart} />
        </div>
        <div>
          <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
          <div className="mt-8">
            <OrderForm
              residenceType={residenceType}
              onSubmit={handleOrderSubmit}
              onBack={handleBack}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
