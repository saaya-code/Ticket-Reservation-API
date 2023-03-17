const mongoose = require('mongoose');

const TrainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [3, 'Name must be at least 3 characters long'],
        maxLength: [20, 'Name must be at most 20 characters long'],
        unique: true,
    },
    from: {
        type: String,
        required: [true, 'From is required'],
        minLength: [3, 'From must be at least 3 characters long'],
        maxLength: [40, 'From must be at most 40 characters long'],
    },
    to: {
        type: String,
        required: [true, 'To is required'],
        minLength: [3, 'To must be at least 3 characters long'],
        maxLength: [40, 'To must be at most 40 characters long'],
    },
    seats: {
        type: Number,
        required: [true, 'Seats is required'],
        min: [1, 'Seats must be at least 1'],
        max: [100, 'Seats must be at most 100'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0.01, 'Price must be at least 0.01'],
        max: [1000, 'Price must be at most 1000'],
    }
});

module.exports = mongoose.model('Train', TrainSchema);
    