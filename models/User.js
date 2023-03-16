const mongoose = require('mongoose');

// Define the user's schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Name is required"],
        minLength: [3,"Name must be at least 3 characters long"],
        maxLength: [20,"Name must be at most 20 characters long"],
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: [true,"Email already exists"],
        RegExp: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    },
    password: {
        type: String,
        required: [true,"Password is required"],
    },
    date: {
        type: Date,
        default: Date.now
    }
});




// Creating and exportingthe user's model

module.exports = mongoose.model('User', userSchema);
