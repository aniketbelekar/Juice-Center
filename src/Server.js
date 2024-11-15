// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Order schema
const orderSchema = new mongoose.Schema({
  address: String,
  mobile: String,
  notes: String,
  cartItems: [
    {
      name: String,
      quantity: Number,
      price: String,
    }
  ],
  location: {
    lat: Number,
    lng: Number,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

// API to create an order
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: 'Error creating order' });
  }
});

// API to get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching orders' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
