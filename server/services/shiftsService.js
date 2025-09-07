const shiftRepo= require ('../repositories/shiftsRepo')

const getAllShifts =(filters) => {
    return shiftRepo.getAllShifts(filters);
};

const getShiftById =(id) => {
    return shiftRepo.getShiftById(id)
};

const addShift =(obj) => {
    return shiftRepo.addShift(obj)

};

const updateShift =(id, obj) => {
return shiftRepo.updateShift (id, obj)
};


const deleteShift =(id) => {
    return  shiftRepo.deleteShift(id)
};

module.exports={
    getAllShifts,
    getShiftById,
    addShift,
    updateShift,
    deleteShift}

