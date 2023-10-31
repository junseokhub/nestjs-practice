import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { STATUS } from "./interface/interface";
import { User } from "src/user/user.entity";

@Entity()
export class Invite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sendId: number;

  @Column()
  receiveId: number;

  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.PENDING,
  })
  status: STATUS;

  @ManyToOne(() => User, (user) => user.invite, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'sendId' }, { name: 'receiveId'}])
  user: User;
}
