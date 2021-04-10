import {
  FETCH_POSTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
} from '../constants/actionTypes';

const postsReducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;
    case CREATE_POST:
      return [...posts, action.payload];
    case UPDATE_POST:
      return posts.map(item =>
        item._id === action.payload._id ? action.payload : item
      );
    case DELETE_POST:
      return posts.filter(item => item._id !== action.payload);
    default:
      return posts;
  }
};

export default postsReducer;
