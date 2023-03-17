const mongoose = require("mongoose");
const User = require("../models/User");



async function getUserById(id){
    try{
        const user = await User.findOne({ _id: id });
        return user;
    }
    catch(err){
        return null;
    }
}


module.exports = getUserById;