import express from 'express'
import newsController from '../controllers/news.controllers.js'
import authenticateToken from '../middlewares/jwt.auth.js';
const newsRouter = express.Router();

newsRouter.get('/', newsController.getAllPosts);
newsRouter.get('/:id', newsController.getPostById);
newsRouter.post('/', authenticateToken, newsController.createPost);
newsRouter.put('/:id', authenticateToken, newsController.updatePost);
newsRouter.delete('/:id', authenticateToken, newsController.deletePost);

export default newsRouter