import { useState } from 'react';
import { OrderProvider } from './context/OrderContext';
import Header from './components/Header';
import OrderForm from './components/OrderForm';
import ResidenceTypeSelector from './components/ResidenceTypeSelector';
import PaymentRedirect from './components/PaymentRedirect';
import AnimatedImage from './components/AnimatedImage';
import { campusImages } from './assets/campusImages';


function App() {
  const [step, setStep] = useState('select-residence'); // 'select-residence', 'order-form', 'payment'
  const [selectedResidence, setSelectedResidence] = useState(null);
  const [orderData, setOrderData] = useState({});

  const handleResidenceSelect = (residence) => {
    setSelectedResidence(residence);
    setStep('order-form');
  };

  const handleOrderSubmit = (data) => {
    setOrderData(data);
    setStep('payment');
  };

  const handleBackToForm = () => {
    setStep('order-form');
  };

  const handleRestart = () => {
    setSelectedResidence(null);
    setOrderData({});
    setStep('select-residence');
  };

  return (
    <OrderProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header onRestart={handleRestart} />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {step === 'select-residence' && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-center text-green-900 mb-6">
                    INTRA-HD Campus Delivery 
                    <hr></hr>
                  </h2>
                  <p className="text-gray-600 text-center mb-8">
                    <b>Get anything delivered anywhere on campus</b>
                  </p>
                  <p className='text-aqua-green'>

                  Your trust matters to us! Every order is handled securely—just submit your request, pay via MoMo
                   (we provide a verified number for your transaction), and we’ll deliver fast. No hidden fees, 
                   no middlemen. Thousands of students on campus rely on us daily, and we’re committed to making your 
                   experience smooth and hassle-free. Have questions? Reach out anytime via WhatsApp—we’re here to help!
                 
                  </p>
                </div>
                
                <ResidenceTypeSelector onSelect={handleResidenceSelect} />
              </div>
            )}
            
            {step === 'order-form' && selectedResidence && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <OrderForm 
                  residenceType={selectedResidence} 
                  onSubmit={handleOrderSubmit} 
                  onBack={() => setStep('select-residence')}
                />
              </div>
            )}
            
            {step === 'payment' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <PaymentRedirect 
                  orderData={orderData} 
                  onBack={handleBackToForm} 
                />
              </div>
            )}
          </div>
        </main>
        
        <footer className="bg-blue-400 text-white py-4">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} INTRA-HD</p>
          </div>
        </footer>
      </div>
    </OrderProvider>
  );
}

export default App;