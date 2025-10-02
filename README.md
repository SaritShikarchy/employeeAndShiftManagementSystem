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
- Each user has a limited number of actions per day
- When the user exceeds the limit, the system logs him out and shows a message
- User details are saved in server/data/usersActionsData.json

Example of a user record:
```json
{
  "id": 2,
  "maxActions": 500,
  "date": "18/09/2025",
  "actionAllowd": 0
}
