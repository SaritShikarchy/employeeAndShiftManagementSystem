import axios from 'axios';
//useLocation is required in order to recieved the data from {state}
import { Link as RouterLink, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useState,  useEffect, useMemo } from 'react';
//import Employees from './Employees';
import {Container,Grid,Stack, Typography,Link,Paper,Box,TextField,MenuItem,Button } from '@mui/material';

import { actionsAllowedClientUtils } from '../utils/actionsAllowedClientUtils';
import { actionHandlerUtils } from '../utils/actionHandlerUtils';

const EMPLOYEES_URL='http://localhost:5000/employees'
const DEPARTMENT_URL='http://localhost:5000/departments'

const EditDepartment = () => {
  const [employees, setEmployees] = useState([]);
  const [currentDepartment, setCurrentDepartment] = useState({name: '',  manager: ''});
  const [departments, setDepartments] = useState([]);
  const [currentEmployToUpdateDepartment, setCurrentEmployToUpdateDepartment] = useState({ _id:'', firstName:'', lastName:'',  startWorkYear:'', departmentId:''});
 
  //means that the id is the departement id which taken from the page's params
  const { id } = useParams();
  const navigate = useNavigate();

  //location is used to recieved the object that is sent from {state}
  const location = useLocation();
  //in case there is a user on location.state then use it, otherwise take the user from localStorage
const userSaved = location.state?.user;
const user =useMemo (()=> {
  if (userSaved) return userSaved;
  try{return JSON.parse (localStorage.getItem('user'))}
  catch {return null;}
}, [userSaved])

      useEffect(() => {
  if (id) {
    getDaprtmentById();
  } else {
    console.warn("Missing ID in URL");
  }
  getAllEmployees()
  getAllDepartments()
}, []);

  const employeesToDisplay = employees.filter(emp => emp.departmentId !== currentDepartment._id);

  const getDaprtmentById = async() =>{
  const {data}=  await axios.get (`${DEPARTMENT_URL}/${id}`)
  setCurrentDepartment (data)
  }

   const getAllEmployees = async() =>{
  const {data}=  await axios.get (EMPLOYEES_URL)
  setEmployees (data)
  }

   const getAllDepartments = async() =>{
  const {data}=  await axios.get (DEPARTMENT_URL)
  setDepartments (data)
  }

  const updateDepartment= async() =>{
    //locate the value of user.id
      const userId = typeof user === 'string' ? user : user?.id ?? user?._id 

      if (!userId) {
        alert('Please reconnect to system');
        navigate('/', { replace: true });
        return;
      }
     
    try{
        const obj=currentDepartment
        await axios.put(`${DEPARTMENT_URL}/${id}`, obj)
        alert (`The ${currentDepartment.name}'s Department was updated`)
        navigate ('/Departments', { state: { user: user } });
      }
       
      catch (error) {
          console.log ('error updating department:', error);
      }

       const res= await actionsAllowedClientUtils(userId);
      //res includes {ok: false} or {ok: true}
      if (!actionHandlerUtils(res, navigate)) return;
    
   }

   const addDepartment = (e) =>{
    e?.preventDefault?.(); 
  navigate ('/departments', { state: { user: user } });
  }
   

     const updateEmployeeDepartment= async() =>{
      try{
           const obj=currentEmployToUpdateDepartment
           console.log(currentEmployToUpdateDepartment._id)
           await axios.put(`${EMPLOYEES_URL}/${currentEmployToUpdateDepartment._id}`, obj)
           alert (`${currentEmployToUpdateDepartment.firstName} was associated to department`)
           navigate ('/departments', { state: { user: user } });
           }   
      catch (error) {
          console.log('error updating employee', error)
      }
    }
   
    const deleteDepartment= async() =>{
      const departmentIdToDelete=currentDepartment._id
      const departmentNameToDelete=currentDepartment.name
      await axios.delete(`${DEPARTMENT_URL}/${currentDepartment._id}`)
      //await axios.delete(`${EMPLOYEES_SHIFTS_URL}/emp/${id}`);
      getAllDepartments()
      // console.log ('befor navigate')
      deleteDepartmentForEmployees(departmentIdToDelete)
      alert (`Department ${departmentNameToDelete} was removed`)
      navigate ('/departments', { state: { user: user } });
    }

    const deleteDepartmentForEmployees = async (departmentIdToDelete) => {
      const employeesToDeleteDepartment = employees.filter ((emp) => emp.departmentId === departmentIdToDelete)
      for(const emp of employeesToDeleteDepartment){
      await axios.put(`${EMPLOYEES_URL}/${emp._id}`, {...emp, departmentId: null} )}
      }
      
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
        

   
      <Typography variant="h4" align="center"  sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4, mt:6 }}>Edit Department</Typography>
      <Paper elevation={4} sx={{ padding: 3, bgcolor: '#f5f5f5' }}>
      <Box component="form"  justifyContent="center" mt={2} mb={2}>
              <Typography variant="h6" align="center"  sx={{ fontWeight: 'bold', color: 'black', mb: 4, mt:6 }}>Update The Department:</Typography>

              <TextField sx={{ display: 'block', mx: 'auto', mt: 2, mb: 2, width: '300px' }} id="filled-basic" label="Department's Name" variant="filled"  
              value={currentDepartment?.name ?? ''}
               onChange={(e) =>setCurrentDepartment({ ...currentDepartment, name: e.target.value })}></TextField><br/>

              {/* to associate employee to this department */}
              <TextField select label="Department's Manager" sx={{  align:"center", mx: 'auto', mt: 2, mb: 2, width: '220px', ml:31}} 
              id="filled-select-currency-native"
                   variant="filled"  
                   //?? was added in order to  avoid MUI warning, since the values are not existing in the first render
                   value= {currentDepartment?.manager ?? ''}  
                   onChange ={(e) =>setCurrentDepartment ({...currentDepartment, manager:e.target.value}) } >
                    <MenuItem value="">Select Employee</MenuItem>
                   {employees.map((emp) => (
                   <MenuItem key={emp._id} value={emp._id}>{emp.firstName} {emp.lastName}</MenuItem>
              ))}
              </TextField>

              <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
                <Grid item>
                  <Button  sx={{ width: '100px'}} variant="contained" onClick={updateDepartment}>Update</Button>
               </Grid>
               <Grid item>
                 <Button sx={{  width: '100px'}}  variant="contained" onClick={deleteDepartment}>Delete</Button>                     
               </Grid>         
              </Grid>
        
             <Typography variant="h6" align="center"  sx={{ fontWeight: 'bold', color: 'black', mb: 4, mt:6 }}>Assign employee to this department:</Typography>

             {/* value= {currentEmployToUpdateDepartment._id}  is adjusted to value={emp._id}, and the associate {emp.firstName} {emp.lastName} is displayed*/}
             <TextField select label="Employee to assign to this department:" sx={{  align:"center", mx: 'auto', mt: 2, mb: 2, width: '400px', ml:31}} id="filled-select-currency-native"
              variant="filled"   value= {currentEmployToUpdateDepartment?._id ?? ''} 
      
              onChange={(e) => {
                           const selectedEmployee = employeesToDisplay.find(emp => emp._id === e.target.value);
                          if (selectedEmployee) {
                            setCurrentEmployToUpdateDepartment({
                              // ...CurrentEmployToUpdateDepartment, departmentId: currentDepartment._id
                              _id: selectedEmployee._id, //saving the employee ID
                              firstName: selectedEmployee.firstName,
                              lastName: selectedEmployee.lastName,
                              startWorkYear: selectedEmployee.startWorkYear,
                              departmentId: currentDepartment._id // associate the employee to this department 
                              });
                          }
                       }}>

             {/* Option for no selection */}
            <MenuItem value="">None</MenuItem>
            {employeesToDisplay.map((emp) => (
           <MenuItem key={emp._id} value={emp._id}>{emp?.firstName} {emp?.lastName}</MenuItem>
            ))} 
          </TextField>

          <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
            <Grid item>
                <Button  sx={{ width: '100px'}} variant="contained" onClick={updateEmployeeDepartment}>Add</Button>
            </Grid>
        </Grid>
         <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
                    <Grid item>
                        <Button  type="button" sx={{ mt:5 , width: '400px'}} variant="contained" onClick={addDepartment}>Add a new Department</Button>
                    </Grid>
                </Grid>
</Box>
</Paper>
</Container>
   
<br/>
  </>
  );
};
export default EditDepartment;