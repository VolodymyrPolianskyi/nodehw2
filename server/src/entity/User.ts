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

    @Column({default:false})
    deleted: boolean;

    @OneToMany(()=>NewsPost, (newsPost) => newsPost.author)
    newsPosts: Relation<NewsPost[]>
}


