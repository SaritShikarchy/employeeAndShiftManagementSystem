import axios from 'axios';
import { useState, useEffect } from 'react';
import { Stack, TextField, Grid, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Container, Link, Box , Button} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
//the below import is required in order to recieved the data from {state}
import { useLocation } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

const EMPLOYEES_URL = 'http://localhost:5000/employees';
const DEPARTMENT_URL = 'http://localhost:5000/departments';
const EMPLOYEES_SHIFTS_URL = 'http://localhost:5000/employeesShifts';
const SHIFTS_URL = 'http://localhost:5000/shifts';




const Shifts = () => {
    const [employees, setEmployees] = useState([]);
    const [employeeShifts, setEmployeeShifts] = useState([]);
    const [shifts, setShifts] = useState([]);

    //filtered amployees according department
    const [selectedDept, setSelectedDept] = useState(""); 

    //location is used to recieved the object that is sent from {state}
    const location = useLocation();
    //in case there is a user on location.state then save it on 'user'
    const user = location.state?.user;
    const navigate = useNavigate();

    useEffect(() => {
      getAllEmployees();
      getAllEmployeesShifts();
      getAllShifts();
    }, []);

    const getAllEmployees = async () => {
      const { data } = await axios.get(EMPLOYEES_URL);
      setEmployees(data);
    };

  
    const getAllEmployeesShifts = async () => {
      const { data } = await axios.get(EMPLOYEES_SHIFTS_URL);
      setEmployeeShifts(data);
    };

    const getAllShifts = async () => {
      const { data } = await axios.get(SHIFTS_URL);
      setShifts(data);
    };


    const createNewShift=() =>{
      navigate ('/newShift', {state:{user:user}})
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
                <Link component={RouterLink}   to="/employees"  state={{ user: user }}>Employees page</Link>
                <Link component={RouterLink} to="/departments">Departments Page</Link>  
              </Stack>
          </Grid>       
        </Grid>

          <Typography variant="h4" align="center"  sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4, mt:6 }}>Shifts List</Typography>
          <Paper elevation={4} sx={{ padding: 3, bgcolor: '#f5f5f5' }}>
          
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Shift Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Shift Starting Hour</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Shift Ending Hour</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {shifts.map((shift) => {
                
                  return (
                    //hover means that once going over the row it will be colored by default (but it also can be determine by user)
                    <TableRow key={shift._id} hover>
                      <TableCell>
                        <Link component={RouterLink} to={`/editShift/${shift._id}`}>
                            {new Date(shift.date).toLocaleDateString('he-IL')}          
                        </Link>
                      </TableCell>
                      <TableCell> {shift.startingHour} </TableCell>
                      <TableCell> {shift.endingHour} </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
                <Grid item>
                    <Button  sx={{ mt:5 , width: '400px'}} variant="contained" onClick={createNewShift}>Add a new Shift</Button>
                </Grid>
            </Grid>
          </Paper>  
        </Container>
      );
};

export default Shifts;
