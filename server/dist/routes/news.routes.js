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
const newsRouter = (io) => {
    const router = express.Router();
    router.get('/', newsController.getAllPosts);
    router.get('/:id', newsController.getPostById);
    router.post('/', authenticateToken, (req, res) => newsController.createPost(req, res, io));
    router.put('/:id', authenticateToken, newsController.updatePost);
    router.delete('/:id', authenticateToken, newsController.deletePost);
    return router;
};
export default newsRouter;
