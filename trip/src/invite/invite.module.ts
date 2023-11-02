import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invite } from './invite.entity';
import { TemplateModule } from 'src/template/template.module';
import { InviteRepository } from './invite.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invite]),
    UserModule,
    TemplateModule,
  ],
  controllers: [InviteController],
  providers: [
    InviteService,
    InviteRepository,
  ],
  exports: [
    InviteService,
    InviteRepository,
  ],
})
export class InviteModule {}
