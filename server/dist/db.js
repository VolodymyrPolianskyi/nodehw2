import { DataSource } from 'typeorm';
import { User } from "./entity/User.js";
import { NewsPost } from "./entity/NewsPost.js";
import "reflect-metadata";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 1488,
    username: "postgres",
    password: "1234",
    database: "hwNode2",
    synchronize: true,
    entities: [User, NewsPost],
});
