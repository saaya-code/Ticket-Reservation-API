const Reservation = require('../models/Reservation');
const Train = require('../models/Train');

function makeReservation(req,res){
    try{
        const {trainId, departure, arrival} = req.body;
        const train = Train.findOne({_id: trainId});
        if(!train){
            return res.status(404).json({message: 'Train not found'});
        }
        const reservationNumbers = Reservation.find({train: trainId, departure: departure, arrival: arrival, status: 'reserved'});
        if(reservationNumbers.length >= train.seats){
            return res.status(400).json({message: 'No seats available'});
        }
        const reservation = new Reservation({
            user: req.user._id,
            train: trainId,
            seat: reservationNumbers.length + 1,
            departure: departure,
            arrival: arrival,
        }); 
        reservation.save();
        return res.status(200).json({message: 'Reservation successful'});
    }catch(err){
        return res.status(500).json({message: 'Something went wrong'});
    }
}