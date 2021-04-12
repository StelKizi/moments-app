import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Homepage from './components/Homepage/Homepage';
import AppNavbar from './components/AppNavbar/AppNavbar';
import Auth from './components/Auth/Auth';

function App() {
  return (
    <Container maxWidth='lg'>
      <AppNavbar />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/auth' component={Auth} />
      </Switch>
    </Container>
  );
}

export default App;
