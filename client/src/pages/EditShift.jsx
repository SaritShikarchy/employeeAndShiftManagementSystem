import {Container,Grid,Stack, Typography,Link,Paper,Box,TextField,MenuItem,Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useState,  useEffect  } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
//the below import is required in order to recieved the data from {state}
import { useLocation } from 'react-router-dom';
import Employees from './Employees';
import CalendarToday from "@mui/icons-material/CalendarToday";
import {  InputAdornment, IconButton } from "@mui/material";
import { toDateInputValue,  todayISO } from '../utils/dateUtils';
import { actionsAllowedClientUtils } from '../utils/actionsAllowedClientUtils';
//import {handleActionUtils } from '../utils/handleActionUtils';
import { useMemo } from 'react';

const EMPLOYEES_URL='http://localhost:5000/employees'
const SHIFTS_URL='http://localhost:5000/shifts'
const EMPLOYEES_SHIFTS_URL='http://localhost:5000/employeesShifts'

const EditShift = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedShiftId, setSelectedShiftId] = useState('');
  const [currentShift, setCurrentShift] = useState({date: '',  startingHour: '', endingHour:''});
  const [selectedShift, setSelectedShift] = useState({date: todayISO() ,  startingHour: '', endingHour:''});
  const [updatedShift, setUpdatedShift] = useState({date: '',  startingHour: '', endingHour:''});
  const [shifts, setShifts] = useState([]);
  const [currentEmployToUpdateShift, setCurrentEmployToUpdateShift] = useState({ employeeId:'', shiftId:''});

  //means that the id is the departement id which taken from the page's params
  const { id } = useParams();
  const navigate = useNavigate();

  //location is used to recieved the object that is sent from {state}
  const location = useLocation();
  //in case there is an user on location.state then save it on 'user'
  //const department = location.state?.department;
  
   //in case there is a user on location.state then use it, otherwise take the user from localStorage
const userSaved = location.state?.user;
const user =useMemo (()=> {
  if (userSaved) return userSaved;
  try{return JSON.parse (localStorage.getItem('user'))}
  catch {return null;}
}, [userSaved])

  useEffect(() => {
  getAllEmployees()
  getAllShifts()
  findShiftById()
}, []);

  const getAllEmployees = async() =>{
    const {data}=  await axios.get (EMPLOYEES_URL)
    setEmployees (data)
  }

  const getAllShifts = async() =>{
    const {data}=  await axios.get (SHIFTS_URL)
    setShifts (data)
  }

  // performs when clicking on 'update' a shift
  const updateShift= async() =>{
    try{
        const obj=selectedShift
        await axios.put(`${SHIFTS_URL}/${id}`, obj)
        alert (`The Shift on: ${new Date(selectedShift.date).toLocaleDateString('he-IL')} was updated`)
        navigate ('/shifts', { state: { user: user } });
      }     
      catch (error) {
          console.log ('error updating shift:', error);
      }    
   }

  const addShift = (e) =>{
      e?.preventDefault?.(); 
      navigate ('/newShift', { state: { user: user } });
  }
   
  const updateEmployeeShift= async() =>{
      try{
           await axios.post(EMPLOYEES_SHIFTS_URL, currentEmployToUpdateShift)
           alert (`The Employee was associated to the Shift`)
           navigate ('/shifts', { state: { user: user } });
           }   
      catch (error) {
          console.log('error updating the shift', error)
      }
  }
   
  const findShiftById= async() =>{
      if (!id) return;
      try{
           const {data}= await axios.get(`${SHIFTS_URL}/${id}`)
           setSelectedShift (data)
           console.log (data)
           }   
      catch (error) {
          console.log('error pulling the shift by id', error)
      }
  }
    
  return (
    <>
    {/* will use 'Segoe UI' , in case it won't be regocnize then use 'sans-serif' */}
    
    {/* links at the top of the page */}
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
   
      {/* header with the shift that user want to update */}
      <Typography variant="h4" align="center"  sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4, mt:6 }}>Edit Shift</Typography>
      <Paper elevation={4} sx={{ padding: 3, bgcolor: '#f5f5f5' }}>
      <Box component="form"  justifyContent="center" mt={2} mb={2}>
             <Typography variant="h6" align="center"  sx={{ fontWeight: 'bold', color: 'black', mb: 4, mt:6 }}>Update The Shift at {new Date(selectedShift.date).toLocaleDateString('he-IL')} </Typography>
                
              <TextField  label="Shift's Starting Hour" sx={{  align:"center", mx: 'auto', mt: 2, mb: 2, width: '220px', ml:31}} id="filled-startingHour"
                   variant="filled"  value= {selectedShift.startingHour}  
                   onChange ={(e) =>setSelectedShift ({...selectedShift, startingHour:e.target.value}) } >
                  
              </TextField>
              <TextField  label="Shift's Ending Hour" sx={{  align:"center", mx: 'auto', mt: 2, mb: 2, width: '220px', ml:31}} id="filled-endingHour"
                   variant="filled"  value= {selectedShift.endingHour}  
                   onChange ={(e) =>setSelectedShift ({...selectedShift, endingHour:e.target.value}) } >   
              </TextField>

              <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
                    <Button  sx={{ width: '100px'}} variant="contained" onClick={updateShift}>Update</Button>      
              </Grid>
        
             <Typography variant="h6" align="center"  sx={{ fontWeight: 'bold', color: 'black', mb: 4, mt:6 }}>Associate employee to the shift at {new Date(selectedShift.date).toLocaleDateString('he-IL')}</Typography>

             <TextField select label="Employee to associate to this shift:" sx={{  align:"center", mx: 'auto', mt: 2, mb: 2, width: '300px', ml:31}} id="filled-select-employee-shift"
              variant="filled"   value= {currentEmployToUpdateShift.employeeId} 
      
              onChange={(e) => {
                           const selectedEmployee = employees.find(emp => emp._id === e.target.value);
                          if (selectedEmployee) {
                            setCurrentEmployToUpdateShift({
                              employeeId: selectedEmployee._id, //saving the employee ID
                              shiftId: selectedShift._id
                              });
                              const userId = typeof user === 'string' ? user: user?.id ?? user?._id ?? user?.userId;

                              if (!userId) {
                                alert('Please reconnect to system');
                                navigate('/', { replace: true });
                                return;
                              }
                              //actionsAllowedClientUtils checks if the user has actions allowed, in case yes it decrease the 'actionsAllowed' value
                              actionsAllowedClientUtils(userId)
                          }
                       }}>

             {/* Option for no selection */}
            <MenuItem value="">Select Employee</MenuItem>
            {employees.map((emp) => (
           <MenuItem key={emp._id} value={emp._id}>{emp.firstName} {emp.lastName}</MenuItem>
            ))} 
          </TextField>

          <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
            <Grid item>
                <Button  sx={{ width: '100px'}} variant="contained" onClick={updateEmployeeShift}>Add</Button>
            </Grid>
        </Grid>
         <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
                    <Grid item>
                        <Button  type="button" sx={{ mt:5 , width: '200px'}} variant="contained" onClick={addShift}>Add a new Shift</Button>
                    </Grid>
                </Grid>
</Box>
</Paper>
</Container>
   
<br/>
  </>
  );
};
export default EditShift;