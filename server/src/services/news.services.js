const fileDB = require('../DAL/schemas.dal')
const newsTable = fileDB.getTable('newspost');

const getAllPosts = () => {
  return newsTable.getAll();
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

// Экспортируем все функции
module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};