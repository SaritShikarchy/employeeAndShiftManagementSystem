const Department= require('../model/departmentModel')

const getAllDepartments =(filters) => {
    return Department.find(filters)
};

const getDepartmentById =(id) => {
    return Department.findById(id)
};

//post
const addDepartment =(obj) => {
    return Department.create(obj)

};

const updateDepartment =(id, obj) => {
return Department.findByIdAndUpdate (id, obj)
};


const deleteDepartment =(id) => {
    return  Department.findByIdAndDelete(id)
};

module.exports={
    getAllDepartments,
    getDepartmentById,
    addDepartment,
    updateDepartment,
    deleteDepartment}

