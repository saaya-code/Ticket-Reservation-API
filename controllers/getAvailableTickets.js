const Train = require('../models/Train');
const Reservation = require('../models/Reservation');
const Voyage = require('../models/Voyage');

async function getAvailableTickets(req, res){
    try{
        const {from, to} = req.body;
        const voyageObject = await Voyage.find({from: from, to: to}) || null;
        if(!voyageObject){
            return res.status(404).json({message: 'There are currently no voyages to this route'});
        }
        const availableVoyages = voyageObject.filter((voyage) => voyage.remainingSeats > 0);
        return res.status(200).json({message: 'Available voyages', availableVoyages});
        
    }
    catch(err){
        return res.status(500).json({message: 'Something went wrong'});
    }

}


module.exports = getAvailableTickets;