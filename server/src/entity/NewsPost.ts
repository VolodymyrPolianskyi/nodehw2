import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation } from "typeorm"
import { User } from "./User.js";

@Entity()
export class NewsPost {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  title:string;

  @Column()
  text:string;

  @ManyToOne(()=>User, (user)=>user.newsPosts)
  @JoinColumn({name:'user_id'})
  author: Relation<User>
}
