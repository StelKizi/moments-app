import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../redux/actions/posts';
import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Typography,
} from '@material-ui/core';
import { ThumbUpAlt, MoreHoriz } from '@material-ui/icons';
import Filled from '@material-ui/icons/Delete';
import moment from 'moment';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {/* Edit button */}
      <div className={classes.overlay2}>
        <Button
          style={{ color: 'white' }}
          size='small'
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHoriz fonsize='default' />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>
          {post.tags.map(tag => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant='h5' gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          onClick={() => dispatch(likePost(post._id))}
        >
          <ThumbUpAlt fonsize='small' />
          &#160; Like &#160;
          {post.likeCount}
        </Button>
        <Button
          size='small'
          color='primary'
          onClick={() => dispatch(deletePost(post._id))}
        >
          <Filled fonsize='small' />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
