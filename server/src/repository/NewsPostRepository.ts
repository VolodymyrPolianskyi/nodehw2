import { getRepository, Repository } from "typeorm"
import {NewsPost} from "../entity/NewsPost"
import { AppDataSource } from "../db";
import { User } from "../entity/User";

export default class NewsPostRepository {
  private repository = AppDataSource.getRepository(NewsPost)

  async getAll() {
    return this.repository
      .createQueryBuilder("newsPost")
      .leftJoin("newsPost.author", "author")  
      .addSelect("author.email") 
      .orderBy("newsPost.id", "ASC")
      .getMany();
  }

  async getById(id) {
    return this.repository
      .createQueryBuilder('newsPost')
      .leftJoin("newsPost.author", "author")
      .addSelect("author.email")
      .where("newsPost.id = :id", {id})
      .getOne()
  }

  async create(data,email) {
    const author = await AppDataSource.getRepository(User).findOne({where: {email: email}})
    const post = this.repository.create({...data, author})
    return this.repository.save(post)
  }

  async update(id, updates, email) {
    const author = await AppDataSource.getRepository(User).findOne({where:{email}})

    const post = await this.repository.findOne({where:{id},relations:["author"]})

    if(author.user_id != post.author.user_id) return {error:"This is not your post"}

    await this.repository.update(id, updates)
    return this.repository
      .createQueryBuilder('newsPost')
      .leftJoin("newsPost.author", "author")
      .addSelect("author.email")
      .where("newsPost.id = :id", {id})
      .getOne()
  }

  async delete(id, email) {
    const author = await AppDataSource.getRepository(User).findOne({where:{email}})

    const post = await this.repository.findOne({where:{id},relations:["author"]})

    if (!post) return {error: "Post wasnt found"}
    
    if(author.email != post.author.email) return {error:"This is not your post"}
    
    await this.repository.remove(post)
    return post
  }
}

