import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  createdId: number;

  @Column({ nullable: true })
  updatedId: number;

  @ManyToOne(() => User, (user) => user.template, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'createdId' }, { name: 'updatedId'}])
  user: User;
}
