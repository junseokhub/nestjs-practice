import { Invite } from 'src/invite/invite.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

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

  @OneToMany(() => Invite, invite => invite.user, { cascade: true })
  invite: Invite[];
}
