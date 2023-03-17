// Description: This file is the entry point to our application

// Importing dependencies
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const getUserByEmail = require('./helpers/getUserByEmail');
const getUserById = require('./helpers/getUserById');

const initilizePassport = require('./config/passport.config');
// initilizing passportjs
initilizePassport(passport, getUserByEmail, getUserById);





// Initializing variables
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/connectDB');
const registerUser = require('./controllers/register');

connectDB(process.env.MONGO_URI);



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



module.exports = app;