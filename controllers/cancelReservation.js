const Reservation = require('../models/Reservation');
const Voyage = require('../models/Voyage');
async function cancelReservation(req,res){
    try{
        const reservation = await Reservation.findOne({_id: req.params.id, user: req.user._id}) || null;
        if(!reservation){
            return res.status(404).json({message: 'Reservation not found'});
        }
        reservation.status = 'cancelled';
        reservation.save();
        const VoyageObject = await Voyage.findOne({_id: reservation.voyage}) || null;
        if(!VoyageObject){
            return res.status(404).json({message: 'Voyage not found'});
        }
        VoyageObject.remainingSeats += 1;
        VoyageObject.save();
        let mailOptions = {
            from: process.env.MAIL_ADDRESS,
            to: req.user.email,
            subject: 'Confirmation de l\'annulation de la réservation',
            text: `Votre réservation a été annulé avec succès! \n pour le voyage ${reservation.from} - ${reservation.to} \n à partir de ${reservation.departure} \n jusqu'à ${reservation.arrival} \n avec le train ${reservation.train} \n votre siège était ${reservation.seat}`
        };
         transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return res.status(200).json({message: 'Reservation cancelled'});
    }catch(err){
        return res.status(500).json({message: 'Something went wrong'});
    }
}

module.exports = cancelReservation;