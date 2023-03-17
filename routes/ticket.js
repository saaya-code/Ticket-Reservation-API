const express = require('express');
const router = express.Router();
const checkAuthenticated  = require('../config/auth.config');
const makeReservation = require('../controllers/makeReservation');
const cancelReservation = require('../controllers/cancelReservation');
const getAvailableTickets = require('../controllers/getAvailableTickets');


router.post('/makeReservation', checkAuthenticated, async (req, res) => {
    await makeReservation(req, res);
});

router.delete("/cancelReservation/:id", checkAuthenticated, async (req, res) => {
    await cancelReservation(req,res);
});

router.get("/getAvailableTickets", checkAuthenticated, async (req, res) => {
    await getAvailableTickets(req,res);
});

module.exports = router;