import { useState } from 'react';
import AnimatedImage from './AnimatedImage';
import { campusImages } from '../assets/campusImages';
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

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">Select Your Residence Type</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {residenceOptions.map((option) => (
          <div
            key={option.id}
            className={`border rounded-lg overflow-hidden transition-all duration-300 ${
              hoveredOption === option.id 
                ? 'shadow-lg transform -translate-y-1 border-green-500' 
                : 'shadow-md hover:shadow-lg'
            }`}
            onClick={() => onSelect(option.id)}
            onMouseEnter={() => setHoveredOption(option.id)}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <div className="relative h-40 overflow-hidden">
              <AnimatedImage
                src={option.image}
                alt={option.name}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  hoveredOption === option.id ? 'scale-110' : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <h4 className="absolute bottom-2 left-2 text-white font-bold text-lg px-2">
                {option.name}
              </h4>
            </div>
            
            <div className="p-4">
              <p className="text-gray-600 text-sm">
                {option.description}
              </p>
              
              <button 
                className={`mt-4 w-full py-2 rounded-md transition-colors ${
                  hoveredOption === option.id 
                    ? 'bg-green-600 text-white' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResidenceTypeSelector;