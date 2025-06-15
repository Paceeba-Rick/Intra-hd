import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedImage from './AnimatedImage';
import legonHall from '../assets/legon-hall.jpg';
import otherHalls from '../assets/other-halls.png';
import hostels from '../assets/hostel.jpg';

function ResidenceTypeSelector({ onSelect }) {
  const [hoveredOption, setHoveredOption] = useState(null);

  const residenceOptions = [
    {
      id: 'legon-hall',
      name: 'Legon Hall (Main)',
      description: 'For students residing in Legon Hall main campus',
      image: legonHall
    },
    {
      id: 'traditional-halls',
      name: 'Other Traditional Halls',
      description: 'Including Commonwealth, Volta, Akuafo, and Mensah Sarbah Halls',
      image: otherHalls
    },
    {
      id: 'hostels',
      name: 'Hostels',
      description: 'For students hostels',
      image: hostels
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div>
      <motion.h3 
        className="text-xl font-bold text-gray-800 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Select Your Residence Type
      </motion.h3>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {residenceOptions.map((option) => (
          <motion.div
            key={option.id}
            className={`border rounded-lg overflow-hidden transition-all duration-300 ${
              hoveredOption === option.id 
                ? 'shadow-lg border-green-500' 
                : 'shadow-md hover:shadow-lg'
            }`}
            onClick={() => onSelect(option.id)}
            onMouseEnter={() => setHoveredOption(option.id)}
            onMouseLeave={() => setHoveredOption(null)}
            variants={cardVariants}
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative h-40 overflow-hidden">
              <motion.div
                animate={hoveredOption === option.id ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                <AnimatedImage
                  src={option.image}
                  alt={option.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <h4 className="absolute bottom-2 left-2 text-white font-bold text-lg px-2">
                {option.name}
              </h4>
            </div>
            
            <div className="p-4">
              <p className="text-gray-600 text-sm">
                {option.description}
              </p>
              
              <motion.button 
                className={`mt-4 w-full py-2 rounded-md transition-colors ${
                  hoveredOption === option.id 
                    ? 'bg-green-600 text-white' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Select
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default ResidenceTypeSelector;