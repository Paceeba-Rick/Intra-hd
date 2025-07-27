import React from 'react';
import { motion } from 'framer-motion';

const VendorItems = ({ items, onAddToCart }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          whileHover={{ y: -5 }}
        >
          <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-blue-600">GH₵{item.price.toFixed(2)}</span>
              <button
                onClick={() => onAddToCart(item)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default VendorItems;
