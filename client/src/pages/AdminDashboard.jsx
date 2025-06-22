import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import orderService from '../services/orderService';
import adminService from '../services/adminService';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminProfile, setAdminProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      navigate('/admin');
      return;
    }
    
    const loadAdminData = async () => {
      try {
        // Get admin profile
        const profileResponse = await adminService.getProfile();
        setAdminProfile(profileResponse.admin);
        
        // Fetch orders
        const ordersResponse = await orderService.getAllOrders();
        setOrders(ordersResponse.data || []);
      } catch (err) {
        console.error('Error loading admin data:', err);
        setError('Failed to load data. You may need to log in again.');
        
        // If unauthorized, redirect to login
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin');
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAdminData();
  }, [navigate]);

  const handleLogout = () => {
    adminService.logout();
    navigate('/admin');
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setIsLoading(true);
      await orderService.updateOrderStatus(orderId, newStatus);
      
      // Update local state with new status
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error('Failed to update order status:', err);
      alert('Failed to update order status');
    } finally {
      setIsLoading(false);
    }
  };
  
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'received': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'in-delivery': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const orderListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const orderItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <motion.header 
        className="bg-white shadow-sm"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <Link to='/'>
              <h1 className="text-2xl font-bold text-gray-800">INTRA-HD Admin Dashboard</h1>
            </Link>
            
            {adminProfile && (
              <p className="text-sm text-gray-500">Logged in as {adminProfile.username}</p>
            )}
          </div>
          <motion.button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </div>
      </motion.header>
      
      <main className="container mx-auto px-4 py-8">
        <motion.div 
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <motion.svg 
                className="w-10 h-10 text-blue-600" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </motion.svg>
            </div>
          ) : error ? (
            <motion.div 
              className="p-4 bg-red-50 text-red-700 rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          ) : orders.length === 0 ? (
            <motion.div 
              className="text-center p-8 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No orders found
            </motion.div>
          ) : (
            <div className="overflow-x-auto">
              <motion.table 
                className="min-w-full divide-y divide-gray-200"
                variants={orderListVariants}
                initial="hidden"
                animate="visible"
              >
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <AnimatePresence>
                    {orders.map(order => (
                      <motion.tr 
                        key={order.id}
                        variants={orderItemVariants}
                        exit={{ opacity: 0, height: 0 }}
                        layout
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order.id.substring(0, 8)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{order.name}</div>
                          <div className="text-sm text-gray-500">{order.phoneNumber}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">{order.orderDescription}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {order.residenceType === 'legon-hall' && `Legon Hall, Block ${order.block}, Room ${order.room}`}
                            {order.residenceType === 'traditional-halls' && `${order.hall}`}
                            {order.residenceType === 'hostels' && `${order.hostel}, Block ${order.block}`}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>Order: GHS {parseFloat(order.orderAmount).toFixed(2)}</div>
                          <div>Delivery: GHS {parseFloat(order.deliveryFee || 6).toFixed(2)}</div>
                          <div className="font-medium text-gray-800">Total: GHS {parseFloat(order.totalAmount).toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <motion.select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            whileFocus={{ scale: 1.02 }}
                            disabled={isLoading}
                          >
                            <option value="received">Received</option>
                            <option value="processing">Processing</option>
                            <option value="in-delivery">In Delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </motion.select>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </motion.table>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
