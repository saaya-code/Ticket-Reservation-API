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
const initilizePassport = require('./config/passport.config');
// initilizing passportjs
initilizePassport(passport, getUserByEmail, getUserById);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("You are not authenticated");
}



// Initializing variables
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/connectDB');
const registerUser = require('./controllers/register');

// Importing routes
//const mainRoute = require('./routes/mainRoute');

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



app.post("/login",passport.authenticate('local',{
  failureFlash: true
}), (req,res) => {
  res.status(200).send("Authenticated successfully");
})




app.post('/register', async (req, res) => {
  registerUser(req, res);
});

app.delete("/logout", (req, res) => {
  req.logOut(err=>console.log(err));
  res.status(200).send("Logged out successfully");
});

app.get("/user",checkAuthenticated, async (req, res) => {
  console.log(req.body.email);
  const user = await getUserByEmail(req.body.email);
  res.send(user);
});





app.listen(PORT, () => {
  connectDB(process.env.MONGO_URI)  
  console.log(`Server is running on port ${PORT}`);
});