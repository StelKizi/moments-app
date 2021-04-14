import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Typography,
  Container,
  Grid,
  Avatar,
  Paper,
  Button,
} from '@material-ui/core';
import Icon from './Icon';
import { GoogleLogin } from 'react-google-login';
import InputField from './InputField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from 'react-router';
import useStyles from './styles';
import { signUp, signIn } from '../../redux/actions/auth';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const classes = useStyles();
  const [isSignUp, setisSignUp] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDisplayPassword = () => {
    setDisplayPassword(prevDisplayPassword => !prevDisplayPassword);
  };
  const handleSubmit = e => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signUp(formData, history));
    } else {
      dispatch(signIn(formData, history));
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSwitchMode = () => {
    setisSignUp(prevIsSignUp => !prevIsSignUp);
    handleDisplayPassword(false);
  };

  const googleLoginRenderProps = renderProps => {
    return (
      <Button
        className={classes.googleButton}
        fullWidth
        color='primary'
        onClick={renderProps.onClick}
        disabled={renderProps.disabled}
        startIcon={<Icon />}
        variant='contained'
      >
        Log In with Google
      </Button>
    );
  };

  const handleGoogleSuccess = async res => {
    /* Optional chaining operator (?.) */
    const result = await res?.profileObj;
    const token = await res?.tokenId;

    try {
      dispatch({ type: 'AUTH', payload: { result, token } });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleFailure = error => {
    console.log(error);
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

          <GoogleLogin
            clientId='1062372324524-35g4ftumredtll4maj5hnkjkaaqho9ha.apps.googleusercontent.com'
            render={renderProps => googleLoginRenderProps(renderProps)}
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy='single_host_origin'
          />

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
