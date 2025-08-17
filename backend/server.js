const path = require('path');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware for parsing JSON and enabling CORS
app.use(express.json());
app.use(cors());

// Add a simple logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Import all your route modules
const authRoutes = require('./routes/auth');
const walletRoutes = require('./routes/wallet');
const transactionRoutes = require('./routes/transaction');
const userRoutes = require('./routes/user');
const billRoutes = require('./routes/bill');
const entertainmentRoutes = require('./routes/entertainment');
const mobileRoutes = require('./routes/mobile');
const serviceRoutes = require('./routes/service');
const shoppingRoutes = require('./routes/shopping');
const financialRoutes = require('./routes/financial');
const digitalRoutes = require('./routes/digital');

// Wire each route with a base API path
app.use('/auth', authRoutes);               // Register, login, etc.
app.use('/wallet', walletRoutes);           // Add/pay, wallet actions
app.use('/transactions', transactionRoutes); // View transaction history
app.use('/user', userRoutes);               // User profile endpoints
app.use('/bills', billRoutes);
app.use('/entertainment', entertainmentRoutes);
app.use('/mobile', mobileRoutes);
app.use('/services', serviceRoutes);
app.use('/shopping', shoppingRoutes);
app.use('/financial', financialRoutes);
app.use('/digital', digitalRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start the backend server
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => {
  console.log('MongoDB connected...');
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection failed:', err);
});
