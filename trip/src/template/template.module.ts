import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from './template.entity';
import { UserModule } from 'src/user/user.module';
import { TemplateRepository } from './template.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Template]),
    UserModule,
  ],
  controllers: [TemplateController],
  providers: [
    TemplateService,
    TemplateRepository,
  ],
  exports: [
    TemplateService,
    TemplateRepository,
  ],
})
export class TemplateModule {}
