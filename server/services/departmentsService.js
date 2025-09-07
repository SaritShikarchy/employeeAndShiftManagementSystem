const departmentRepo= require ('../repositories/departmentsRepo')

const getAllDepartments =(filters) => {
    return departmentRepo.getAllDepartments(filters);
};

const getDepartmentById =(id) => {
    return departmentRepo.getDepartmentById(id)
};

const addDepartment =(obj) => {
    return departmentRepo.addDepartment(obj)

};

const updateDepartment =(id, obj) => {
return departmentRepo.updateDepartment (id, obj)
};


const deleteDepartment =(id) => {
    return  departmentRepo.deleteDepartment(id)
};

module.exports={
    getAllDepartments,
    getDepartmentById,
    addDepartment,
    updateDepartment,
    deleteDepartment}

