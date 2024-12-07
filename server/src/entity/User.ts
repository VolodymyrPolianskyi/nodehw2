import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation } from "typeorm"
import { NewsPost } from "./NewsPost.js";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({unique:true})
    email: string;

    @Column()
    password: string;

    @OneToMany(()=>NewsPost, (newsPost) => newsPost.author)
    newsPosts: Relation<NewsPost[]>
}


