import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    author: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.isValidObjectId(_id)) {
    return res.status(404).send('No post found with this id');
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  /* const post = req.body; */

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).send('No post found with this id');
  }

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: 'Post deleted successfully' });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  const post = await PostMessage.findById(id);

  if (!req.userId) {
    return res.json({ message: 'User not authenticated' });
  }

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).send('No post found with this id');
  }

  const index = post.likes.findIndex(id => id === String(req.userId));

  /* If the user's id is already in the like section, turn this into a dislike */
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter(id => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
