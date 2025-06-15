// Define campus images for the application

// Demo image URLs (in a real application, these would be imported from local files)
import legonHall from './legon-hall.jpg';
import otherHalls from './other-halls.png';
import hostels from './hostel.jpg';
import ugLogo from './Intra-hd.png';

// Create a payment image using the logo for now
const paymentImage = ugLogo;

export const campusImages = {
  // Main images
  ugLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/University_of_Ghana_logo.svg/800px-University_of_Ghana_logo.svg.png",
  ugMainGate: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Gate_to_University_of_Ghana_campus.jpg/1280px-Gate_to_University_of_Ghana_campus.jpg",
  
  // Residence types
  legonHall,
  traditionalHalls: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Commonwealth_Hall_of_University_of_Ghana.jpg",
  hostels,
  
  // Payment related
  payment: paymentImage,
  
  // Fallback image
  placeholder: "https://placehold.co/600x400?text=University+of+Ghana+Campus"
};

// Function to get an image with fallback
export const getImageWithFallback = (imageSrc) => {
  return imageSrc || campusImages.placeholder;
};

// Function to preload images for better user experience
export const preloadImages = () => {
  Object.values(campusImages).forEach(src => {
    const img = new Image();
    img.src = src;
  });
};