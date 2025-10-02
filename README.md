# Factory Management System

Final Project - Fullstack App (React + Node.js + MongoDB)

מערכת לניהול עובדים, מחלקות ומשמרות במפעל.  
כוללת צד שרת (Node.js + Express + MongoDB) וצד לקוח (React, HTML, CSS, JavaScript).

---

## Demo

מערכת חיה: https://employee-and-shift-management-syste.vercel.app/  
(לצורך בדיקה ניתן להשתמש בנתוני משתמש לדוגמה: username: Antonette, email: Shanna@melissa.tv)

API: https://employeeandshiftmanagementsystem.onrender.com

---

## Features

### Authentication
- רק משתמשים שהוגדרו מראש יכולים להתחבר
- המשתמשים מגיעים ממערכת חיצונית: https://jsonplaceholder.typicode.com/users

### Employees
- צפייה בכל העובדים + המשמרות שלהם
- הוספת עובד
- עדכון פרטי עובד
- מחיקת עובד
- שיבוץ עובד למשמרת

### Departments
- צפייה במחלקות + המנהלים שלהן
- הוספת מחלקה
- עדכון מחלקה
- מחיקת מחלקה
- שיבוץ עובד למחלקה

### Shifts
- צפייה במשמרות במפעל
- הוספת משמרת
- עדכון משמרת
- שיבוץ עובדים למשמרת

### Users
- לכל משתמש יש מספר פעולות מוגבל ליום
- כאשר המשתמש חורג מהמגבלה – המערכת מנתקת אותו ומציגה הודעה
- פרטי המשתמשים נשמרים ב־server/data/usersActionsData.json

דוגמה לרשומת משתמש:
```json
{
  "id": 2,
  "maxActions": 500,
  "date": "18/09/2025",
  "actionAllowd": 0
}
