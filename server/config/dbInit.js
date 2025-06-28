const db = require('./database');
const { Order } = require('../models');

// Initialize database tables
const initDatabase = async () => {
  try {
    await db.sync({ alter: true });
    console.log('Database tables synced successfully (data preserved)');
  } catch (error) {
    console.error('Error syncing database:', error);
    process.exit(1);
  }
};

module.exports = initDatabase;
