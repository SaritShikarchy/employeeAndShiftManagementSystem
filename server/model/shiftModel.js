const mongoose = require('mongoose');

const shiftSchema =new mongoose.Schema({
date: Date,
startingHour: Number,
endingHour: Number
},
{
    versionKey: false,
})

//Shift is a class that it's why I wrote with upper case
const Shift =mongoose.model ('shift',shiftSchema,'shifts')
module.exports =Shift;