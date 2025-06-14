import React, { useState, useEffect, useRef } from 'react';

// Component for displaying images with animations
function AnimatedImage({ 
  src, 
  alt, 
  className = '', 
  animation = 'fadeIn', 
  duration = 500,
  delay = 0,
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef(null);
  
  // Handle image load event
  const handleImageLoaded = () => {
    setIsLoaded(true);
    setTimeout(() => setIsVisible(true), delay);
  };

  // Use Intersection Observer to detect when image is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (isLoaded) {
            setTimeout(() => setIsVisible(true), delay);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = imageRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isLoaded, delay]);

  // Get animation class based on animation type
  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';

    switch (animation) {
      case 'fadeIn':
        return `opacity-100 transition-opacity duration-${duration}`;
      case 'slideUp':
        return `opacity-100 translate-y-0 transition-all duration-${duration}`;
      case 'slideDown':
        return `opacity-100 translate-y-0 transition-all duration-${duration}`;
      case 'slideLeft':
        return `opacity-100 translate-x-0 transition-all duration-${duration}`;
      case 'slideRight':
        return `opacity-100 translate-x-0 transition-all duration-${duration}`;
      case 'zoomIn':
        return `opacity-100 scale-100 transition-all duration-${duration}`;
      default:
        return `opacity-100 transition-opacity duration-${duration}`;
    }
  };

  // Get initial transform class based on animation type
  const getInitialTransform = () => {
    if (isVisible) return '';

    switch (animation) {
      case 'slideUp':
        return 'translate-y-8';
      case 'slideDown':
        return '-translate-y-8';
      case 'slideLeft':
        return 'translate-x-8';
      case 'slideRight':
        return '-translate-x-8';
      case 'zoomIn':
        return 'scale-95';
      default:
        return '';
    }
  };

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      className={`${className} ${getAnimationClass()} ${getInitialTransform()}`}
      onLoad={handleImageLoaded}
      onError={() => {
        // Fallback for image load error
        console.error("Error loading image:", src);
        setIsLoaded(true);
        setTimeout(() => setIsVisible(true), delay);
      }}
      {...props}
    />
  );
}

export default AnimatedImage;