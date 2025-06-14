import React, { createContext, useContext, useState } from 'react';

// Create the Order context
const OrderContext = createContext();

// Custom hook for accessing the Order context
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

// Order Provider component
export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState({
    residenceType: null,
    name: '',
    phoneNumber: '',
    orderDescription: '',
    orderAmount: '',
    // Legon Hall specific
    block: '',
    room: '',
    // Traditional Halls specific
    hall: '',
    // Hostels specific
    hostel: '',
    // Payment info
    paymentStatus: null,
    paymentReference: null,
    orderDate: null
  });

  // Update the entire order object
  const updateOrder = (newOrderData) => {
    setOrder(prevOrder => ({
      ...prevOrder,
      ...newOrderData,
      orderDate: new Date().toISOString()
    }));
  };

  // Update payment information
  const updatePayment = (paymentInfo) => {
    setOrder(prevOrder => ({
      ...prevOrder,
      paymentStatus: paymentInfo.status,
      paymentReference: paymentInfo.reference,
    }));
  };

  // Clear order data
  const clearOrder = () => {
    setOrder({
      residenceType: null,
      name: '',
      phoneNumber: '',
      orderDescription: '',
      orderAmount: '',
      block: '',
      room: '',
      hall: '',
      hostel: '',
      paymentStatus: null,
      paymentReference: null,
      orderDate: null
    });
  };

  // The value that will be provided to consumers of this context
  const value = {
    order,
    updateOrder,
    updatePayment,
    clearOrder
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;