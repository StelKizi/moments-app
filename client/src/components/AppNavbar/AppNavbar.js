import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import moments from '../../images/moments.png';
import useStyles from './styles';

const AppNavbar = () => {
  const classes = useStyles();
  const user = null;

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
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              src={user.result.image.url}
              alt={user.result.name}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant='h6'>
              {user.result.name}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={() => {}}
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
