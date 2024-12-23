var _a;
import NewsPostRepository from '../repository/NewsPostRepository.js';
const postRepo = new NewsPostRepository();
export class newsServices {
}
_a = newsServices;
newsServices.getAllPosts = async (page, size) => {
    const allPosts = await postRepo.getAll();
    const totalPosts = allPosts.length;
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedPosts = allPosts.slice(startIndex, endIndex);
    return {
        posts: paginatedPosts,
        totalPosts,
    };
};
newsServices.getPostById = async (id) => {
    return await postRepo.getById(id);
};
newsServices.createPost = async (post, email) => {
    return await postRepo.create(post, email);
};
newsServices.updatePost = async (id, updates, email) => {
    return await postRepo.update(id, updates, email);
};
newsServices.deletePost = async (id, email) => {
    return await postRepo.delete(id, email);
};
