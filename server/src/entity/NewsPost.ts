import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation } from "typeorm"
import { User } from "./User.js";

@Entity()
export class NewsPost {
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"text"})
  header:string;

  @Column({type:"text"})
  text:string;

  @Column({default:false, type:'boolean'})
  deleted: boolean;

  @ManyToOne(()=>User, (user)=>user.newsPosts)
  @JoinColumn({name:'user_id'})
  author: Relation<User>
}
