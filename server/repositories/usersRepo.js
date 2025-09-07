const User= require('../model/userModel')

const getAllUsers =(filters) => {
    return User.find(filters)
};

const getUserById =(id) => {
    return User.findById(id)
};

//post
const addUser =(obj) => {
    return User.create(obj)

};

const updateUser =(id, obj) => {
return User.findByIdAndUpdate (id, obj)
};


const deleteUser =(id) => {
    return  User.findByIdAndDelete(id)
};

module.exports={
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser}

