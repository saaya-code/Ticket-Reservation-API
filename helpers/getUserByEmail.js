const mongoose = require("mongoose");
const User = require("../models/User");

async function getUserByEmail(email){
try{
    const user = await User.findOne({ email: email });
    return user;
}
catch(err){
    return null;
}
}


module.exports = getUserByEmail;