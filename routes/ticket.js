const express = require('express');
const router = express.Router();
const passport = require('passport');
const checkAuthenticated  = require('../config/auth.config');
const Reservation = require('../models/Reservation');
const makeReservation = require('../controllers/makeReservation');


router.post('/makeReservation', checkAuthenticated, (req, res) => {
    makeReservation(req, res);
});



module.exports = router;