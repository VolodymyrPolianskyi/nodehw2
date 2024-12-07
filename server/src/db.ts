import { config } from 'dotenv';
config()
import { DataSource } from 'typeorm'
import {User} from "./entity/User.js"
import {NewsPost} from "./entity/NewsPost.js"
import "reflect-metadata";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  synchronize: true,
  entities: [User, NewsPost],
})
