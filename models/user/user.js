const mongoose = require('mongoose');
const { isAlpha, isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        validate: [isAlpha, 'Please just enter letters']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name'],
        validate: [isAlpha, 'Please enter just letters']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Minimum password length is 8 characters']
    }
})

const user = mongoose.model('user', userSchema);
module.exports = user;