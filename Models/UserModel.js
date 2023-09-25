const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    email:{type:String},
    password:{type:String},
    confirm_password:{type:String}
});

const user = mongoose.model("user",UserSchema);

module.exports = user;