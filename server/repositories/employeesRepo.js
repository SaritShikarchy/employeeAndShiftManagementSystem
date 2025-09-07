const Employee= require('../model/employeeModel')

const getAllEmployees =(filters) => {
    return Employee.find(filters)
};

const getEmployeeById =(id) => {
    return Employee.findById(id)
};

//post
const addEmployee =(obj) => {
    return Employee.create(obj)

};

const updateEmployee =(id, obj) => {
return Employee.findByIdAndUpdate (id, obj , { new: true })
};


const deleteEmployee =(id) => {
    return  Employee.findByIdAndDelete(id)
};

module.exports={
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee}

