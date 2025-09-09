import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
//the below import is required in order to recieved the data from {state}
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Stack, Grid, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Container, Link, Button} from '@mui/material';

const EMPLOYEES_URL = `${import.meta.env.VITE_BACKEND_URL}/employees`; 
const DEPARTMENT_URL = `${import.meta.env.VITE_BACKEND_URL}/departments`; 

const Departments = () => {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);

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
    }, []);

    const getAllEmployees = async () => {
      const { data } = await axios.get(EMPLOYEES_URL);
      setEmployees(data);
    };

    const getAllDepartments = async () => {
      const { data } = await axios.get(DEPARTMENT_URL);
      setDepartments(data);
    };

    const createNewDepartment=() =>{
      navigate ('/NewDepartment', {state:{user:user}})
      }

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
                    <Link component={RouterLink}   to="/employees"  state={{ user: user }}>Employees page</Link>
                    <Link component={RouterLink} to="/shifts">Shifts Page</Link>  
                  </Stack>
                </Grid>       
            </Grid>

          <Typography variant="h4" align="center"  sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4, mt:6 }}>Departments List</Typography>
            <Paper elevation={4} sx={{ padding: 3, bgcolor: '#f5f5f5' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'primary.main' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Department Name</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Department Manager Name</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Employees work in this Department</TableCell>
                  </TableRow>
                </TableHead>
              <TableBody>
                {departments.map((dep) => {
                  //empWorkInDepartment includes all the employees that work in this department
                  const empWorkInDepartment = employees.filter(emp => emp.departmentId === dep._id );
                  const managerId = dep.manager
                  const manager = employees.find (emp => emp._id === managerId);
                  return (
                    //hover means that once going over the row it will be colored by default (but it also can be determine by user)
                    <TableRow key={dep._id} hover>
                      <TableCell>
                        <Link
                            component={RouterLink}
                            to={`/editDepartment/${dep._id}`}
                              //only when going over the emp_name an underline will be added 
                            sx={{ color: 'black', fontWeight: 'bold', textDecoration: 'none', '&:hover': { textDecoration: 'underline', color: 'blue' } }}
                            >
                            {dep.name}
                          </Link>
                      </TableCell>              
                      <TableCell>
                        {manager ? (<Link
                                  component={RouterLink}
                                  to={`/editEmployee/${manager._id}`}
                                  state={{ user }}
                                  sx={{ color: 'black', fontWeight: 'bold', textDecoration: 'none', '&:hover': { textDecoration: 'underline', color: 'blue' } }}>
                                  {manager.firstName} {manager.lastName}
                                </Link>) : 'N/A'}
                      </TableCell>

                      {/* if department is defined for employee the displaye departmentName , otherwise N/A */}
                      <TableCell>
                        {empWorkInDepartment ? empWorkInDepartment.map ((emp)=> 
                        ((<Link
                            // since we have several elements it's must to use key
                            key={emp._id}
                            component={RouterLink}
                            to={`/editEmployee/${emp._id}`}
                            state={{user}}
                            //only when going over the emp_name an underline will be added 
                            sx={{ color: 'black', fontWeight: 'bold', textDecoration: 'none', '&:hover': { textDecoration: 'underline', color: 'blue' } }}
                            >
                            {emp.firstName} {emp.lastName} <br/>
                        </Link>)) ):('N/A')                                   
                    }
                  
                      </TableCell>    
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
            <Grid item>
              <Button  sx={{ mt:5 , width: '400px'}} variant="contained" onClick={createNewDepartment}>Add a new Department</Button>
            </Grid>
          </Grid>

          </Paper>   
        </Container>
      );
};

export default Departments;
