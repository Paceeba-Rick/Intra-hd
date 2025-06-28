import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOrder } from '../context/OrderContext';
import AnimatedImage from './AnimatedImage';
import { validateOrderForm } from '../utils/formValidation';
import legonHall from '../assets/legon-hall.jpg';

function OrderForm({ residenceType, onSubmit, onBack }) {
  const { updateOrder } = useOrder();
  
  // Initialize form state based on residence type
  const getInitialFormState = () => {
    const baseFields = {
      name: '',
      orderDescription: '',
      orderAmount: '',
      phoneNumber: ''
    };

    switch (residenceType) {
      case 'legon-hall':
        return {
          ...baseFields,
          block: '',
          room: ''
        };
      case 'traditional-halls':
        return {
          ...baseFields,
          hall: '',
          otherHall: ''
        };
      case 'hostels':
        return {
          ...baseFields,
          hostel: '',
          otherHostel: '',
          block: ''
        };
      default:
        return baseFields;
    }
  };

  const [formData, setFormData] = useState(getInitialFormState());
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtherHallInput, setShowOtherHallInput] = useState(false);
  const [showOtherHostelInput, setShowOtherHostelInput] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'hall') {
      if (value === 'other') {
        setShowOtherHallInput(true);
      } else {
        setShowOtherHallInput(false);
        setFormData((prev) => ({ ...prev, otherHall: '' }));
      }
    }

    if (name === 'hostel') {
      if (value === 'other') {
        setShowOtherHostelInput(true);
      } else {
        setShowOtherHostelInput(false);
        setFormData((prev) => ({ ...prev, otherHostel: '' }));
      }
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
     // Clear specific "other" field error if main selection changes
    if (name === 'hall' && value !== 'other' && errors.otherHall) {
      setErrors((prev) => ({ ...prev, otherHall: null }));
    }
    if (name === 'hostel' && value !== 'other' && errors.otherHostel) {
      setErrors((prev) => ({ ...prev, otherHostel: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Prepare data for validation and submission
    let dataToValidate = { ...formData };
    if (residenceType === 'traditional-halls' && formData.hall === 'other') {
      // For validation, keep otherHall
    } else if (residenceType === 'traditional-halls') {
      dataToValidate = { ...dataToValidate, otherHall: '' }; // Ensure otherHall is not validated if not selected
    }

    if (residenceType === 'hostels' && formData.hostel === 'other') {
      // For validation, keep otherHostel
    } else if (residenceType === 'hostels') {
      dataToValidate = { ...dataToValidate, otherHostel: '' }; // Ensure otherHostel is not validated if not selected
    }

    const validationErrors = validateOrderForm(dataToValidate, residenceType);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    // Prepare final data for submission
    let submissionData = { ...formData };
    if (submissionData.hall === 'other') {
      submissionData.hall = submissionData.otherHall;
    }
    delete submissionData.otherHall;

    if (submissionData.hostel === 'other') {
      submissionData.hostel = submissionData.otherHostel;
    }
    delete submissionData.otherHostel;

    // Update context with order data
    updateOrder({
      residenceType,
      ...submissionData
    });

    // Proceed to payment
    onSubmit({
      residenceType,
      ...submissionData
    });
  };

  const getResidenceName = () => {
    switch (residenceType) {
      case 'legon-hall': return 'Legon Hall (Main)';
      case 'traditional-halls': return 'Traditional Hall';
      case 'hostels': return 'Hostel';
      default: return '';
    }
  };
  
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      className="max-w-3xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <motion.div 
        className="flex justify-center mb-6"
        variants={itemVariants}
      >
        <AnimatedImage 
          src={legonHall} 
          alt='Error Image'
          className="w-full h-48 object-cover rounded-lg shadow-md"
        />
      </motion.div>

      <motion.div 
        className="mb-6"
        variants={itemVariants}
      >
        <h2 className="text-2xl font-bold text-blue-800 mb-2">
          {getResidenceName()} Order Form
        </h2>
        <p className="text-gray-600">
          Please fill out the details below to place your order
        </p>
      </motion.div>

      <form onSubmit={handleSubmit}>
        {/* Name Field - Common to all forms */}
        <motion.div 
          className="mb-4"
          variants={itemVariants}
        >
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <motion.input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your name"
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </motion.div>

        {/* Residence-specific fields */}
        {residenceType === 'legon-hall' && (
          <>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
              variants={itemVariants}
            >
              <div>
                <label htmlFor="block" className="block text-sm font-medium text-gray-700 mb-1">Block</label>
                <motion.input
                  type="text"
                  id="block"
                  name="block"
                  value={formData.block}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.block ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your block"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                {errors.block && <p className="mt-1 text-sm text-red-500">{errors.block}</p>}
              </div>
              <div>
                <label htmlFor="room" className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                <motion.input
                  type="text"
                  id="room"
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.room ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your room number"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                {errors.room && <p className="mt-1 text-sm text-red-500">{errors.room}</p>}
              </div>
            </motion.div>
          </>
        )}

        {residenceType === 'traditional-halls' && (
          <div className="mb-4">
            <label htmlFor="hall" className="block text-sm font-medium text-gray-700 mb-1">Hall Name</label>
            <select
              id="hall"
              name="hall"
              value={formData.hall}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.hall ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Hall</option>
              <option value="commonwealth">Commonwealth Hall</option>
              <option value="volta">Volta Hall</option>
              <option value="akuafo">Akuafo Hall</option>
              <option value="mensah-sarbah">Mensah Sarbah Hall</option>
              <option value="other">Other</option>
            </select>
            {errors.hall && <p className="mt-1 text-sm text-red-500">{errors.hall}</p>}
            {showOtherHallInput && (
              <motion.div className="mt-2" variants={itemVariants}>
                <label htmlFor="otherHall" className="block text-sm font-medium text-gray-700 mb-1">Specify Hall Name</label>
                <motion.input
                  type="text"
                  id="otherHall"
                  name="otherHall"
                  value={formData.otherHall}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.otherHall ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter hall name"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                {errors.otherHall && <p className="mt-1 text-sm text-red-500">{errors.otherHall}</p>}
              </motion.div>
            )}
          </div>
        )}

        {residenceType === 'hostels' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="hostel" className="block text-sm font-medium text-gray-700 mb-1">Hostel Name</label>
                <select
                  id="hostel"
                  name="hostel"
                  value={formData.hostel}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.hostel ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select Hostel</option>
                  <option value="jean-nelson">Jean Nelson Hostel</option>
                  <option value="sey">Sey Hostel</option>
                  <option value="hilla-limann">Hilla Limann Hostel</option>
                  <option value="alexander-adum">Alexander Adum Kwapong Hostel</option>
                  <option value="elizabeth-frances">Elizabeth Frances Sey Hostel</option>
                  <option value="TF">TF Hostel</option>
                  <option value="pentagon">Pentagon Hostel</option>
                  <option value="bani">Bani Hostel</option>
                  {/* <option value="other">Other Hostel</option> Already exists, we will use this one */}
                  <option value="other">Other</option>
                </select>
                {errors.hostel && <p className="mt-1 text-sm text-red-500">{errors.hostel}</p>}
                {showOtherHostelInput && (
                  <motion.div className="mt-2" variants={itemVariants}>
                    <label htmlFor="otherHostel" className="block text-sm font-medium text-gray-700 mb-1">Specify Hostel Name</label>
                    <motion.input
                      type="text"
                      id="otherHostel"
                      name="otherHostel"
                      value={formData.otherHostel}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.otherHostel ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter hostel name"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    {errors.otherHostel && <p className="mt-1 text-sm text-red-500">{errors.otherHostel}</p>}
                  </motion.div>
                )}
              </div>
              <div>
                <label htmlFor="block" className="block text-sm font-medium text-gray-700 mb-1">Block</label>
                <input
                  type="text"
                  id="block"
                  name="block"
                  value={formData.block}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.block ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your block"
                />
                {errors.block && <p className="mt-1 text-sm text-red-500">{errors.block}</p>}
              </div>
            </div>
          </>
        )}

        {/* Common fields for all forms */}
        <motion.div 
          className="mb-4"
          variants={itemVariants}
        >
          <label htmlFor="orderDescription" className="block text-sm font-medium text-gray-700 mb-1">Order Description</label>
          <motion.textarea
            id="orderDescription"
            name="orderDescription"
            value={formData.orderDescription}
            onChange={handleChange}
            rows={3}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.orderDescription ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Describe what you want to order in detail"
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          ></motion.textarea>
          {errors.orderDescription && <p className="mt-1 text-sm text-red-500">{errors.orderDescription}</p>}
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
          variants={itemVariants}
        >
          <div>
            <label htmlFor="orderAmount" className="block text-sm font-medium text-gray-700 mb-1">Order Amount (GHS)</label>
            <motion.input
              type="number"
              id="orderAmount"
              name="orderAmount"
              value={formData.orderAmount}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.orderAmount ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter amount in GHS"
              step="0.01"
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            {errors.orderAmount && <p className="mt-1 text-sm text-red-500">{errors.orderAmount}</p>}
          </div>
          
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <motion.input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your phone number"
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
          </div>
        </motion.div>

        <motion.div 
          className="flex justify-between"
          variants={itemVariants}
        >
          <motion.button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Back
          </motion.button>
          
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Proceed to Payment'
            )}
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
}

export default OrderForm;
