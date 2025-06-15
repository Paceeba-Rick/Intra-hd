import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import OrderPage from './pages/OrderPage';
import PaymentPage from './pages/PaymentPage';
import PaymentVerification from './components/PaymentVerification';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <OrderProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="order/:residenceType" element={<OrderPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="payment/verify" element={<PaymentVerification />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </OrderProvider>
  );
}

export default App;