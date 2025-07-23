import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LocationForm = ({ onSubmit }) => {
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location) {
      setError('Please enter your location.');
      return;
    }
    setError('');
    onSubmit(location);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
        Your Location on Campus
      </label>
      <div className="flex items-center">
        <input
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., Night Market, Bush Canteen"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          Submit
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </motion.form>
  );
};

export default LocationForm;
