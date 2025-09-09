import axios from 'axios';
import { useState, useEffect, useMemo} from "react";
//useLocation is required in order to recieved the data from {state}
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { TextField, Grid, Paper, Typography, Container, Link, Box , Stack, Button} from '@mui/material';

import { actionsAllowedClientUtils } from '../utils/actionsAllowedClientUtils';
import { actionHandlerUtils } from '../utils/actionHandlerUtils';

const SHIFTS_URL = `${import.meta.env.VITE_BACKEND_URL}/shifts`;

const NewShift = () => {
    const [shift, setShift]= useState({date: '', startingHour:'', endingHour:''});
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
 
    const addNewShift = async (e) => {
      //preventing performing refresh
      e.preventDefault();
       //checks if all fields were filed in
        if ((!shift.date) || (!shift.startingHour) || (!shift.endingHour)) {
            alert ("Please fill in all fields");
            return;
        }

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
          await axios.post(SHIFTS_URL, shift);
          //"??" means that if the left side is null then take the right side of ??
          alert(`A new shift has beed added`);
          navigate('/shifts', { state: { user } });
        } 
        catch (err) {
          console.error('Failed:', err.response?.data || err.message);
          alert(err.response?.data?.message || 'Server error: could not add shift');
        }
    };

   const cancelAddNewShift= (e) =>{
    e.preventDefault();
    navigate ('/shifts', { state: { user: user } });
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

          <Typography variant="h4" align="center"  sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4, mt:6 }}>Add a new Shift</Typography>
          <Paper elevation={4} sx={{ padding: 3, bgcolor: '#f5f5f5' }}>
              <Box component="form"  justifyContent="center" mt={2} mb={2}>
                    <TextField type="date" label="Shift's Date" sx={{  align:"center", mx: 'auto', mt: 2, mb: 2, width: '220px', ml:31}} id="input-shift-date"
                    variant="filled"  value= {shift.date}  
                    onChange ={(e) =>setShift ({...shift, date:e.target.value}) } 
                    //slotProps was added to the textbox header won't be written over the date
                    slotProps={{inputLabel: {shrink: true},}}>
                  </TextField>

                    <TextField  label="Shift's Starting Hour" sx={{  align:"center", mx: 'auto', mt: 2, mb: 2, width: '220px', ml:31}} id="input-shift-startingHour"
                    variant="filled"  value= {shift.startingHour}  
                    onChange ={(e) =>setShift ({...shift, startingHour:e.target.value}) } >
                  </TextField>

                    <TextField  label="Shift's Ending Hour" sx={{  align:"center", mx: 'auto', mt: 2, mb: 2, width: '220px', ml:31}} id="input-shift-endingHour"
                    variant="filled"  value= {shift.endingHour}  
                    onChange ={(e) =>setShift ({...shift, endingHour:e.target.value}) } >
                  </TextField>
          
                  <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
                      <Grid item>
                          <Button onClick={addNewShift} sx={{ mt:5 , width: '200px'}} variant="contained" >Add A New Shift</Button>
                      </Grid>
                        <Grid item>
                          <Button onClick={cancelAddNewShift}  sx={{ mt:5 , width: '200px'}} variant="contained" >Cancel</Button>
                      </Grid>
                  </Grid>
              </Box> 
          </Paper>
      </Container>
   </>
  );
};

export default NewShift;