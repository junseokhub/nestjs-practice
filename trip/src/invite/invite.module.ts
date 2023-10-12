import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invite } from './invite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invite]),
    UserModule,
  ],
  controllers: [InviteController],
  providers: [
    InviteService,
  ],
  exports: [
    InviteService,
  ],
})
export class InviteModule {}
