import React, { createContext, useContext, useState, useEffect } from 'react';

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
  // Initialize state from localStorage or default values
  const [order, setOrder] = useState(() => {
    const savedOrder = localStorage.getItem('intraHD_order');
    return savedOrder ? JSON.parse(savedOrder) : {
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
    };
  });

  // Persist order data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('intraHD_order', JSON.stringify(order));
  }, [order]);

  // Update the entire order object
  const updateOrder = (newOrderData) => {
    setOrder(prevOrder => ({
      ...prevOrder,
      ...newOrderData,
      orderDate: newOrderData.orderDate || new Date().toISOString()
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
    const emptyOrder = {
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
    };
    setOrder(emptyOrder);
    localStorage.removeItem('intraHD_order');
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
