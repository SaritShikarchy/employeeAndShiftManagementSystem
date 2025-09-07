const employeeShiftRepo= require ('../repositories/employeesShiftsRepo')

const getAllEmployeesShifts =(filters) => {
    return employeeShiftRepo.getAllEmployeesShifts(filters);
};

const getEmployeeShiftById =(id) => {
    return employeeShiftRepo.getEmployeeShiftById(id)
};

const getAllEmployeeShiftsByEmpId =(id) => {
    return employeeShiftRepo.getAllEmployeeShiftsByEmpId(id)
};

const addEmployeeShift =(obj) => {
    return employeeShiftRepo.addEmployeeShift(obj)

};

const updateEmployeeShift =(id, obj) => {
return employeeShiftRepo.updateEmployeeShift (id, obj)
};


const deleteEmployeeShift =(id) => {
    return  employeeShiftRepo.deleteEmployeeShift(id)
};

module.exports={    
getAllEmployeesShifts,
getEmployeeShiftById,
getAllEmployeeShiftsByEmpId,
addEmployeeShift,
updateEmployeeShift,
deleteEmployeeShift}

