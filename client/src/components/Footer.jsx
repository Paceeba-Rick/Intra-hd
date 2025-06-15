import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer 
      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center mb-6"
          variants={itemVariants}
        >
          <div className="mb-4 md:mb-0">
            <motion.h3 
              className="text-xl font-bold mb-2"
              whileHover={{ scale: 1.05 }}
            >
              INTRA-HD
            </motion.h3>
            <p className="text-sm opacity-90">Campus Delivery Service</p>
          </div>

          <div className="flex gap-4">
            <motion.a 
              href="https://wa.me/233533125955" 
              className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
              aria-label="WhatsApp"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaWhatsapp size={18} />
            </motion.a>
            <motion.a 
              href="mailto:yakubceeba@gmail.com" 
              className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
              aria-label="Email"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaEnvelope size={18} />
            </motion.a>
            <motion.a 
              href="tel:+233533125955" 
              className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
              aria-label="Phone"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaPhone size={18} />
            </motion.a>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center text-sm"
          variants={itemVariants}
        >
          <div className="mb-2 md:mb-0">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="mr-4 hover:underline"
            >
              <Link to="/contact">Contact Us</Link>
            </motion.span>
          </div>

          <motion.p 
            className="text-sm opacity-80"
            variants={itemVariants}
          >
            &copy; {new Date().getFullYear()} INTRA-HD. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
