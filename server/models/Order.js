const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Order = db.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Optional user ID for future authentication'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  residenceType: {
    type: DataTypes.ENUM('legon-hall', 'traditional-halls', 'hostels'),
    allowNull: false
  },
  // Legon Hall specific
  block: {
    type: DataTypes.STRING,
    allowNull: true
  },
  room: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Traditional Halls specific
  hall: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Hostels specific
  hostel: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Order details
  orderDescription: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  orderAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  // Payment information
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending'
  },
  paymentReference: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Order status
  status: {
    type: DataTypes.ENUM('received', 'processing', 'in-delivery', 'delivered', 'cancelled'),
    defaultValue: 'received'
  }
}, {
  timestamps: true,
  indexes: [
    { fields: ['paymentReference'] },
    { fields: ['phoneNumber'] }
  ]
});

module.exports = Order;
