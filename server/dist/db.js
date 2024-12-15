import { config } from 'dotenv';
config();
import { DataSource } from 'typeorm';
import { User } from "./entity/User.js";
import { NewsPost } from "./entity/NewsPost.js";
import "reflect-metadata";
import { AddDeletedColumns1733774555699 } from './migrations/1733774555699-AddDeletedColumns.js';
import { AddIndexesToColumns1733774489797 } from './migrations/1733774489797-AddIndexesToColumns.js';
import { RenameTitleToHeader1733774515040 } from './migrations/1733774515040-RenameTitleToHeader.js';
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: +process.env.DB_PORT || 1488,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    synchronize: false,
    entities: [User, NewsPost],
    migrations: [AddDeletedColumns1733774555699, AddIndexesToColumns1733774489797, RenameTitleToHeader1733774515040]
});
