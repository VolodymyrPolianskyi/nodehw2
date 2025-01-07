import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation } from "typeorm"
import { NewsPost } from "./NewsPost";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({unique:true, type:'text'})
    email: string;

    @Column({type:'text'})
    password: string;

    @Column({default:false, type:'boolean'})
    deleted: boolean;

    @Column({ default: true, type: 'boolean' })
    sendNotification: boolean;

    @Column({ type: 'text', default: 'log' })
    notificationChannel: 'log' | 'alert';  

    @OneToMany(()=>NewsPost, (newsPost) => newsPost.author)
    newsPosts: Relation<NewsPost[]>
}


