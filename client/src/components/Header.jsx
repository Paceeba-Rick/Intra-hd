import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedImage from './AnimatedImage';
import ugLogo from '../assets/Intra-hd.png';


function Header({ onRestart }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center cursor-pointer" 
            onClick={onRestart}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatedImage 
              src={ugLogo} 
              alt="Intra-hd Logo" 
              className="h-20 mr-3"
            />
            <div>
              <motion.h1 
                className={`font-bold transition-all duration-300 ${
                  scrolled ? 'text-blue-800 text-lg' : 'text-blue-900 text-xl'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                INTRA-HD
              </motion.h1>
              <motion.p 
                className={`text-xs transition-all duration-300 ${
                  scrolled ? 'text-gray-600' : 'text-gray-700'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Anywhere on Campus
              </motion.p>
            </div>
          </motion.div>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/admin">
                  <motion.button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Admin Login
                  </motion.button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;