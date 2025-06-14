const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import database configuration
const db = require('./config/database');
const initDatabase = require('./config/dbInit');

// Import routes
const orderRoutes = require('./routes/orderRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
