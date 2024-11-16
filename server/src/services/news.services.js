const fileDB = require('../DAL/schemas.dal')
const newsTable = fileDB.getTable('newspost');

const getAllPosts = (page, size) => {
  const data = newsTable.getAll();
  const totalPosts = data.length;

  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;

  const paginatedPosts = data.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    totalPosts,
  };
};

const getPostById = (id) => {
  return newsTable.getById(id);
};

const createPost = (post) => {
  return newsTable.create(post);
};

const updatePost = (id, updates) => {
  return newsTable.update(id, updates);
};

const deletePost = (id) => {
  return newsTable.delete(id);
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};