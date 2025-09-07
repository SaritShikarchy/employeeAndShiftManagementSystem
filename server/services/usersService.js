const userRepo= require ('../repositories/usersRepo')

const getAllUsers =(filters) => {
    return userRepo.getAllUsers(filters);
};

const getUserById =(id) => {
    return userRepo.getUserById(id)
};

const addUser =(obj) => {
    return userRepo.addUser(obj)

};

const updateUser =(id, obj) => {
return userRepo.updateUser (id, obj)
};


const deleteUser =(id) => {
    return  userRepo.deleteUser(id)
};

module.exports={
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser}

