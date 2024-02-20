const mongoose = require('mongoose');

// Define the schema for the product model
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    ram: {
        type: Number,
        required: true
    },
    camera: {
        type: String,
        required: true
    },
    network: {
        type: String,
        required: true
    },
    fingerprint: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

// Export the model
module.exports = mongoose.model('product', productSchema);
