import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation } from "typeorm"
import { User } from "./User.js";

@Entity()
export class NewsPost {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  header:string;

  @Column()
  text:string;

  @Column({default:false})
  deleted: boolean;

  @ManyToOne(()=>User, (user)=>user.newsPosts)
  @JoinColumn({name:'user_id'})
  author: Relation<User>
}
