import axios from 'axios';
import { useState, useEffect, useMemo } from "react";
//useLocation is required in order to recieved the data from {state}
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { TextField, Grid, Paper, Typography, Container, Link, Box , Stack,MenuItem, Button} from '@mui/material';

import { actionsAllowedClientUtils } from '../utils/actionsAllowedClientUtils';
import { actionHandlerUtils } from '../utils/actionHandlerUtils';

const EMPLOYEES_URL="http://localhost:5000/employees"
const DEPARTMETS_URL= "http://localhost:5000/departments"

const NewEmployee = () => {
//const today = new Date().toISOString().slice(0, 10);
const [employee, setEmployee] = useState({firstName: '',  lastName: '',  startWorkYear: '', departmentId:''});
//const [employees, setEmployees]= useState([]);
const [departments, setDepartments]= useState([]);
const navigate = useNavigate();  

useEffect(() => {
    //getAllEmployees();
    getAllDepartments();   
  }, []);

//location is used to recieved the object that is sent from {state}
const location = useLocation();
//in case there is a user on location.state then use it, otherwise take the user from localStorage
const userSaved = location.state?.user;
const user =useMemo (()=> {
  if (userSaved) return userSaved;
  try{return JSON.parse (localStorage.getItem('user'))}
  catch {return null;}
}, [userSaved])
 
// const getAllEmployees = async () => {
//     const { data } = await axios.get(EMPLOYEES_URL);
//     setEmployees(data);
//   };

const getAllDepartments = async () => {
    const { data } = await axios.get(DEPARTMETS_URL);
    setDepartments(data);
  };

const addEmployeeProcess= async(e) =>{
      e.preventDefault();
      //locate the value of user.id
      const userId = typeof user === 'string' ? user : user?.id ?? user?._id 

      if (!userId) {
        alert('Please reconnect to system');
        navigate('/', { replace: true });
        return;
      }
      const res= await actionsAllowedClientUtils(userId);
      //res includes {ok: false} or {ok: true}
      if (!actionHandlerUtils(res, navigate)) return;
      
      await axios.post (EMPLOYEES_URL, employee)
        alert (`${employee.firstName} was added`)
        navigate ('/employees', { state: { user: user } });
}

const cancelAddEmployeeProcess= (e) =>{
    e.preventDefault();
    navigate ('/employees', { state: { user: user } });
}
  
return (
    <>
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

      <Typography variant="h4" align="center"  sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4, mt:6 }}>Add a new employee</Typography>
      <Paper elevation={4} sx={{ padding: 3, bgcolor: '#f5f5f5' }}>
      <Box component="form"  justifyContent="center" mt={2} mb={2}>
              <TextField sx={{ display: 'block', mx: 'auto', mt: 2, mb: 2, width: '300px' }} id="filled-basic" label="First Name" variant="filled"  value={employee.firstName}
               onChange={(e) =>setEmployee({ ...employee, firstName: e.target.value })}></TextField><br/>

               <TextField sx={{ display: 'block', mx: 'auto', mt: 2, mb: 2, width: '300px' }} id="filled-basic" label="Last Name" variant="filled" value={employee.lastName}
               onChange={(e) =>setEmployee({ ...employee, lastName: e.target.value })}></TextField><br/>

               <TextField sx={{ display: 'block', mx: 'auto', mt: 2, mb: 2, width: '300px'}}   slotProps={{ inputLabel: { shrink: true } }}  id="filled-basic" label="Start Work Year" variant="filled"   value={employee.startWorkYear|| ""} 
              onChange={(e) => setEmployee({ ...employee, startWorkYear: e.target.value })}></TextField><br/>

              <TextField select label="Department ID" sx={{  align:"center", mx: 'auto', mt: 2, mb: 2, width: '220px', ml:31}} id="filled-select-currency-native"
              variant="filled"  value= {employee.departmentId}  
              onChange ={(e) =>setEmployee ({...employee, departmentId:e.target.value}) } >
              {departments.map((dep) => (
            <MenuItem key={dep._id} value={dep._id}>{dep.name}</MenuItem>
                    ))}
            </TextField>
    <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
              <Grid item>
                  <Button onClick={addEmployeeProcess} sx={{ mt:5 , width: '200px'}} variant="contained" >Add Employee</Button>
              </Grid>
                <Grid item>
                  <Button onClick={cancelAddEmployeeProcess}  sx={{ mt:5 , width: '200px'}} variant="contained" >Cancel</Button>
              </Grid>
    </Grid>
</Box> 
</Paper>
</Container>
   </>
  );
};

export default NewEmployee;