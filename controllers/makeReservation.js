const Reservation = require('../models/Reservation');
const Voyage = require('../models/Voyage');
const  transporter  = require('../config/nodemailer.config');
require('dotenv').config();

async function makeReservation(req,res){
    try{
        const {train, departure, arrival, from, to} = req.body;
        const voyageObject = await Voyage.findOne({train: train, departure:departure, arrival: arrival, from: from, to: to}) || null;
        if(!voyageObject){
            return res.status(404).json({message: 'Voyage not found'});
        }
        if(voyageObject.remainingSeats === 0){
            return res.status(400).json({message: 'No seats available'});
        }
        const reservation = new Reservation({
            user: req.user._id,
            train: train,
            seat: voyageObject.remainingSeats,
            departure: departure,
            arrival: arrival,
            from: from,
            to: to,
            voyage: voyageObject._id,
        }); 
        reservation.save();
        voyageObject.remainingSeats -= 1;
        voyageObject.save();
        let mailOptions = {
            from: process.env.MAIL_ADDRESS,
            to: req.user.email,
            subject: 'Confirmation de la réservation',
            text: `Votre réservation a été confirmé avec succès! \n pour le voyage ${from} - ${to} \n à partir de ${departure} \n jusqu'à ${arrival} \n avec le train ${train} \n votre siège est ${reservation.seat}`
         };
         transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });


        return res.status(200).json({message: 'Reservation successful'});
    }catch(err){
        console.log(err)
        return res.status(500).json({message: 'Something went wrong'});
    }
}

module.exports = makeReservation;