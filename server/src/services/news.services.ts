import NewsPostRepository from '../repository/NewsPostRepository'

const postRepo = new NewsPostRepository();


export class newsServices{
  static getAllPosts = async (page, size) => {
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

  static getPostById = async (id) => {
    return await postRepo.getById(id);
  };

  static createPost = async (post,email) => {
    return await postRepo.create(post,email);
  };

  static updatePost = async (id, updates, email) => {
    return await postRepo.update(id, updates, email);
  };

  static deletePost = async (id, email) => {
    return await postRepo.delete(id,email);
  };
}

jest.mock('../repository/NewsPostRepository');