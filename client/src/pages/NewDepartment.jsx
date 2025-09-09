import axios from 'axios';
import { useState, useEffect, useMemo} from "react";
//useLocation is required in order to recieved the data from {state}
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { TextField, Grid, Paper, Typography, Container, Link, Box , Stack,MenuItem, Button} from '@mui/material';

import { actionsAllowedClientUtils } from '../utils/actionsAllowedClientUtils';
import { actionHandlerUtils } from '../utils/actionHandlerUtils';

const EMPLOYEES_URL="http://localhost:5000/employees"
const DEPARTMETS_URL= "http://localhost:5000/departments"

const NewDepartment = () => {
  //  9.9 const [employee, setEmployee] = useState({firstName: '',  lastName: '',  startWorkYear: '', departmentId:''});
    const [employees, setEmployees]= useState([]);
  //9.9  const [departments, setDepartments]= useState([]);
    const [department, setDepartment]= useState({name: '', manager:''});

    const navigate = useNavigate();  

    useEffect(() => {
        getAllEmployees();
       //9.9. getAllDepartments();   
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

    const getAllEmployees = async () => {
      const { data } = await axios.get(EMPLOYEES_URL);
      setEmployees(data);
    };

    // 9.9 const getAllDepartments = async () => {
    //   const { data } = await axios.get(DEPARTMETS_URL);
    //   setDepartments(data);
    // };

    const addDepartmentAndManagerProcess = async (e) => {
      //preventing performing refresh
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
      try {
        //res includes the opject that was added, according the post defenition
        const res = await axios.post(DEPARTMETS_URL, department);
        const createdDepartment = res.data;

        //save the id of the new created department
        const createdDepId =createdDepartment?._id ;

        if (!createdDepId) {throw new Error('No department id returned from server');}

        //in case manager was choosen for the department update the manager with the id of the new created departmnet
        if (department.manager) {
          await axios.put(`${EMPLOYEES_URL}/${department.manager}`,{ departmentId: createdDepId });
        }

        //"??" means that if the left side is null then take the right side of "??"
        alert(`${createdDepartment?.name ?? department.name} department was added`);
        navigate('/departments', { state: { user } });
        } catch (err) {
        console.error('Failed:', err.response?.data || err.message);
        alert(err.response?.data?.message || 'Server error – could not add department');
      }
    };

    const cancelAddDepartmentProcess= (e) =>{
      e.preventDefault();
      navigate ('/departments', { state: { user: user } });
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

        <Typography variant="h4" align="center"  sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4, mt:6 }}>Add a new Department</Typography>
        <Paper elevation={4} sx={{ padding: 3, bgcolor: '#f5f5f5' }}>
          <Box component="form"  justifyContent="center" mt={2} mb={2}>
            <TextField label="Department's name" sx={{  align:"center", mx: 'auto', mt: 2, mb: 2, width: '220px', ml:31}} id="input-department-name"
                variant="filled"  value= {department.name}  
                onChange ={(e) =>setDepartment ({...department, name:e.target.value}) } >
            </TextField>

            <TextField select label="Department's manager name" sx={{  align:"center", mx: 'auto', mt: 2, mb: 2, width: '220px', ml:31}} id="input-department-manager"
                variant="filled"  value= {department.manager}  
                onChange ={(e) =>setDepartment ({...department, manager:e.target.value}) } >           
                {employees.map((emp) => (
                <MenuItem key={emp._id} value={emp._id}>{emp.firstName} {emp.lastName}</MenuItem>
                ))}
            </TextField>   

      <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
        <Grid item>
          <Button onClick={addDepartmentAndManagerProcess} sx={{ mt:5 , width: '200px'}} variant="contained" >Add Department</Button>
        </Grid>
        <Grid item>
          <Button onClick={cancelAddDepartmentProcess}  sx={{ mt:5 , width: '200px'}} variant="contained" >Cancel</Button>
        </Grid>
      </Grid>
    </Box> 
    </Paper>
    </Container>
      </>
      );
};
export default NewDepartment;