import { Invite } from 'src/invite/invite.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { LoginType } from './interface/interface';
import { Template } from 'src/template/template.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: LoginType,
  })
  type: LoginType;

  @Column({ nullable: true })
  kakaoId: number;

  @Column({ nullable: true })
  googleId: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  profile: string;

  @Column({
    type: 'timestamp',
    precision: 6,
    nullable: true,
   })
   loginAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Invite, invite => invite.user, { cascade: true })
  invite: Invite[];

  @OneToMany(() => Template, template => template.user, { cascade: true })
  template: Template[];
}
