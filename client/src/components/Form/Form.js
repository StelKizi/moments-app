import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button, Paper } from '@material-ui/core';
import FileBase64 from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../redux/actions/posts';
import useStyles from './styles';

const Form = ({ setCurrentId, currentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });
  const user = JSON.parse(localStorage.getItem('profile'));

  const postToUpdate = useSelector(state =>
    currentId ? state.posts.find(item => item._id === currentId) : 0
  );

  useEffect(() => {
    if (postToUpdate) {
      setPostData(postToUpdate);
    }
  }, [postToUpdate]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.reault?.name }));
      handleClear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.reault?.name })
      );
      handleClear();
    }
  };

  const handleClear = () => {
    setCurrentId(0);
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Sign in to post about your moments and like others' posts.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>
          {!currentId ? 'Posting about' : 'Editing'} a special moment✨
        </Typography>
        <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          onChange={e => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name='message'
          variant='outlined'
          label='Message'
          fullWidth
          value={postData.message}
          onChange={e => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField
          name='tags'
          variant='outlined'
          label='Tags'
          fullWidth
          placeholder='e.g. tag1,tag2,tag3...'
          value={postData.tags}
          onChange={e =>
            setPostData({ ...postData, tags: e.target.value.split(', ') })
          }
        />
        <div className={classes.fileInput}>
          <FileBase64
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          onClick={handleClear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
