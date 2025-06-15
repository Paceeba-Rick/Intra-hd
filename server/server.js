const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

// Import database configuration
const db = require('./config/database');
const initDatabase = require('./config/dbInit');

// Import routes
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Import middleware
const { authenticateAdmin } = require('./middleware/auth');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Production security middleware
if (process.env.NODE_ENV === 'production') {
  // Set security headers
  app.use(helmet());
  
  // Compress responses
  app.use(compression());
  
  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later'
  });
  
  // Apply rate limiting to all routes
  app.use(limiter);
}

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL  // In production, only allow the specific client URL
    : '*',                    // In development, allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection and initialize tables
db.authenticate()
  .then(() => {
    console.log('Database connection established successfully');
    return initDatabase();
  })
  .catch(err => console.error('Unable to connect to the database:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('INTRA-HD API is running');
});

// API Routes
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // In production, you might want to gracefully shutdown
  // process.exit(1);
});
