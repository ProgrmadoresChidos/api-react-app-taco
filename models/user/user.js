const mongoose = require('mongoose');
const { isAlpha, isEmail } = require('validator');

const passRegex = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/;
const nameRegex = /^[a-zA-Z][a-zA-Z\s]*$/g

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        // validate: [
        //     (v) => {
        //         const res = (nameRegex.exec(v) === null);
        //         return !res;
        //     },
        //     'Please just enter letters'
        // ]
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
        minlength: [8, 'Minimum password length is 8 characters'],
        validate:
        {
            validator: function (v) { return passRegex.test(v) },
            
            // {
            //     // console.log(v, passRegex.exec(v) === null)
            //     const res = (passRegex.exec(v) === null);
            //     return !res;
            // },
            message:'Please enter a valid password {VALUE} : at least 1 uppercase letter, 1 digit, 1 special character'
        }
    }
})

const user = mongoose.model('user', userSchema);
module.exports = user;