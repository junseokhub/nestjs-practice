import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  createdId: number;

  @Column({ nullable: true })
  updatedId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.template, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'createdId' }, { name: 'updatedId'}])
  user: User;
}
