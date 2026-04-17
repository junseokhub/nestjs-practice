import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/user.entity";
import { Template } from "src/template/template.entity";
import { STATUS } from "./interface/interface";

@Entity()
export class Invite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  sendId: number;

  @Column({ nullable: true })
  receiveId: number;

  @Column({ nullable: true })
  templateId: number;

  @Column({ 
    type: 'enum',
    enum: STATUS,
    default: STATUS.PENDING,
   })
   status: STATUS;

  @ManyToOne(() => User, (user) => user.invite, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'sendId' }, { name: 'receiveId'}])
  user: User;

  @ManyToOne(() => Template, (template) => template.invite, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'templateId'}])
  template: Template;
}
