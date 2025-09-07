const EmployeeShift= require('../model/employeeShiftModel')

const getAllEmployeesShifts =(filters) => {
    return EmployeeShift.find(filters)
};

const getEmployeeShiftById =(id) => {
    return EmployeeShift.findById(id)
};

const getAllEmployeeShiftsByEmpId =(id) => {
    return EmployeeShift.find({employeeId:id})
};



//post
const addEmployeeShift =(obj) => {
    return EmployeeShift.create(obj)

};

const updateEmployeeShift =(id, obj) => {
return EmployeeShift.findByIdAndUpdate (id, obj , { new: true })
};


const deleteEmployeeShift =(id) => {
    return  EmployeeShift.findByIdAndDelete(id)
};

module.exports={
    getAllEmployeesShifts,
getEmployeeShiftById,
getAllEmployeeShiftsByEmpId,
addEmployeeShift,
updateEmployeeShift,
deleteEmployeeShift}

