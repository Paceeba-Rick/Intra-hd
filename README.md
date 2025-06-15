# INTRA-HD Campus Delivery Service

A modern, full-stack campus delivery application built for university students. INTRA-HD provides fast, reliable delivery services across campus with secure payment integration through PayStack.

## 🚀 Features

- **Multi-Residence Support**: Supports Legon Hall, Traditional Halls, and Hostels
- **Real-time Order Management**: Complete order lifecycle from placement to delivery
- **Secure Payments**: PayStack integration for Mobile Money payments
- **Admin Dashboard**: Comprehensive order management and status tracking
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Modern UI/UX**: Built with React, Tailwind CSS, and Framer Motion

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library for React
- **React Router** - Declarative routing for React
- **Axios** - Promise-based HTTP client
- **React Icons** - Popular icon library

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **PayStack API** - Payment processing integration
- **CORS** - Cross-Origin Resource Sharing middleware

## 📁 Project Structure

```
INTRA-HD/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React Context providers
│   │   ├── services/       # API service functions
│   │   ├── utils/          # Utility functions
│   │   ├── assets/         # Static assets (images, icons)
│   │   └── layouts/        # Layout components
│   ├── public/             # Public static files
│   └── package.json        # Frontend dependencies
├── server/                 # Backend Node.js application
│   ├── models/             # Database models
│   ├── routes/             # API route handlers
│   ├── middleware/         # Custom middleware
│   ├── controllers/        # Business logic controllers
│   ├── config/             # Configuration files
│   └── postman/            # API testing collection
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- PayStack account for payment processing

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/intra-hd.git
   cd intra-hd
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**

   Create `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/intrahd
   JWT_SECRET=your_jwt_secret_here
   PAYSTACK_SECRET_KEY=your_paystack_secret_key
   PAYSTACK_PUBLIC_KEY=your_paystack_public_key
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

   Create `.env` file in the client directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start the server**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the client** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📱 Usage

### For Students

1. **Select Residence Type**: Choose from Legon Hall, Traditional Halls, or Hostels
2. **Fill Order Details**: Provide delivery location and order description
3. **Secure Payment**: Pay using Mobile Money through PayStack
4. **Track Order**: Receive updates on order status

### For Administrators

1. **Admin Login**: Access `/admin` with credentials
2. **Dashboard**: View all orders and their statuses
3. **Order Management**: Update order statuses in real-time
4. **Analytics**: Monitor delivery performance

## 🔧 API Endpoints

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/:id` - Get specific order
- `PUT /api/orders/:id` - Update order status
- `DELETE /api/orders/:id` - Delete order

### Payments
- `POST /api/payments/initialize` - Initialize PayStack payment
- `GET /api/payments/verify/:reference` - Verify payment status

### Admin
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/profile` - Get admin profile

## 🎨 UI Components

- **AnimatedImage**: Optimized image loading with animations
- **OrderForm**: Dynamic form based on residence type
- **PaymentRedirect**: Secure payment processing interface
- **ResidenceTypeSelector**: Interactive residence selection
- **AdminDashboard**: Comprehensive order management

## 📦 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy to Vercel or your preferred hosting service
```

### Backend (Railway/Heroku)
```bash
cd server
# Configure production environment variables
# Deploy to Railway, Heroku, or your preferred service
```

## 🔒 Security Features

- JWT-based authentication
- CORS protection
- Input validation and sanitization
- Secure payment processing with PayStack
- Environment variable protection

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, contact us:
- **WhatsApp**: +233 53 312 5955
- **Email**: support@intrahd.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- University of Ghana for inspiration
- PayStack for payment processing
- React community for excellent tools
- All contributors and beta testers

## 📊 Project Status

- ✅ Frontend Development
- ✅ Backend API
- ✅ Payment Integration
- ✅ Admin Dashboard
- 🔄 Production Deployment
- 📋 User Testing

---

**Made with ❤️ for University of Ghana students**
