import { Link } from 'react-router-dom';
import AnimatedImage from '../components/AnimatedImage';
import notFoundImage from '../assets/not-found.svg';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AnimatedImage
        src={notFoundImage}
        alt="Page Not Found"
        className="w-full max-w-xs mb-8"
        animation="slideDown"
      />
      
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        The page you're looking for doesn't seem to exist.
      </p>
      
      <Link 
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Back to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
