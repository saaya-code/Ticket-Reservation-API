const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  train: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Train',
    required: true,
  },
  voyage:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voyage',
    required: true,
  },
  seat: {
    type: Number,
    required: true,
    unique: true,
    autoIncrement: true,
    default: 1,
  },
  departure: {
    type: Date,
    required: true,
  },
  arrival: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['reserved', 'cancelled'],
    default: 'reserved',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Reservation', reservationSchema);
