const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/auth');

// Admin login - Public route
router.post('/login', adminController.login);

// Get admin profile - Protected route
router.get('/profile', authenticateAdmin, adminController.getProfile);

module.exports = router;
