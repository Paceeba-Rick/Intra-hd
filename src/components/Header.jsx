import { useState, useEffect } from 'react';
import AnimatedImage from './AnimatedImage';
import ugLogo from '../assets/Intra-hd.png'


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
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={onRestart}>
            <AnimatedImage 
              src={ugLogo} 
              alt="Intra-hd Logo" 
              className="h-20 mr-3"
            />
            <div>
              <h1 className={`font-bold transition-all duration-300 ${
                scrolled ? 'text-blue-800 text-lg' : 'text-blue-900 text-xl'
              }`}>
               INTRA-HD
              </h1>
              <p className={`text-xs transition-all duration-300 ${
                scrolled ? 'text-gray-600' : 'text-gray-700'
              }`}>
                Anywhere on Campus
              </p>
            </div>
          </div>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <button 
                  onClick={onRestart}
                  className="text-yellow-900 hover:text-green-600 transition-all"
                >
                  <b>
                  Your Errand Bot
                  </b>
                  
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;