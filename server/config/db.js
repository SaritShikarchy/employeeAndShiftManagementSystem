const mongoose = require('mongoose');

const mongodbUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/employeesDB';

function connectDB() {
  return mongoose
    .connect(mongodbUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      throw err;
    });
}

module.exports= connectDB;