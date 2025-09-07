
import axios from 'axios';
import { useState,  useEffect  } from 'react';
import {Link} from 'react-router'

const EMPLOYEES_URL='http://localhost:5000/employees'
const DEPARTMENT_URL='http://localhost:5000/departments'
const EMPLOYEES_SHIFTS_URL='http://localhost:5000/employeesShifts'
const SHIFTS_URL='http://localhost:5000/shifts'

const Employees = () => {
      const [employees, setEmployees] = useState([]);
      const [departments, setDepartments] = useState([]);
      const [employeeShifts, setEmployeeShifts] = useState([]);
      const [shifts, setShifts] = useState([]);
    
    
    
    
       useEffect(() => {
        getAllEmployees();
        getAllDepartments();
        getAllEmployeesShifts();
        getAllShifts();
    
      }, []);
    
    
    const getAllEmployees =async()=>{
      const {data} =await axios.get(EMPLOYEES_URL)
      setEmployees (data)
    }
    
    const getAllDepartments =async()=>{
      const {data} =await axios.get(DEPARTMENT_URL)
      setDepartments (data)
    }
    
    const getAllEmployeesShifts =async()=>{
      const {data} =await axios.get(EMPLOYEES_SHIFTS_URL)
      setEmployeeShifts (data)
    }
    
    const getAllShifts =async()=>{
      const {data} =await axios.get(SHIFTS_URL)
      setShifts (data)
    }
    


  return (
    <>

       <table border="1">
          <thead>
          <tr>
              <th>FullName</th>
              <th>Department</th>
              <th>shifts</th>
         </tr>
         </thead>
        <tbody>
        {
          employees.map((emp)=> {
            const departmentForEmp= departments.find((dep)=> dep._id === emp.departmentId )

            //shiftsIDPerEmployee- array which includes only the employee's shifts (employee ID & Shift ID)
            const shiftsIDPerEmployee= employeeShifts.filter((empShift) => empShift.employeeId === emp._id)

            const shiftIDs= shiftsIDPerEmployee.map ((shift)=> shift.shiftId)
            //shiftsPerEmployee- array which includes all data per shifts that relevant to employee, 
            //includes is needed to get only the shifts that are existing in 'shifts' table
            //means, I want to have in shiftIDsPerEmployee only details for shifts that there ids includes in shiftsPerEmployee
            const shiftsPerEmployee= shifts.filter((shift) => shiftIDs.includes (shift._id) )


            return (
              <tr key={emp._id}> 
             {/* commas must be Template literal otherwise they won't be replaced to real data, for example emp._id */}
              <td><Link to={`/editEmployee/${emp._id}`}>{emp.firstName} {emp.lastName}</Link> </td>
              <td>{departmentForEmp ? departmentForEmp.name : "N/A" }</td>
              <td>
                <ul>
                  {shiftsPerEmployee.map((shift)=>(
                 // <li key={shift._id}>{shift.date}</li>
                 
                 //new Date(shift.date) – creates a real JavaScript Date object from the value
                 //.toLocaleString(...) – formats the date into a readable string.
                 //'he-IL' – sets the locale to Israel, so the date appears in DD/MM/YYYY format and 24-hour clock.
                 //dateStyle: 'short' – shows the short version of the date (e.g., 25.6.2025).
                 //timeStyle: 'short' – shows just the hours and minutes (e.g., 14:30).

                  <li key={shift._id}>
                    {new Date(shift.date).toLocaleString('he-IL', {
                      dateStyle: 'short',
                      timeStyle: 'short'
                    })}
                  </li>
                   
                  ))


                  }
                </ul>
              </td>           
              </tr>
            )
            })                
          }
                    
          
        
       </tbody>
        </table>


    </>
  );
};
export default Employees;


