require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/productsdb';

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// custom middleware: log date/time
app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  req.requestTime = now; // إذا أردت استخدامه داخل الكونترولر
  next();
});

// routes
app.use('/api/products', productRoutes);

// basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Connect to DB and start server
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✔ Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('✖ MongoDB connection error:', err);
    process.exit(1);
  });
