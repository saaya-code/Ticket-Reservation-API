const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require("../models/User");


router.post('/register', async (req, res) => {
    try {
      // Check if the user already exists
      const CheckUser = await User.findOne({ email: req.body.email });
      if(CheckUser) {
        return res.status(400).send("User already exists");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      // Create a new user
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      });
  
      // Save the user to the database
      await user.save();
  
      res.status(201).send(user);
    } catch (error) {
    console.log(req.body)
      res.status(400).send(error);
      console.log(error);
    }
  });


module.exports = router;