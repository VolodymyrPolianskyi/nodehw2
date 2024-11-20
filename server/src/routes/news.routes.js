const express = require('express');
const newsController = require('../controllers/news.controllers');
const newsRouter = express.Router();

newsRouter.get('/', newsController.getAllPosts);
newsRouter.get('/:id', newsController.getPostById);
newsRouter.post('/', newsController.createPost);
newsRouter.put('/:id', newsController.updatePost);
newsRouter.delete('/:id', newsController.deletePost);
newsRouter.get('/error', newsController.throwError);

module.exports = newsRouter;