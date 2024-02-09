const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : String,
    phone : String,
    email : String,
    password: String
})

const userModel = mongoose.model("Users", userSchema)

module.exports = userModel;