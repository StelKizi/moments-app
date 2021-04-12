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
import LockOutlinedIcon from '@material-ui/icons/AcUnitOutlined';
import useStyles from './styles';

const Auth = () => {
  const classes = useStyles();
  const signUp = false;
  const [displayPassword, setDisplayPassword] = useState(false);

  const handleDisplayPassword = () => {
    setDisplayPassword(prevDisplayPassword => !prevDisplayPassword);
  };
  const handleSubmit = () => {};

  const handleChange = () => {};

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{signUp ? 'Sign Up' : 'Login'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {signUp && (
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
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
