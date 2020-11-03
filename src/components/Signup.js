import React, {useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Select, MenuItem, InputLabel } from '@material-ui/core';
import UserContext from './context/UserContext'
import Axios from 'axios';
import {useHistory} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
    
  const classes = useStyles();

  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  const [form, setForm] = React.useState({
      firstName: "", 
      lastName: "", 
      email: "", 
      password: "", 
      city: "Toronto"
  });
  
  const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(form.email)
      const registerResponse = await Axios.post('http://localhost:5000/register', form);
      console.log(registerResponse)

      const loginRes = await Axios.post("http://localhost:5000/login", {
        email: form.email,
        password: form.password
      })
      setUserData({
        token: loginRes.data.token, 
        user: loginRes.data.user
      })
      // with the Login response, we know we get the token and user
      localStorage.setItem('auth-token', loginRes.data.token)
      history.push("/");

  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
            <InputLabel id="label">City</InputLabel>
                <Select 
                    labelId="city" 
                    id="select" 
                    name="city" 
                    value={form.city} 
                    fullWidth
                    onChange={handleChange}
                    >
                    <MenuItem value="Toronto">Toronto</MenuItem>
                    <MenuItem value="Brampton">Brampton</MenuItem>
                </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}