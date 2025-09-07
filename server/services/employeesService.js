const employeeRepo= require ('../repositories/employeesRepo')

const getAllEmployees =(filters) => {
    return employeeRepo.getAllEmployees(filters);
};

const getEmployeeById =(id) => {
    return employeeRepo.getEmployeeById(id)
};

const addEmployee =(obj) => {
    return employeeRepo.addEmployee(obj)

};

const updateEmployee =(id, obj) => {
return employeeRepo.updateEmployee (id, obj)
};


const deleteEmployee =(id) => {
    return  employeeRepo.deleteEmployee(id)
};

module.exports={
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee}

