import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

const profile = JSON.parse(localStorage.getItem('profile'));
API.interceptors.request.use(req => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${profile.token}`;
  }
  return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = newPost => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => {
  return API.patch(`/posts/${id}`, updatedPost);
};
export const deletePost = id => API.delete(`/posts/${id}`);
export const likePost = id => API.patch(`/posts/${id}/like-post`);
export const signUp = formData => API.post('/user/sign-up', formData);
export const signIn = formData => API.post('/user/sign-in', formData);
