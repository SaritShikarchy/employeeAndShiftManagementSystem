# Factory Management System

Final Project - Fullstack App (React + Node.js + MongoDB)

System for managing employees, departments, and shifts in a factory.  
Includes Backend (Node.js + Express + MongoDB) and Frontend (React, HTML, CSS, JavaScript).

---

## Demo

Live system: https://employee-and-shift-management-syste.vercel.app/  
(For testing you can use: username: Antonette, email: Shanna@melissa.tv)

API: https://employeeandshiftmanagementsystem.onrender.com

---

## Features

### Authentication
- Only predefined users can log in
- The users come from: https://jsonplaceholder.typicode.com/users

### Employees
- View all employees + their shifts
- Add employee
- Update employee
- Delete employee
- Assign employee to a shift

### Departments
- View departments + their managers
- Add department
- Update department
- Delete department
- Assign employee to a department

### Shifts
- View all factory shifts
- Add shift
- Update shift
- Assign employees to shifts

### Users
- Only pre-registered users are allowed to log in
- The users are listed here: https://jsonplaceholder.typicode.com/users
- Each user has a limited number of actions per day
- When the user exceeds the limit, the system logs him out until the next day and shows a message

Example of a user record:
```json
{
  "id": 2,
  "maxActions": 500,
  "date": "18/09/2025",
  "actionAllowd": 0
}


## Technologies
- Backend: Node.js, Express, MongoDB
- Frontend: REACT, HTML, CSS, JavaScript
- Deployment: Vercel (Frontend), Render (Backend)

## Installation & Running Locally
- Clone the repository: Git clone https://github.com/your-username/factory-management.git
- Install and run the Backend:

cd server
npm install
npm start
Install and run the Frontend:
cd client
npm install
npm run dev

- Define allowed actions per user for a specific day
- Each user has a several number of actions they can perform per day.
- To Login with a specific user add a record for this user and current day at 'server/data/usersActionsData.json' file.
- The record that should be added looks as follows:
```json
{
"id": <user_id>,
"maxActions": 5,
"date": "<dd/mm/yyyy>",
"actionAllowd": <numOfActionsUsedTodayForThisUser>
},

- <user_id> is the user_id according to: https://jsonplaceholder.typicode.com/users
- <dd/mm/yyyy> is the current date
- <actionAllowedForThisUser> is the number of actions used so far today for this user,the value in this field must be lower than "maxActions"
For Example you can add:
```json
{
"id": 2,
"maxActions": 500,
"date": "18/09/2025",
"actionAllowd": 0
}

## Project Specification:
https://employee-and-shift-management-syste.vercel.app/docs/Final-Project-EmployeeShiftManagementSystem.pdf

## Credits
Developed by Sarit Shikarchy Node.js + REACT- Final Project
