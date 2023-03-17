const Reservation = require('../models/Reservation');
const Train = require('../models/Train');

async function makeReservation(req,res){
    try{
        const {train, departure, arrival, from, to} = req.body;
        const trainObject = await Train.findOne({_id: train});
        if(!trainObject){
            return res.status(404).json({message: 'Train not found'});
        }
        const reservationNumbers = await Reservation.find({train: train, departure: departure, arrival: arrival, status: 'reserved'}) || [];
        console.log(reservationNumbers);
        if(reservationNumbers.length >= trainObject.seats){
            return res.status(400).json({message: 'No seats available'});
        }
        console.log(reservationNumbers.length + 1)
        const reservation = new Reservation({
            user: req.user._id,
            train: train,
            seat: reservationNumbers.length + 1,
            departure: departure,
            arrival: arrival,
            from: from,
            to: to,
        }); 
        reservation.save();
        return res.status(200).json({message: 'Reservation successful'});
    }catch(err){
        return res.status(500).json({message: 'Something went wrong'});
    }
}

module.exports = makeReservation;