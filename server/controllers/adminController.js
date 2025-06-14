const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Admin login
exports.login = (req, res) => {
  const { username, password } = req.body;

  // Check if username and password match the hardcoded admin credentials
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    // Create payload for JWT
    const payload = {
      admin: {
        username
      }
    };

    // Sign JWT token
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your-default-secret-key',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          message: 'Admin login successful',
          token
        });
      }
    );
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
};

// Get admin profile
exports.getProfile = (req, res) => {
  res.json({
    success: true,
    admin: {
      username: req.admin.admin.username,
      role: 'Administrator'
    }
  });
};
