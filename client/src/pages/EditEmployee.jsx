import {Container,Grid,Stack, Typography,Link,Paper,Box,TextField,MenuItem,Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useState,  useEffect  } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
//the below import is required in order to recieved the data from {state}
import { useLocation } from 'react-router-dom';
import Employees from './Employees';
import { Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material';
import { toDateInputValue,  todayISO } from '../utils/dateUtils';
import { actionsAllowedClientUtils } from '../utils/actionsAllowedClientUtils';
import { actionHandlerUtils } from '../utils/actionHandlerUtils';
//for saving the user
import { useMemo } from 'react';

const EMPLOYEES_URL='http://localhost:5000/employees'
const DEPARTMENT_URL='http://localhost:5000/departments'
const EMPLOYEES_SHIFTS_URL='http://localhost:5000/employeesShifts'
const SHIFTS_URL= 'http://localhost:5000/shifts'


const EditEmployee = () => {
const [employee, setEmployee] = useState({firstName: '',  lastName: '',  startWorkYear: '' , departmentId:''});
const [departments, setDepartments] = useState([]);
const [employeesShifts, setEmployeesShifts] = useState([]);
const [employeesShift, setEmployeesShift] = useState({employeeId:'',shiftId:'' });
const [shifts, setShifts] = useState([]);

//means that the id is taken from the page's page
const { id } = useParams();
const navigate = useNavigate();

//location is used to recieved the object that is sent from {state}
const location = useLocation();
//in case there is an user on location.state then save it on 'user'
const userSaved = location.state?.user;
const user =useMemo (()=> {
  if (userSaved) return userSaved;
  try{
      return JSON.parse (localStorage.getItem('user'))
  }
  catch {
    return null;
  }
}, [userSaved])


useEffect(() => {
  getAllShifts()
  getAllemployeesShifts()
  getAllDepartments()
  if (id) {
    getEmployeeById();
  } else {
    console.warn("Missing ID in URL");
  }
  }, []);



const getEmployeeById =async()=>{
  const {data} =await axios.get(`${EMPLOYEES_URL}/${id}`)
  setEmployee (data)
  }

const getAllemployeesShifts =async()=>{
  const {data} =await axios.get(EMPLOYEES_SHIFTS_URL)
  setEmployeesShifts (data)
  }

const getAllDepartments = async() =>{
  const {data}=  await axios.get (DEPARTMENT_URL)
  setDepartments (data)
  }

const getAllShifts = async() =>{
  const {data}=  await axios.get (SHIFTS_URL)
  setShifts(data)
  }

const updateEmployee= async() =>{
    const obj=employee
    await axios.put(`${EMPLOYEES_URL}/${id}`, obj)
    alert (`${employee.firstName} was updated`)
    navigate ('/employees', { state: { user: user } });
   }

const deleteEmployee= async() =>{
  await axios.delete(`${EMPLOYEES_URL}/${id}`)
  await axios.delete(`${EMPLOYEES_SHIFTS_URL}/emp/${id}`);
  navigate ('/employees', { state: { user: user } });
  }

const associateShiftToEmployee= async() =>{
  await axios.post(EMPLOYEES_SHIFTS_URL,employeesShift)
   navigate ('/employees', { state: { user: user } });
  alert (`The new shift was added to ${employee.firstName}${employee.lastName} `)
  }

const filteredEmployeesShift= employeesShifts.filter ((empShift) => (employee._id === empShift.employeeId))
//employeeShiftIds includes all shiftId of the specipic employee
const employeeShiftIds = new Set(filteredEmployeesShift.map(filterEmpShipt => String(filterEmpShipt.shiftId)));
//shiftsPerEmployee includes all the shifts that related to the specipic employee
const shiftsPerEmployee = shifts.filter(shift => employeeShiftIds.has(String(shift._id)));


const onUpdate = async () => {
  const userId = typeof user === 'string'
    ? user
    : user?.id ?? user?._id ?? user?.userId;

  if (!userId) {
    alert('Please reconnect to system');
    navigate('/', { replace: true });
    return;
  }

  console.log (userId)
  const res= await actionsAllowedClientUtils(userId);
 //res includes {ok: false} or {ok: true}
  if (!actionHandlerUtils(res, navigate)) return;
  await updateEmployee();
};


return (
    <>

  {/* will use 'Segoe UI' , in case it won't be regocnize then use 'sans-serif' */}
  <Container maxWidth="md" sx={{ fontFamily: 'Segoe UI, sans-serif', mt: 4 }}>
       
    <Grid direction="row" container justifyContent='space-between' sx={{mt:1}} alignItems="center">
        <Grid item>
          <Typography sx={{ fontWeight: 'bold', color: 'primary.main'}} > {user? `Hi ${user.name}`:'Hi Guest'}</Typography>
          <Link component={RouterLink} to="/">Log-Out</Link>                 
        </Grid>

        <Grid item>
          <Stack direction="column" spacing={1}>
            <Link component={RouterLink}   to="/employees"  state={{ user: user }}>Employees page</Link>
            <Link component={RouterLink} to="/departments">Departments Page</Link>
            <Link component={RouterLink} to="/shifts">Shifts Page</Link>  
          </Stack>
        </Grid> 
    </Grid>

    <Typography variant="h4" align="center"  sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4, mt:6 }}>Edit Employee</Typography>
    <Paper elevation={4} sx={{ padding: 3, bgcolor: '#f5f5f5' }}>
    

      <Box sx={{ width: 250, maxWidth: '100%', mx: 'auto', mt: 2 }}>
  <Stack spacing={2}>
    <TextField label="First Name" variant="filled" fullWidth value={employee.firstName}
        onChange={(e) =>setEmployee({ ...employee, firstName: e.target.value })}></TextField><br/>

    <TextField label="Last Name" variant="filled" fullWidth value={employee.lastName}
        onChange={(e) =>setEmployee({ ...employee, lastName: e.target.value })}></TextField><br/>

    <TextField
      label="Start Work Year"
    
      variant="filled"
      fullWidth
      //slotProps- in order not to hide the header in this textBox
      slotProps={{ inputLabel: { shrink: true } }}
        value= {employee?.startWorkYear}
        onChange ={(e) => setEmployee ({...employee, startWorkYear:e.target.value})}>
        </TextField><br/>

    <TextField
      select
      label="Department ID"
      variant="filled"
      fullWidth
      //for value I added ?? to prevent undefined
    value= {employee.departmentId ?? ''} onChange ={(e) =>setEmployee ({...employee, departmentId:e.target.value}) } >
      <MenuItem value="">No department is selected</MenuItem>
            {departments.map((dep) => (
              <MenuItem key={dep._id} value={dep._id}>{dep.name}</MenuItem>
            ))}
        </TextField>
      {/* </MenuItem> */}
   {/* </TextField> */}
  </Stack> 
</Box>
                    
      <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
        <Grid item>
           {/* actionsAllowedClientUtils checks if the user has actions allowed, in case yes it decrease the 'actionsAllowed' value */}
           {/* two functions on 'onClick' must be defined with arrow function */}
          <Button  sx={{ width: '100px'}} variant="contained" onClick= {onUpdate}>Update</Button>
        </Grid>
        <Grid item>
          <Button sx={{  width: '100px'}}  variant="contained" onClick= {deleteEmployee}>Delete</Button>  
        </Grid>         
      </Grid>
    </Paper>

    <Typography variant="h4" align="center"  sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4, mt:6 }}>{employee.firstName} {employee.lastName}'s Shifts</Typography>
    <Paper elevation={4} sx={{ padding: 3, bgcolor: '#f5f5f5' }}>
        <Table>
          <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Start Hour</TableCell>
                <TableCell>End Hour</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
              {shiftsPerEmployee.map((shift) =>{
              return  <TableRow key={shift._id}>
                  {/* <TableCell>{new Date(shift.date).toLocaleDateString('he-IL')}</TableCell>  */}
                   <TableCell>{toDateInputValue(shift.date)}</TableCell> 
                  
                  <TableCell>{shift.startingHour}</TableCell>
                  <TableCell>{shift.endingHour}</TableCell>
              </TableRow>         
                  })}
          </TableBody>
        </Table>
    </Paper>

    <Typography variant="h4" align="center"  sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4, mt:6 }}>Associate a new Shift</Typography>
      <Paper elevation={4} sx={{ padding: 3, bgcolor: '#f5f5f5' }}>
          <TextField select  sx={{  align:"center", mx: 'auto', mt: 2, mb: 2, width: '220px', ml:31}} id="filled-select-shift"
           variant="filled" value={employeesShift.shiftId} onChange ={(e) =>setEmployeesShift ({...employeesShift, employeeId:employee._id,  shiftId: e.target.value}) } >
           <MenuItem value="">No Shift was selected</MenuItem>
           {shifts.map((shift) => (
          <MenuItem key={shift._id} value={shift._id}>{new Date(shift.date).toLocaleDateString('he-IL')}  {shift.startingHour}-{shift.endingHour}</MenuItem>
          ))}
          </TextField>   
         
          <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
            <Grid item>
              <Button  sx={{ width: '100px'}} variant="contained" onClick={associateShiftToEmployee}>Add</Button>
            </Grid>
          </Grid>

  </Paper>                  
</Container>  
         
<br/>
  </>
  );
};
export default EditEmployee;