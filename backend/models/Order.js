const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    instructions: {
        type: String,
        required: false,
    },
    feedback: {
        type: [String], // Storing feedback as an array of strings
        default: []
    }
});

module.exports = mongoose.model('Order', orderSchema);
