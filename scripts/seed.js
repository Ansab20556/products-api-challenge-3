require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/productModel');

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/productsdb';

const data = [
  { name: 'Laptop', price: 1200, description: 'Powerful laptop' },
  { name: 'Phone', price: 700, description: 'Smartphone' },
  { name: 'Mouse', price: 25, description: 'Wireless mouse' }
];

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(data);
    console.log('Seeded DB with products');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
