import newsController from '../src/controllers/news.controllers';
import { newsServices } from '../src/services/news.services';
import { validatePost } from '../src/validators/news.validators';

jest.mock('../src/services/news.services', () => ({
  newsServices: {
    getAllPosts: jest.fn(),
    getPostById: jest.fn(),
    createPost: jest.fn(),
    updatePost: jest.fn(),
    deletePost: jest.fn(),
  },
}));

jest.mock('../src/validators/news.validators', () => ({
  validatePost: jest.fn(),
}));

describe('News Controller', () => {
  let mockRequest: any;
  let mockResponse: any;

  beforeEach(() => {
    mockRequest = {
      body: { header: 'Post 1', text: 'Content 1' },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: { user: { email: 'test@example.com' } },
    };
    jest.clearAllMocks();
  });

  describe('getAllPosts', () => {
    it('should return paginated posts', async () => {
      (newsServices.getAllPosts as jest.Mock).mockResolvedValue({
        posts: [{ id: 1, header: 'Post 1', text: 'Content 1' }],
        totalPosts: 1,
      });

      mockRequest.query = { page: 1, size: 10 };

      await newsController.getAllPosts(mockRequest, mockResponse);

      expect(newsServices.getAllPosts).toHaveBeenCalledWith(1, 10);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: [{ id: 1, header: 'Post 1', text: 'Content 1' }],
        currentPage: 1,
        totalPages: 1,
        totalPosts: 1,
      });
    });
  });

  describe('createPost', () => {
    it('should create a post', async () => {
      (validatePost as unknown as jest.Mock).mockReturnValue(true);
      (newsServices.createPost as jest.Mock).mockResolvedValue({
        id: 1,
        header: 'Post 1',
        text: 'Content 1',
      });

      mockRequest.body = { header: 'Post 1', text: 'Content 1' };

      await newsController.createPost(mockRequest, mockResponse);

      expect(validatePost).toHaveBeenCalledWith(mockRequest.body);
      expect(newsServices.createPost).toHaveBeenCalledWith(
        mockRequest.body,
        'test@example.com'
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        id: 1,
        header: 'Post 1',
        text: 'Content 1',
      });
    });
  });
});
