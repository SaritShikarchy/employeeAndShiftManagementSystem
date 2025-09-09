const mongoose = require('mongoose');

const employeeSchema =new mongoose.Schema({
        firstName: String,
        lastName: String,
        startWorkYear: Number,
        departmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Department'
        }
},
{
    versionKey: false,
})

//Employee is a class that it's why I wrote with upper case
const Employee =mongoose.model ('employee',employeeSchema,'employees')
module.exports =Employee;