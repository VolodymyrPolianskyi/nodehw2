import NewsPostRepository from '../src/repository/NewsPostRepository';
import { mocked } from 'jest-mock';
import { NewsPost } from '../src/entity/NewsPost';
import { User } from '../src/entity/User';
import { AppDataSource } from '../src/db';
import { Repository } from 'typeorm';

jest.mock('../src/db');

describe("NewsPostRepository", () => {
  let repo: NewsPostRepository;
  let userMock: User;
  let mockedRepo: jest.Mocked<Repository<NewsPost>>;
  let mockedUserRepo: jest.Mocked<Repository<User>>;

  beforeEach(() => {
    // Мокаем репозитории для User и NewsPost
    mockedUserRepo = {
      ...mocked(AppDataSource.getRepository(User)),
      findOne: jest.fn(),
    };

    mockedRepo = {
      ...mocked(AppDataSource.getRepository(NewsPost)),
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      createQueryBuilder: jest.fn(),
    };

    jest.spyOn(AppDataSource, "getRepository")
      .mockImplementation((entity) => {
        if (entity === NewsPost) return mockedRepo;
        if (entity === User) return mockedUserRepo;
        return {} as any;
      });

    repo = new NewsPostRepository();

    // Мокируем пользователя
    userMock = { user_id: 1, email: "test@example.com" } as User;
  });

  it("should create a new post", async () => {
    const postData = { header: "Post 3", text: "Content 3", deleted: false };

    // Мокаем метод findOne для поиска пользователя
    mockedUserRepo.findOne.mockResolvedValue(userMock);

    // Мокаем создание и сохранение поста
    mockedRepo.create.mockReturnValue({
      id: 3,
      header: "Post 3",
      text: "Content 3",
      deleted: false,
      author: userMock,
    } as NewsPost);

    mockedRepo.save.mockResolvedValue({
      id: 3,
      header: "Post 3",
      text: "Content 3",
      deleted: false,
      author: userMock,
    } as NewsPost);

    const result = await repo.create(postData, "test@example.com");

    expect(mockedRepo.create).toHaveBeenCalledWith({
      ...postData,
      author: userMock,
    });

    expect(result).toEqual({
      id: 3,
      header: "Post 3",
      text: "Content 3",
      deleted: false,
      author: userMock,
    });
  });

  it("should get all posts", async () => {
    const post = {
      id: 1,
      header: "Post 1",
      text: "Content 1",
      deleted: false,
      author: userMock, // проверяем, что автор присутствует в возвращаемых данных
    };

    // Мокаем метод createQueryBuilder для правильной работы запроса
    mockedRepo.createQueryBuilder.mockReturnValue({
      leftJoin: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([post]),
    } as any);

    const posts = await repo.getAll();

    expect(mockedRepo.createQueryBuilder).toHaveBeenCalled();
    expect(posts).toEqual([post]);
  });
});
