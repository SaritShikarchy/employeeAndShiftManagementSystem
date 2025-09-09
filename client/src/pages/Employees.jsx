import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
//the below import is required in order to recieved the data from {state}
import { useLocation, useNavigate } from 'react-router-dom';
import { Stack, TextField, Grid, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Container, Link, Button} from '@mui/material';

//const EMPLOYEES_URL = 'http://localhost:5000/employees';
const EMPLOYEES_URL = `${import.meta.env.VITE_BACKEND_URL}/employees`;
const DEPARTMENT_URL = `${import.meta.env.VITE_BACKEND_URL}/departments`;
const EMPLOYEES_SHIFTS_URL = `${import.meta.env.VITE_BACKEND_URL}/employeesShifts`;
const SHIFTS_URL = `${import.meta.env.VITE_BACKEND_URL}/shifts`;

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employeeShifts, setEmployeeShifts] = useState([]);
  const [shifts, setShifts] = useState([]);

  //filtered amployees according department
  const [selectedDept, setSelectedDept] = useState(""); 
  //location is used to recieved the object that is sent from {state}
  const location = useLocation();
  //in case there is a user on location.state then use it, otherwise take the user from localStorage
  const userSaved = location.state?.user;
  const user =useMemo (()=> {
        if (userSaved) return userSaved;
        try{return JSON.parse (localStorage.getItem('user'))}
        catch {return null;}
  }, [userSaved])
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployees();
    getAllDepartments();
    getAllEmployeesShifts();
    getAllShifts();
  }, []);

  const getAllEmployees = async () => {
    const { data } = await axios.get(EMPLOYEES_URL);
    setEmployees(data);
  };

  const getAllDepartments = async () => {
    const { data } = await axios.get(DEPARTMENT_URL);
    setDepartments(data);
  };

  const getAllEmployeesShifts = async () => {
    const { data } = await axios.get(EMPLOYEES_SHIFTS_URL);
    setEmployeeShifts(data);
  };

  const getAllShifts = async () => {
    const { data } = await axios.get(SHIFTS_URL);
    setShifts(data);
  };

  const createNewEmployee=() =>{
    navigate ('/NewEmployee', {state:{user:user}})
   }

  const employeesToShow = selectedDept
    ? employees.filter(e => String(e.departmentId) === String(selectedDept))
    : employees;

  return (    
     // will use 'Segoe UI' , in case it won't be regocnize then use 'sans-serif'
    <Container maxWidth="md" sx={{ fontFamily: 'Segoe UI, sans-serif', mt: 4 }}>    
      <Grid direction="row" container justifyContent='space-between' sx={{mt:1}} alignItems="center">
        <Grid item>
          <Typography sx={{ fontWeight: 'bold', color: 'primary.main'}} > {user? `Hi ${user.name}`:'Hi Guest'}</Typography>
          <Link component={RouterLink} to="/">Log-Out</Link>                
        </Grid>                  

        <Grid item>
          <Stack direction="column" spacing={1}>                
            <Link component={RouterLink} to="/departments">Departments Page</Link>
            <Link component={RouterLink} to="/shifts">Shifts Page</Link>  
          </Stack>
        </Grid>    
      </Grid>

      <Typography variant="h4" align="center"  sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4, mt:6 }}>Employees List</Typography>
      <Paper elevation={4} sx={{ padding: 3, bgcolor: '#f5f5f5' }}>   
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Full Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Department</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Shifts</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {employeesToShow.map((emp) => {
              const departmentForEmp = departments.find(dep => dep._id === emp.departmentId);
              const shiftsIDPerEmployee = employeeShifts.filter(es => es.employeeId === emp._id);
              const shiftIDs = shiftsIDPerEmployee.map(shift => shift.shiftId);
              const shiftsPerEmployee = shifts.filter(shift => shiftIDs.includes(shift._id));

              return (
                //hover means that once going over the row it will be colored by default
                <TableRow key={emp._id} hover>
                  <TableCell>
                    <Link
                      component={RouterLink}
                      to={`/editEmployee/${emp._id}`}
                      //moving location.state to 'editEmployee' component
                      state={{user}}
                      //only when going over the emp_name an underline will be added 
                      sx={{ color: 'black', fontWeight: 'bold', textDecoration: 'none', '&:hover': { textDecoration: 'underline', color: 'blue' } }}>
                      {emp.firstName} {emp.lastName}
                    </Link>
                  </TableCell>

                  {/* if department is defined for employee the displaye departmentName , otherwise N/A */}
                  <TableCell>
                     {departmentForEmp ?
                          (<Link
                            component={RouterLink}
                            to={`/editDepartment/${departmentForEmp._id}`}
                            state={{user, departmentForEmp}}
                            //only when going over the emp_name an underline will be added 
                            sx={{ color: 'black', fontWeight: 'bold', textDecoration: 'none', '&:hover': { textDecoration: 'underline', color: 'blue' } }}>
                          {departmentForEmp.name}
                          </Link>)
                          :('N/A')}
                    </TableCell>
                    
                  <TableCell>
                    <ul style={{ margin: 0}} >
                      {shiftsPerEmployee.map((shift) => (
                        <li key={shift._id}>
                          {new Date(shift.date).toLocaleDateString('he-IL')} {shift.startingHour} - {shift.endingHour}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
          <Grid item>
              <Button  sx={{ mt:5 , width: '400px'}} variant="contained" onClick={createNewEmployee}>Add a new Employee</Button>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h4" align="center"  sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4, mt:6 }}>Filter By Department</Typography>
      <Paper elevation={4} sx={{ padding: 3, bgcolor: '#f5f5f5' }}>
          <TextField select 
          slotProps={{ select: { native: true } }}  sx={{  align:"center", mx: 'auto', mt: 2, mb: 2, width: '220px', ml:31}} id="filled-select-department"
          variant="filled"  value= {selectedDept}  onChange={(e) => setSelectedDept(e.target.value)}>
          {/* when selecting 'All departments' then no filter will be done */}
           <option value="">All departments</option>
           {departments.map(dep => (<option key={dep._id} value={dep._id}>{dep.name}</option> ))}
          </TextField>
      </Paper>
    </Container>
  );
};

export default Employees;
