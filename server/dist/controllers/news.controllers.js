var _a;
import { newsServices } from '../services/news.services.js';
import { validatePost } from '../validators/news.validators.js';
import { NewsPost } from '../entity/NewsPost.js';
import UserRepository from '../repository/UserRepository.js';
class newsController {
    static async createPost(req, res, io) {
        const isValid = validatePost(req.body);
        if (!isValid) {
            return res.status(400).json({ error: "Invalid post body" });
        }
        const { email } = res.locals.user;
        const post = await newsServices.createPost(req.body, email);
        const userRepo = new UserRepository();
        const users = await userRepo.getAllUsersWithNotifications();
        io.emit('newPostLog', { title: post.header, content: post.text, link: `/news/${post.id}` });
        io.emit('newPostAlert', { title: post.header });
        res.status(200).json(post);
    }
}
_a = newsController;
newsController.getAllPosts = async (req, res) => {
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
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};
newsController.getPostById = async (req, res) => {
    try {
        const post = await newsServices.getPostById(parseInt(req.params.id));
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch post' });
    }
};
newsController.updatePost = async (req, res) => {
    body: req.body ? req.body : null;
    const isValid = validatePost(req.body);
    if (!isValid) {
        return res.status(400).json({ error: "Invalid update body" });
    }
    const updatedPost = await newsServices.updatePost(parseInt(req.params.id), req.body, res.locals.user.email);
    if (!(updatedPost instanceof NewsPost)) {
        return res.status(400).json(updatedPost.error);
    }
    res.status(200).json(updatedPost);
};
newsController.deletePost = async (req, res) => {
    const response = await newsServices.deletePost(parseInt(req.params.id), res.locals.user.email);
    if (!(response instanceof NewsPost)) {
        return res.status(400).json(response.error);
    }
    res.status(200).json({ message: 'Post deleted successfully' });
};
export default newsController;
