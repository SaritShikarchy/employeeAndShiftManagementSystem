const express = require('express')
const cors= require ('cors')
const connectDB= require ('./config/db')
//on employeesRouter we have the employees router that was defined
const employeesRouter = require ('./routers/employeesRouter')
const departmentsRouter = require ('./routers/departmentsRouter')
const usersRouter = require ('./routers/usersRouter')
const shiftsRouter = require ('./routers/shiftsRouter')
const employeesShiftsRouter = require ('./routers/employeesShiftsRouter')
const usersActionsRouter = require ('./routers/usersActionsRouter')

const app = express()
//process.env.PORT was added in order to use live demo
//process.env.PORT is a port which is created by Render, and the server listen to it
const PORT = process.env.PORT || 5000

const corsOptions = {origin: 'https://employee-and-shift-management-syste.vercel.app'};

// Use the cors middleware with the new options
app.use(cors(corsOptions));
//Middelwares
app.use(express.json())

//this is Middleware, means that adress with http:/localhost/employees will be moved to employeesRouter
app.use('/employees', employeesRouter)
app.use('/departments', departmentsRouter)
app.use('/users', usersRouter)
app.use('/shifts', shiftsRouter)
app.use('/employeesShifts', employeesShiftsRouter)
app.use('/userAction', usersActionsRouter)

app.listen (PORT, () => {
    console.log (`App is listening on port: ${PORT}`)
    connectDB();
});
