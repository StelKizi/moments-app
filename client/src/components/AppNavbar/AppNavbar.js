import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import decode from 'jwt-decode';
import moments from '../../images/moments.png';
import useStyles from './styles';

const AppNavbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(
    user => {
      const token = user?.token;
      if (token) {
        const decodedToken = decode(token);

        if (decodedToken.exp * 1000 < new Date.getTime()) {
          handleLogout();
        }
      }

      setUser(JSON.parse(localStorage.getItem('profile')));
    },
    [location]
  );

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/');
    setUser(null);
  };

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to='/'
          variant='h2'
          className={classes.heading}
          align='center'
        >
          Moments
        </Typography>
        <img
          src={moments}
          alt='moments'
          className={classes.image}
          height='60'
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant='h6'>
              {user.result.name}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='./auth'
            variant='contained'
            color='primary'
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppNavbar;
