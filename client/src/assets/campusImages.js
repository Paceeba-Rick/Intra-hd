// Define campus images for the application

// Demo image URLs (in a real application, these would be imported from local files)
export const campusImages = {
  // Main images
  ugLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/University_of_Ghana_logo.svg/800px-University_of_Ghana_logo.svg.png",
  ugMainGate: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Gate_to_University_of_Ghana_campus.jpg/1280px-Gate_to_University_of_Ghana_campus.jpg",
  
  // Residence types
  legonHall: "https://upload.wikimedia.org/wikipedia/commons/0/08/LEGONHALL.jpg",
  traditionalHalls: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Commonwealth_Hall_of_University_of_Ghana.jpg",
  hostels: "https://media.istockphoto.com/id/675314518/photo/student-accommodation-bedroom-in-modern-purpose-built-apartments.jpg?s=612x612&w=0&k=20&c=fVp6HFBK7n-Fwn9zVc1P3QXsB8-WXTCIY8l9PeTPMfw=",
  
  // Payment related
  payment: "https://cdn-icons-png.flaticon.com/512/2331/2331941.png",
  
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