const newsServices = require('../services/news.services');
const {validatePost} = require('../validators/news.validators')
const logger = require('../utils/logger')

const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const size = parseInt(req.query.size) || 10;
    const loggerInfo = {
      method: req.method,
      url: req.url,
      body: req.body? req.body : null
    } 
    logger.info(loggerInfo)

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
    const loggerInfo = {
      method: req.method,
      url: req.url,
      body: req.body? req.body : null
    } 
    logger.info(loggerInfo)
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

const createPost = async (req, res) => {
  const isValid = validatePost(req.body)
  const loggerInfo = {
    method: req.method,
    url: req.url,
    body: req.body? req.body : null
  } 
  logger.info(loggerInfo)
  if(!isValid){
    logger.error("Invalid post body")
    return res.status(400).json({error:"Invalid post body"})
  }
  const newPost = await newsServices.createPost(req.body)
  res.status(200).json(newPost)
};

const updatePost = async (req, res) => {
  const loggerInfo = {
    method: req.method,
    url: req.url,
    body: req.body? req.body : null
  } 
  logger.info(loggerInfo)
  const isValid = validatePost(req.body);
  if (!isValid) {
    logger.error("Invalid update body")
    return res.status(400).json({error:"Invalid update body"})
  }
  const updatedPost = await newsServices.updatePost(parseInt(req.params.id), req.body);
  res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
  const loggerInfo = {
    method: req.method,
    url: req.url,
    body: req.body? req.body : null
  } 
  logger.info(loggerInfo)
  try {
    await newsServices.deletePost(parseInt(req.params.id));
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

const throwError = (req, res) => {
  throw new NewspostsServiceError('Demonstration error');
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  throwError
};