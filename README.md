# [cite_start]Factory Management System [cite: 1]
## [cite_start]Final Project: REACT + Node.js - Fullstack Application [cite: 2]

[cite_start]A complete system for managing employees, departments, and shifts in a factory. [cite: 3]
[cite_start]The project includes both **Backend (Node.js + Express + MongoDB)** and **Frontend (REACT, HTML, CSS, JavaScript)**. [cite: 4]

---

## [cite_start]Live Demo [cite: 5]
* [cite_start]View Live Demo: [cite: 6]
    * [cite_start]**https://employee-and-shift-management-syste.vercel.app/** [cite: 7]
    * [cite_start]For example you can connect with: [cite: 8]
        * [cite_start]username: **Antonette** [cite: 9]
        * [cite_start]email: **Shanna@melissa.tv** [cite: 10]
* [cite_start]Backend API hosted on Render: [cite: 11]
    * [cite_start]**https://employeeandshiftmanagementsystem.onrender.com** [cite: 12]

---

## [cite_start]Main Features [cite: 13]
* [cite_start]**Authentication**: Only registered users can log in (validated via external API)[cite: 14].
    * [cite_start]The users are listed here: https://jsonplaceholder.typicode.com/users[cite: 15].
* [cite_start]**Employee Management**: [cite: 16]
    * [cite_start]View all employees in the factory and their assigned shifts [cite: 17]
    * [cite_start]Add employee [cite: 18]
    * [cite_start]Update employee [cite: 19]
    * [cite_start]Delete employee [cite: 20]
    * [cite_start]Assign shift to employee [cite: 21]
* [cite_start]**Department Management**: [cite: 22]
    * [cite_start]View all departments in the factory and their assigned managers [cite: 23]
    * [cite_start]Add department [cite: 25]
    * [cite_start]Update department [cite: 26]
    * [cite_start]Delete department [cite: 27]
    * [cite_start]Assign employee to department [cite: 28]
* [cite_start]**Shift Management**: [cite: 29]
    * [cite_start]View all shifts in the factory [cite: 30]
    * [cite_start]Add shift [cite: 31]
    * [cite_start]Update shift [cite: 32]
    * [cite_start]Assign employee to shift [cite: 33]
* [cite_start]**User System**: [cite: 34]
    * [cite_start]Each user has a limited number of actions per day[cite: 35].
    * [cite_start]When the limit is reached, the user is logged out until the next day and a prompt message is displayed[cite: 36, 45].

---

## [cite_start]Technologies [cite: 37]
* [cite_start]**Backend**: Node.js, Express, MongoDB [cite: 38]
* [cite_start]**Frontend**: REACT, HTML, CSS, JavaScript [cite: 39]
* [cite_start]**Deployment**: Vercel (Frontend), Render (Backend) [cite: 40]

---

## [cite_start]Users [cite: 41]
* [cite_start]Only pre-registered users are allowed to log in. [cite: 42]
    * [cite_start]The users are listed here: **https://jsonplaceholder.typicode.com/users**[cite: 43].
* [cite_start]Each user has a daily action limit. [cite: 44]
    * [cite_start]The users and their limitations are detailed on `'server/data/usersActionsData.json'`[cite: 45].

---

## [cite_start]Installation & Running Locally [cite: 46]
* [cite_start]**Clone the repository**: [cite: 47]
    ```bash
    [cite_start]Git clone [https://github.com/your-username/factory-management.git](https://github.com/your-username/factory-management.git) [cite: 48, 49]
    ```
* [cite_start]**Install and run the Backend**: [cite: 50]
    ```bash
    [cite_start]cd server [cite: 51]
    [cite_start]npm install [cite: 53]
    [cite_start]npm start [cite: 54]
    ```
* [cite_start]**Install and run the Frontend**: [cite: 55]
    ```bash
    [cite_start]cd client [cite: 56]
    [cite_start]npm install [cite: 57]
    [cite_start]npm run dev [cite: 58]
    ```
* [cite_start]**Define allowed actions per user for a specific day**: [cite: 59]
    * [cite_start]Each user has a several number of actions they can perform per day. [cite: 60]
    * [cite_start]To Login with a specific user add a record for this user and current day at `'server/data/usersActionsData.json'` file. [cite: 62]
    * [cite_start]The record that should be added looks as follows: [cite: 63]

    ```json
    {
        [cite_start]"id": <user_id>, [cite: 66]
        [cite_start]"maxActions": 5, [cite: 67]
        [cite_start]"date": "<dd/mm/yyyy>", [cite: 68]
        [cite_start]"actionAllowd": <numOfActions Used TodayForThisUser> [cite: 69]
    }
    ```

    * [cite_start]`<user_id>` is the user\_id according to: https://jsonplaceholder.typicode.com/users [cite: 70]
    * [cite_start]`<dd/mm/yyyy>` is the current date [cite: 71]
    * [cite_start]`<actionAllowedForThisUser>` is the number of actions used so far today for this user, the value in this field must be lower than `maxActions`[cite: 72, 73].

    * [cite_start]**For Example** you can add: [cite: 74]

    ```json
    {
        [cite_start]"id": 2, [cite: 77]
        [cite_start]"maxActions": 500, [cite: 78]
        [cite_start]"date": "18/09/2025", [cite: 79]
        [cite_start]"actionAllowd": 0 [cite: 80]
    }
    ```

---

## Project Specification:
* [cite_start]**https://employee-and-shift-management-syste.vercel.app/docs/Final-Project-EmployeeShiftManagementSystem.pdf** [cite: 82, 83]

---

## [cite_start]Credits [cite: 84]
* [cite_start]Developed by **Sarit Shikarchy** [cite: 85]
* [cite_start]Node.js + REACT - Final Project [cite: 86]
