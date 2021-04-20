import React from 'react';
import { ThumbUpAlt, ThumbUpAltOutlined } from '@material-ui/icons';

const Likes = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  if (post.likes.length) {
    return post.likes.find(
      like => like === (user?.result?.googleId || user?.result?._id)
    ) ? (
      <>
        <ThumbUpAlt fontSize='small' />
        &nbsp;
        {post.likes.length > 2
          ? `You and ${post.likes.length - 1} others`
          : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
      </>
    ) : (
      <>
        <ThumbUpAltOutlined fontSize='small' />
        &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
      </>
    );
  }
  return (
    <>
      <ThumbUpAltOutlined fontSize='small' />
      &#160;Like
    </>
  );
};

export default Likes;
