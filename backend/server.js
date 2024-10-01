const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
  res.send('TeleAI Backend is running');
});

// Define orders and reservations in-memory (this can be replaced with a database in the future)
const orders = [
    {
      id: 1, item: 'Pizza', quantity: 2, customerName: 'John Doe', contact: '123-456-7890',
      specialInstructions: 'Extra cheese', status: 'Pending', feedback: ['Great service!', 'Loved the pizza!']
    },
    {
      id: 2, item: 'Pasta', quantity: 1, customerName: 'Jane Smith', contact: '987-654-3210',
      specialInstructions: 'No onions', status: 'Completed', feedback: ['Could be better.']
    }
  ];
  

const reservations = [
  { id: 1, customerName: 'Alice Brown', contact: '555-1234', reservationDate: '2024-10-02', numGuests: 4, specialRequests: 'Window seat' },
  { id: 2, customerName: 'Bob Green', contact: '555-5678', reservationDate: '2024-10-03', numGuests: 2, specialRequests: 'Vegan menu' }
];

// Order Routes
const ordersRouter = express.Router();

ordersRouter.get('/', (req, res) => {
  res.json(orders);
});

ordersRouter.get('/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find(o => o.id === orderId);
  if (order) {
    res.json(order);
  } else {
    res.status(404).send('Order not found');
  }
});

ordersRouter.put('/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find(o => o.id === orderId);

  if (order) {
    order.status = req.body.status;
    res.json(order);
  } else {
    res.status(404).send('Order not found');
  }
});

// Feedback Route
ordersRouter.post('/:id/feedback', (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find(o => o.id === orderId);

  if (order) {
    const { feedback } = req.body;
    if (!order.feedback) {
      order.feedback = [];
    }

    order.feedback.push(feedback);
    res.json(order);
  } else {
    res.status(404).send('Order not found');
  }
});

// Analytics Route
app.get('/api/analytics', (req, res) => {
  const totalOrders = orders.length;
  const totalValue = orders.reduce((sum, order) => sum + order.quantity * 10, 0); // assuming each item is $10
  const averageOrderValue = totalValue / totalOrders;

  // Calculate popular items
  const itemCounts = orders.reduce((acc, order) => {
    acc[order.item] = (acc[order.item] || 0) + order.quantity;
    return acc;
  }, {});

  const popularItems = Object.keys(itemCounts).map(item => ({
    name: item,
    count: itemCounts[item]
  }));

  res.json({
    totalOrders,
    averageOrderValue,
    popularItems
  });
});

// Reservation Routes
const reservationRouter = express.Router();

reservationRouter.get('/', (req, res) => {
  res.json(reservations);
});

reservationRouter.get('/:id', (req, res) => {
  const reservationId = parseInt(req.params.id);
  const reservation = reservations.find(r => r.id === reservationId);
  if (reservation) {
    res.json(reservation);
  } else {
    res.status(404).send('Reservation not found');
  }
});

// Feedback route to fetch feedback from all orders
app.get('/api/feedback', (req, res) => {
    const allFeedback = orders.reduce((acc, order) => {
      if (order.feedback && order.feedback.length > 0) {
        acc.push(...order.feedback); // Collect feedback from each order
      }
      return acc;
    }, []);
  
    if (allFeedback.length > 0) {
      res.json(allFeedback);
    } else {
      res.status(404).send('No feedback available.');
    }
  });
  
  
  
// Use the routes
app.use('/api/orders', ordersRouter);
app.use('/api/reservations', reservationRouter);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
