const Shift= require('../model/shiftModel')

const getAllShifts =(filters) => {
    return Shift.find(filters)
};

const getShiftById =(id) => {
    return Shift.findById(id)
};

//post
const addShift =(obj) => {
    return Shift.create(obj)

};

const updateShift =(id, obj) => {
return Shift.findByIdAndUpdate (id, obj)
};


const deleteShift =(id) => {
    return  Shift.findByIdAndDelete(id)
};

module.exports={
    getAllShifts,
    getShiftById,
    addShift,
    updateShift,
    deleteShift}

