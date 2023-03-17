const mongoose = require('mongoose');

const voyageSchema = new mongoose.Schema({
    train: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Train',
        required: true,
    },
    departure: {
        type: Date,
        required: true,
    },
    arrival: {
        type: Date,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    remainingSeats: {
        type: Number,
        required: true,
    },

});


module.exports = mongoose.model('Voyage', voyageSchema);