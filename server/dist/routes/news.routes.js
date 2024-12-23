/**
 * @swagger
 * /api/newsposts:
 *   get:
 *     summary: Get all news posts
 *     operationId: getAllNewsPosts
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create a news post
 *     operationId: createNewsPost
 *     responses:
 *       200:
 *         description: Post created
 * /api/newsposts/{id}:
 *   get:
 *     summary: Get a news post by ID
 *     operationId: getNewsPostById
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the news post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *   put:
 *     summary: Update a news post
 *     operationId: updateNewsPost
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the news post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post updated
 *   delete:
 *     summary: Delete a news post
 *     operationId: deleteNewsPost
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the news post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted
 */
import express from 'express';
import newsController from '../controllers/news.controllers.js';
import authenticateToken from '../middlewares/jwt.auth.js';
const newsRouter = express.Router();
newsRouter.get('/', newsController.getAllPosts);
newsRouter.get('/:id', newsController.getPostById);
newsRouter.post('/', authenticateToken, newsController.createPost);
newsRouter.put('/:id', authenticateToken, newsController.updatePost);
newsRouter.delete('/:id', authenticateToken, newsController.deletePost);
export default newsRouter;
