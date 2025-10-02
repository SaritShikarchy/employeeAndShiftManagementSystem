Factory Management System Final Project: REACT+ Node.js - Fullstack Application [1]
A complete system for managing employees, departments, and shifts in a factory. [1]
The project includes both Backend (Node.js + Express + MongoDB) and Frontend (REACT, HTML, CSS, JavaScript). [1]
Live Demo [1]

*   View Live Demo: https://employee-and-shift-management-syste.vercel.app/ [1]
    *   For example you can connect with: username: Antonette email: Shanna@melissa.tv [1]
*   Backend API hosted on Render: https://employeeandshiftmanagementsystem.onrender.com [1]

## Project Specification: https://employee-and-shift-management-syste.vercel.app/docs/Final-Project-EmployeeShiftManagementSystem.pdf [6]

## Credits [6]
Developed by Sarit Shikarchy Node.js + REACT- Final Project [6]

## Main Features [2]

*   **Authentication:** Only registered users can log in (validated via external API) [2]
    *   The users are listed here: https://jsonplaceholder.typicode.com/users [2]
*   **Employee Management:** [2]
    *   View all employees in the factory and their assigned shifts [2]
    *   Add employee [2]
    *   Update employee [2]
    *   Delete employee [2]
    *   Assign shift to employee [2]
*   **Department Management:** [2]
    *   View all departments in the factory and their assigned managers [2]
    *   Add department [2]
    *   Update department [2]
    *   Delete department [2]
    *   Assign employee to department [2]
*   **Shift Management:** [3]
    *   View all shifts in the factory [3]
    *   Add shift [3]
    *   Update shift [3]
    *   Assign employee to shift [3]
*   **User System:** [3]
    *   Each user has a limited number of actions per day [3, 4]
    *   When the limit is reached, the user is logged out until the next day and a prompt message is displayed [3, 4]

## Technologies [3]

*   **Backend:** Node.js, Express, MongoDB [3]
*   **Frontend:** REACT, HTML, CSS, JavaScript [3]
*   **Deployment:** Vercel (Frontend), Render (Backend) [3]

## Users [3]

*   Only pre-registered users are allowed to log in. [3]
    *   The users are listed here: https://jsonplaceholder.typicode.com/users [3]
*   Each user has a daily action limit. [4]
    *   The users and their limitations are detailed on `'server/data/usersActionsData.json'` [4]
*   When the limit is reached, the user is logged out until the next day and a prompt message is displayed [4]

## Installation & Running Locally [4]

*   Clone the repository: [4]
    ```bash
    Git clone https://github.com/your-username/factory-management.git
    ``` [4]
*   Install and run the Backend: [4]
    *   `cd server` [4]
    *   `npm install` [4]
    *   `npm start` [4]
*   Install and run the Frontend: [4]
    *   `cd client` [4]
    *   `npm install` [4]
    *   `npm run dev` [4]
*   Define allowed actions per user for a specific day [4]
    *   Each user has a several number of actions they can perform per day. [4]
    *   To Login with a specific user add a record for this user and current day at `'server/data/usersActionsData.json'` file. [4, 5]
    *   The record that should be added looks as follows: [5]

    ```json
    {
       "id": <user_id>,
       "maxActions": 5,
       "date": "<dd/mm/yyyy>",
       "actionAllowd": <numOfActionsUsedTodayForThisUser>
    }
    ``` [5]
    *   `<user_id>` is the user_id according to: https://jsonplaceholder.typicode.com/users [5]
    *   `<dd/mm/yyyy>` is the current date [5]
    *   `<actionAllowedForThisUser>` is the number of actions used so far today for this user, the value in this field must be lower than maxActions [5]

*   For Example you can add: [6]
    ```json
    {
       "id": 2,
       "maxActions": 500,
       "date": "18/09/2025",
       "actionAllowd": 0
    }
    ``` [6]

