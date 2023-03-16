// Description: This file is the entry point to our application

// Importing dependencies 
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');


// Initializing variables
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/connectDB');

// Importing routes
const mainRoute = require('./routes/mainRoute');

app.use(bodyParser.json());
app.use("/", mainRoute);




app.listen(PORT, () => {
  connectDB(process.env.MONGO_URI)  
  console.log(`Server is running on port ${PORT}`);
});