# Factory Management System

## Final Project: REACT+ Node.js - Fullstack Application

A complete system for managing employees, departments, and shifts in a factory.

The project includes both Backend (Node.js + Express + MongoDB) and Frontend (REACT, HTML, CSS, JavaScript).

---

## Live Demo

• View Live Demo:
    https://employee-and-shift-management-syste.vercel.app/
    For example you can connect with:
    username: Antonette
    email: Shanna@melissa.tv

• Backend API hosted on Render:
    https://employeeandshiftmanagementsystem.onrender.com

---

## Main Features

• Authentication: Only registered users can log in (validated via external API)
  The users are listed here: https://jsonplaceholder.typicode.com/users

• Employee Management:
    o View all employees in the factory and their assigned shifts
    o Add employee
    o Update employee
    o Delete employee
    o Assign shift to employee

• Department Management:
    o View all departments in the factory and their assigned managers
    o Add department
    o Update department
    o Delete department
    o Assign employee to department

• Shift Management:
    o View all shifts in the factory
    o Add shift
    o Update shift
    o Assign employee to shift

• User System:
    o Each user has a limited number of actions per day
    o When the limit is reached, the user is logged out until the next day and a prompt message is displayed

---

## Technologies

• Backend: Node.js, Express, MongoDB
• Frontend: REACT, HTML, CSS, JavaScript
• Deployment: Vercel (Frontend), Render (Backend)

---

## Users

• Only pre-registered users are allowed to log in.
    The users are listed here: https://jsonplaceholder.typicode.com/users

• Each user has a daily action limit.
  The users and their limitations are detailed on 'server/data/usersActionsData.json'

• When the limit is reached, the user is logged out until the next day and a prompt message is displayed

---

## Installation & Running Locally

• Clone the repository:
      Git clone https://github.com/your-username/factory-management.git

• Install and run the Backend:
    o cd server
    o npm install
    o npm start

• Install and run the Frontend:
    o cd client
    o npm install
    o npm run dev

• Define allowed actions per user for a specific day
    o Each user has a several number of actions they can perform per day.
    o To Login with a specific user add a record for this user and current day at
      'server/data/usersActionsData.json' file.

The record that should be added looks as follows:
   {
      "id": <user_id>,
      "maxActions": 5,
      "date": "<dd/mm/yyyy>",
      "actionAllowd": <numOfActionsUsedTodayForThisUser>
    },

<user_id> is the user_id according to: https://jsonplaceholder.typicode.com/users

<dd/mm/yyyy> is the current date
<actionAllowedForThisUser> is the number of actions used so far today for this user,
 the value in this field must be lower than maxActions

For Example you can add:
{
      "id": 2,
      "maxActions": 500,
      "date": "18/09/2025",
      "actionAllowd": 0
  }

---

## Project Specification:
https://employee-and-shift-management-syste.vercel.app/docs/Final-Project-EmployeeShiftManagementSystem.pdf

---

## Credits

Developed by Sarit Shikarchy
Node.js + REACT- Final Project
