const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Initialize payment for an order
router.post('/initialize', paymentController.initializePayment);

// Verify payment
router.get('/verify/:reference', paymentController.verifyPayment);

// Webhook handler for Paystack
router.post('/webhook', paymentController.handleWebhook);

module.exports = router;
