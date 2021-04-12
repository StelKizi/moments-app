import React, { useEffect, useState } from 'react';
import { getPosts } from '../../redux/actions/posts';
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid } from '@material-ui/core';
import PostsList from '../Posts/PostsList';
import Form from '../Form/Form';
import useStyles from '../../styles';

const Homepage = () => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
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
  );
};

export default Homepage;
