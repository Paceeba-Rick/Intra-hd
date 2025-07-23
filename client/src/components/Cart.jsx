import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';

const Cart = ({ cartItems, onRemoveFromCart, onCheckout }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const containerVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
        <FaShoppingCart className="text-blue-500" size={24} />
      </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              className="flex items-center justify-between mb-4"
              variants={itemVariants}
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  GH₵{item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
              <div className="flex items-center">
                <span className="font-bold mr-4">
                  GH₵{(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => onRemoveFromCart(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
          <hr className="my-4" />
          <div className="flex justify-between items-center font-bold text-xl">
            <span>Total:</span>
            <span>GH₵{total.toFixed(2)}</span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg mt-6 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
