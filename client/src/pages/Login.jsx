import {Avatar, Container, Paper, Typography, Box ,TextField, FormControlLabel, Checkbox, Grid, Link, Button, getInputAdornmentUtilityClass } from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { actionsAllowedClientUtils } from '../utils/actionsAllowedClientUtils';
//we need to define the {Link} as below in order not to have a conflict with material UI Link
import {Link as RouterLink} from 'react-router-dom'
import { actionHandlerUtils } from '../utils/actionHandlerUtils';

const USERS_PREMISSION_URL='https://jsonplaceholder.typicode.com/users'

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  //using setUsers was problematic since it takes time and the data wasn't managed to move to users
  const navigate = useNavigate();

  const handleSubmit =async (e) => {
  //to prevent the default behaivor of the explorer, such as refreshing the page when clicking on Submit
  e.preventDefault()
  if (!email.includes("@")){
      alert("Email is Invalid")
      return;
    }
  else 
  {  
  const {data} = await axios.get (USERS_PREMISSION_URL);
  const currentUser =data.find((user)=> ((user.username == username) && (user.email == email)));
  //in case the user is exist then save that user on localStorage
  if (currentUser) {
  localStorage.setItem('user', JSON.stringify(currentUser)); 

    //checks if the user has id
  const userId = currentUser._id ?? currentUser.id ?? currentUser.userId;
      if (!userId) {
        alert("User is missing id");
        return;
      }
    //checks if actions allowed for this user and decrease 'actionAllowd' for this user
    // TODELETE- sarit -test {actionsAllowedClientUtils(currentUser)}
    console.log(userId)
    const res= await actionsAllowedClientUtils(userId);
    if (!actionHandlerUtils(res, navigate)) return;
    //navigate can't be used in the return section since it's change the URL and might cause to rerendering of the APP
    navigate('/employees', {state:{user:currentUser}});
     } 
  else alert ("Username and/or password are incorrect") 
   }
  }
  

  

  return (
    <>
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{marginTop:8, padding:2}}>
        <Avatar sx={{mx:"auto", bgcolor:"secondary.main", textAlign: "center", mb:1}}><LockOutlinedIcon/></Avatar>
        <Typography component="h1" variant="h5" sx={{textAlign: "center"}}>Sign In</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt:1}}>
              <TextField placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth required autoFocus sx={{mb:2}}></TextField>
              <TextField placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required sx={{mb:2}}></TextField>
              <FormControlLabel control={<Checkbox value="remember" color="primary"/>} label="Remember me"/>
              <Button type="submit" variant="contained" fullWidth sx={{mt:1}}>Sign In</Button>
        </Box>
        <Grid container justifyContent='space-between' sx={{mt:1}}>
            <Grid item>
              {/* Link is a jsx componennt, we can not use here 'navigate' */}
                <Link component={RouterLink} to="/forgotPage">Forgot Password?</Link>
                {/* <Link component={RouterLink} to="/register">Sign Up</Link> */}
            </Grid>
        </Grid>
      </Paper>
    </Container>
   </>
  );
};
export default Login;