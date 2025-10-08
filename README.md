
# Factory Management System

**Final Project: REACT + Node.js - Fullstack Application**
A complete system for managing employees, departments, and shifts in a factory.
The project includes both Backend (Node.js + Express + MongoDB) and Frontend (REACT, HTML, CSS, JavaScript).


## Live Demo
- View Live Demo:
  [https://employee-and-shift-management-syste.vercel.app/](https://employee-and-shift-management-syste.vercel.app/)
  For example you can connect with:
  - username: Antonette
  - email: Shanna@melissa.tv
- Backend API hosted on Render:
  [https://employeeandshiftmanagementsystem.onrender.com](https://employeeandshiftmanagementsystem.onrender.com)


## Main Features
- **Authentication:** Only registered users can log in (validated via external API).  
  The users are listed here: [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)
- **Employee Management:**
  - View all employees in the factory and their assigned shifts
  - Add employee
  - Update employee
  - Delete employee
  - Assign shift to employee
- **Department Management:**
  - View all departments in the factory and their assigned managers
  - Add department
  - Update department
  - Delete department
  - Assign employee to department
- **Shift Management:**
  - View all shifts in the factory
  - Add shift
  - Update shift
  - Assign employee to shift
- **User System:**
  - Each user has a limited number of actions per day
  - When the limit is reached, the user is logged out until the next day and a prompt message is displayed

## Technologies
- **Backend:** Node.js, Express, MongoDB
- **Frontend:** REACT, HTML, CSS, JavaScript
- **Deployment:** Vercel (Frontend), Render (Backend)

## Users
- Only pre-registered users are allowed to log in.
  The users are listed here: [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)
- Each user has a daily action limit.
  The users and their limitations are detailed in `server/data/usersActionsData.json`.
- When the limit is reached, the user is logged out until the next day and a prompt message is displayed.

## Installation & Running Locally
- Clone the repository:
git clone https://github.com/your-username/factory-management.git
- Install and run the Backend:  
  cd server  
  npm install  
  npm start
- Install and run the Frontend:  
cd client  
npm install  
npm run dev  
- Define allowed actions per user for a specific day:
  - Each user has a number of actions they can perform per day.
  - To login with a specific user add a record for this user and current day in server/data/usersActionsData.json file.

The record that should be added looks as follows:  
{  
"id": <user_id>,  
"maxActions": 5,  
"date": "<dd/mm/yyyy>",  
"actionAllowd": <numOfActionsUsedTodayForThisUser>  
}  
  
  - <user_id> is the user_id according to: https://jsonplaceholder.typicode.com/users  
  - <dd/mm/yyyy> is the current date
  - ActionAllowedForThisUser is the number of actions used so far today for this user, the value must be lower than maxActions.

For Example you can add:  
{  
"id": 2,  
"maxActions": 500,  
"date": "18/09/2025",  
"actionAllowd": 0  
}  


## Project Specification:  
https://employee-and-shift-management-syste.vercel.app/docs/Final-Project-EmployeeShiftManagementSystem.pdf


## Credits
Developed by Sarit Shikarchy  
Node.js + REACT - Final Project






