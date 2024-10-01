const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Assuming Order is a model in your DB

// Get all orders
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific order by ID
router.get('/orders/:id', getOrder, (req, res) => {
    res.json(res.order);
});

// Create a new order
router.post('/orders', async (req, res) => {
    const order = new Order({
        name: req.body.name,
        quantity: req.body.quantity,
        instructions: req.body.instructions
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an order by ID
router.put('/orders/:id', getOrder, async (req, res) => {
    if (req.body.name != null) {
        res.order.name = req.body.name;
    }
    if (req.body.quantity != null) {
        res.order.quantity = req.body.quantity;
    }
    if (req.body.instructions != null) {
        res.order.instructions = req.body.instructions;
    }

    try {
        const updatedOrder = await res.order.save();
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an order by ID
router.delete('/orders/:id', getOrder, async (req, res) => {
    try {
        await res.order.remove();
        res.json({ message: 'Deleted Order' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to fetch order by ID
async function getOrder(req, res, next) {
    let order;
    try {
        order = await Order.findById(req.params.id);
        if (order == null) {
            return res.status(404).json({ message: 'Cannot find order' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.order = order;
    next();
}

// Feedback endpoints
router.get('/orders/:id/feedback', getOrder, (req, res) => {
    res.json(res.order.feedback); // Assuming feedback is an array in the order model
});

router.post('/orders/:id/feedback', getOrder, async (req, res) => {
    const feedback = req.body.feedback;
    res.order.feedback.push(feedback);

    try {
        const updatedOrder = await res.order.save();
        res.status(201).json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
