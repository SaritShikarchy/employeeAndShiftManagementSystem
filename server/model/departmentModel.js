const mongoose = require('mongoose');
// const Employee = require('./employeeModel');

const departmentSchema =new mongoose.Schema({
name: String,
//manager refers to employee id
manager:{
type: mongoose.Schema.Types.ObjectId,
ref: 'Employee'
}
},
{
    versionKey: false,
})

//Department is a class that it's why I wrote with upper case
const Department =mongoose.model ('department',departmentSchema,'departments')
module.exports =Department;