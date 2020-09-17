const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Please enter type']
    },
    tittle: {
        type: String,
        required: [true, 'Please enter a tittle']
    },
    price: {
        type: Number,
        required: [true, 'Please enter de price']
    },
    description: {
        type: String,
        default: ''
    },
    photo: {
        type: String,
        default: '/img/'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('menu', menuSchema)