// Description: This file is the entry point to our application

// Importing dependencies
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const flash = require('express-flash');
const session = require('express-session');
const getUserByEmail = require('./helpers/getUserByEmail');
const getUserById = require('./helpers/getUserById');
const checkAuthenticated  = require('./config/auth.config');

const initilizePassport = require('./config/passport.config');
// initilizing passportjs
initilizePassport(passport, getUserByEmail, getUserById);





// Initializing variables
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/connectDB');
const registerUser = require('./controllers/register');




// Importing routes
//const mainRoute = require('./routes/mainRoute');
const ticket = require('./routes/ticket');
const voyage = require('./routes/voyage');

app.use(bodyParser.json());
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Routes
app.use("/ticket", ticket);
app.use("/voyage", voyage);

app.post("/login",passport.authenticate('local',{
  failureFlash: true
}), (req,res) => {
  try{
    res.status(200).send("Authenticated successfully");
  } catch (error) {
    res.status(500).send(error);
  }
})

app.post('/register', async (req, res) => {
  registerUser(req, res);
});

app.delete("/logout", (req, res) => {
  req.logOut(err=>console.log(err));
  res.status(200).send("Logged out successfully");
});


const Train = require('./models/Train');
const Reservation = require('./models/Reservation');
app.post("/addTrain", async (req, res) => {
  try {
    const { name, seats, from, to, price } = req.body;
    const train = new Train({
      name: name,
      seats: seats,
      from: from,
      to: to,
      price: price,
    });
    await train.save();
    res.status(200).send("Train added successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});


app.post("/sync", async (req, res) => {
  Reservation.syncIndexes();
  res.status(200).send("Synced successfully");
})

const Voyage = require('./models/Voyage');

app.post("/addVoyage", async (req, res) => {
  const { train, departure, arrival, from, to } = req.body;
  const currentTrain = await Train.findOne({ _id: train });
  if (!currentTrain) {
    res.status(404).send("Train not found");
  }
  const voyage = new Voyage({
    train: train,
    departure: departure,
    arrival: arrival,
    from: from,
    to: to,
    remainingSeats: currentTrain.seats,
});
  await voyage.save();
  res.status(200).send("Voyage added successfully");
});

app.listen(PORT, () => {
  connectDB(process.env.MONGO_URI)
  console.log(`Server is running on port ${PORT}`);
});