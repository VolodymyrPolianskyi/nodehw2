const newsServices = require('../services/news.services');

const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const size = parseInt(req.query.size) || 10; 

    const { posts, totalPosts } = await newsServices.getAllPosts(page, size);

    res.status(200).json({
      data: posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / size),
      totalPosts,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await newsServices.getPostById(parseInt(req.params.id));
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = await newsServices.createPost(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

const updatePost = async (req, res) => {
  try {
    const updatedPost = await newsServices.updatePost(parseInt(req.params.id), req.body);
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update post' });
  }
};

const deletePost = async (req, res) => {
  try {
    await newsServices.deletePost(parseInt(req.params.id));
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};