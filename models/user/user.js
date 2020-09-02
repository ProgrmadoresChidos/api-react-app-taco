const mongoose = require('mongoose');
const { isEmail } = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const nameRegex = /^[a-zA-Z][a-zA-Z\s]*$/

const rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role',
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        validate: [(v) => nameRegex.test(v), 'Please just enter letters']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name'],
        validate: [(v) => nameRegex.test(v), 'Please enter just letters']
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
    },
    joinedAt: {
        type: Date,
        default: Date.now
    },
    lastUpdatedAt: {
        type: Date,
        default: Date.now
    },
    availableAccount: {
        type: Boolean,
        default: true
    },
    profileImg: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum: rolesValidos,
        default: 'USER_ROLE',
    },
})

userSchema.plugin(uniqueValidator, { message: 'Email already exists' })
module.exports = mongoose.model('user', userSchema);