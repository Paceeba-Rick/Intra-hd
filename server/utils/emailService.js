const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Create transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Send new order notification email
exports.sendOrderNotification = async (orderData) => {
  try {
    const formatAddress = () => {
      switch (orderData.residenceType) {
        case 'legon-hall':
          return `Block ${orderData.block}, Room ${orderData.room}, Legon Hall`;
        case 'traditional-halls':
          return orderData.hall;
        case 'hostels':
          return `${orderData.hostel}, Block ${orderData.block}`;
        default:
          return 'Unknown location';
      }
    };

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background-color: #1e40af; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">🚀 New INTRA-HD Order</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #1e40af; margin-top: 0;">Order Details</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <div style="display: grid; gap: 15px;">
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">
                <strong>Order ID:</strong>
                <span style="color: #6b7280;">#${orderData.id.substring(0, 8)}</span>
              </div>
              
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">
                <strong>Customer Name:</strong>
                <span style="color: #6b7280;">${orderData.name}</span>
              </div>
              
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">
                <strong>Phone Number:</strong>
                <span style="color: #6b7280;">${orderData.phoneNumber}</span>
              </div>
              
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">
                <strong>Delivery Location:</strong>
                <span style="color: #6b7280;">${formatAddress()}</span>
              </div>
              
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">
                <strong>Order Amount:</strong>
                <span style="color: #6b7280;">GHS ${parseFloat(orderData.orderAmount).toFixed(2)}</span>
              </div>
              
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">
                <strong>Delivery Fee:</strong>
                <span style="color: #6b7280;">GHS ${parseFloat(orderData.deliveryFee).toFixed(2)}</span>
              </div>
              
              <div style="display: flex; justify-content: space-between; font-weight: bold; color: #1e40af;">
                <strong>Total Amount:</strong>
                <span>GHS ${parseFloat(orderData.totalAmount).toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <h3 style="margin: 0 0 10px 0; color: #92400e;">Order Description:</h3>
            <p style="margin: 0; color: #92400e;">${orderData.orderDescription}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
            <h3 style="margin: 0 0 10px 0; color: #047857;">Next Steps:</h3>
            <ul style="margin: 0; color: #047857; padding-left: 20px;">
              <li>Customer will proceed to payment via PayStack</li>
              <li>Once payment is confirmed, begin processing the order</li>
              <li>Contact customer at ${orderData.phoneNumber} for any clarifications</li>
              <li>Update order status in the admin dashboard</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              Order received at ${new Date().toLocaleString('en-GB', { timeZone: 'Africa/Accra' })} (Ghana Time)
            </p>
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `🚀 New INTRA-HD Order - ${orderData.name} (GHS ${parseFloat(orderData.totalAmount).toFixed(2)})`,
      html: emailHtml
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Order notification email sent successfully:', result.messageId);
    
    return {
      success: true,
      messageId: result.messageId
    };
  } catch (error) {
    console.error('Error sending order notification email:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Send order status update email (optional - for future use)
exports.sendOrderStatusUpdate = async (orderData) => {
  try {
    const statusMessages = {
      'received': '📋 Your order has been received and is being reviewed',
      'processing': '⚡ Your order is being processed',
      'in-delivery': '🚚 Your order is out for delivery',
      'delivered': '✅ Your order has been delivered successfully',
      'cancelled': '❌ Your order has been cancelled'
    };

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background-color: #1e40af; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">📱 Order Status Update</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #1e40af; margin-top: 0;">Hi ${orderData.name},</h2>
          
          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #047857;">Status Update:</h3>
            <p style="margin: 0; color: #047857; font-size: 16px; font-weight: bold;">
              ${statusMessages[orderData.status] || 'Order status updated'}
            </p>
          </div>
          
          <p style="color: #6b7280;">
            Order ID: #${orderData.id.substring(0, 8)}<br>
            Total Amount: GHS ${parseFloat(orderData.totalAmount).toFixed(2)}
          </p>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #6b7280; font-size: 14px;">
              For any questions, contact us at +233 53 312 5955
            </p>
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: orderData.email || `${orderData.name.replace(/\s+/g, '').toLowerCase()}@example.com`,
      subject: `📱 INTRA-HD Order Update - ${orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}`,
      html: emailHtml
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Order status email sent successfully:', result.messageId);
    
    return {
      success: true,
      messageId: result.messageId
    };
  } catch (error) {
    console.error('Error sending order status email:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
