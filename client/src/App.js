import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import PostsList from './components/Posts/PostsList';
import Form from './components/Form/Form';
import moments from './images/moments.png';
import useStyles from './styles';
import { getPosts } from './redux/actions/posts';
import { useDispatch } from 'react-redux';

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth='lg'>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography variant='h2' className={classes.heading} align='center'>
          Moments
        </Typography>
        <img
          src={moments}
          alt='moments'
          className={classes.image}
          height='60'
        />
      </AppBar>
      <Grow in>
        <Container className={classes.mainContainer}>
          <Grid
            container
            justify='space-between'
            alignItems='stretch'
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <PostsList setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
