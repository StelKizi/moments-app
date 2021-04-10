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
    author: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });
  const postToUpdate = useSelector(state =>
    currentId ? state.posts.find(item => item._id === currentId) : null
  );

  useEffect(() => {
    if (postToUpdate) {
      setPostData(postToUpdate);
    }
  }, [postToUpdate]);

  const handleSubmit = e => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }

    handleClear();
  };

  const handleClear = () => {
    setCurrentId(null);
    setPostData({
      author: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
  };

  /*   const handleUpdateTextfield = (e,{value}) => ({
    ...postData,
    value: e.target.value,
  }); */

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
          name='author'
          variant='outlined'
          label='Author'
          fullWidth
          value={postData.author}
          onChange={e => setPostData({ ...postData, author: e.target.value })}
        />
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
