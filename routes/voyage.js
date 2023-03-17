const express = require('express');
const router = express.Router();
const checkAuthenticated  = require('../config/auth.config');
const Voyage = require('../models/Voyage');



router.get("/availableSeats", checkAuthenticated, async (req, res) => {
    try{
    const {from, to} = req.body;
    const voyageObject = await Voyage.find({from: from, to: to}) || null;
    if(!voyageObject){
        return res.status(404).json({message: 'There are currently no voyages to this route'});
    }
    const availableVoyages = voyageObject.filter((voyage) => voyage.remainingSeats > 0);
    console.log(availableVoyages)
    const availableSeats = availableVoyages.map((voyage) => voyage.remainingSeats);
    return res.status(200).json({message: 'Available voyages', availableSeats});
    }
    catch(err){
        return res.status(500).json({message: 'Something went wrong'});
    }
});


module.exports = router;