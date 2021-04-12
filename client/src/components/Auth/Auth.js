import React, { useState } from 'react';
import {
  Typography,
  Container,
  Grid,
  Avatar,
  Paper,
  Button,
  TextField,
} from '@material-ui/core';
import InputField from './InputField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';

const Auth = () => {
  const classes = useStyles();
  const [isSignUp, setisSignUp] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);

  const handleDisplayPassword = () => {
    setDisplayPassword(prevDisplayPassword => !prevDisplayPassword);
  };
  const handleSubmit = () => {};

  const handleChange = () => {};

  const handleSwitchMode = () => {
    setisSignUp(prevIsSignUp => !prevIsSignUp);
    handleDisplayPassword(false);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Log In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <InputField
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  autoFocus
                  halfSize
                />
                <InputField
                  name='lastName'
                  label='Last Name'
                  handleChange={handleChange}
                  halfSize
                />
              </>
            )}
            <InputField
              name='email'
              label='Email Address'
              handleChange={handleChange}
              type='email'
            />
            <InputField
              name='password'
              label='Password'
              handleChange={handleChange}
              type={displayPassword ? 'text' : 'password'}
              handleDisplayPassword={handleDisplayPassword}
            />
            {isSignUp && (
              <InputField
                name='confirmPassword'
                type='password'
                label='Repeat Password'
                handleChange={handleChange}
              />
            )}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {!isSignUp ? 'Log In' : 'Sign Up'}
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Button onClick={handleSwitchMode}>
                {isSignUp
                  ? 'Already have an account? Log In'
                  : "Don't have and account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
