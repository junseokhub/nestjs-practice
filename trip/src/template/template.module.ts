import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from './template.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Template]),
    UserModule,
  ],
  controllers: [TemplateController],
  providers: [
    TemplateService,
  ],
  exports: [
    TemplateService,
  ],
})
export class TemplateModule {}
