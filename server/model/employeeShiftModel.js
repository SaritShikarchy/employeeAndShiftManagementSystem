const mongoose = require('mongoose');

const employeeShiftSchema =new mongoose.Schema({
        employeeId: {
            type: mongoose.Schema.Types.String,
            ref: 'Employee'
        },

        shiftId: {
            type: mongoose.Schema.Types.String,
            ref: 'Shift'
        }
},
{
    versionKey: false,
})

const EmployeeShift =mongoose.model ('employeeShift',employeeShiftSchema,'employeeShifts')
module.exports =EmployeeShift;