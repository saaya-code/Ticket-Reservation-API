const Reservation = require('../models/Reservation');

async function cancelReservation(req,res){
    try{
        var reservation = await Reservation.findOne({_id: req.params.id, user: req.user._id}) || null;
        console.log(reservation);
        if(!reservation){
            return res.status(404).json({message: 'Reservation not found'});
        }
        reservation.status = 'cancelled';
        reservation.save();
        return res.status(200).json({message: 'Reservation cancelled'});
    }catch(err){
        return res.status(500).json({message: 'Something went wrong'});
    }
}

module.exports = cancelReservation;