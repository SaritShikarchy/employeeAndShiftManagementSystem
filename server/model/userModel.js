const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
fullName: String,
numOfActions: Number
},
{
    versionKey: false,
})

//User is a class that it's why I wrote with upper case
const User =mongoose.model ('user',userSchema,'users')
module.exports =User;