const mongoose = require('mongoose');

const connectDB= () => {
    mongoose
    .connect('mongodb://localhost:27017/employeesDB')
    .then(() => console.log ('Connected to employeesDB'))
    .catch (console.log)
}

module.exports= connectDB;