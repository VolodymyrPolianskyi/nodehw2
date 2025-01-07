import { config } from 'dotenv';
config()
import { DataSource } from 'typeorm'
import {User} from "./entity/User"
import {NewsPost} from "./entity/NewsPost"
import "reflect-metadata";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: +process.env.PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  ssl:{
    rejectUnauthorized:false
  },
  synchronize: true,
  entities: [User, NewsPost]
})
