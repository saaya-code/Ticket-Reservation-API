const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require("../models/User");
const registerUser = require('../controllers/register');





module.exports = router;