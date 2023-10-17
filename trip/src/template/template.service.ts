import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { TemplateRepository } from './template.repository';
import { UserService } from 'src/user/user.service';
import { Template } from './template.entity';

@Injectable()
export class TemplateService {
  constructor(
    private readonly templateRepository: TemplateRepository,
    private readonly userService: UserService,
  ) {}

  async findAllTemplate() {
    return await this.templateRepository.findAllTemplate();
  }

  async findOneTemplate(id: number) {
    const template = await this.templateRepository.findOneTemplate(id);
    if (!template) {
      throw new NotFoundException('template is not found.');
    }
    return template;
  }

  async findOneUserWithTemplate(userId: number) {
    const template = await this.userService.findOneUserWithTemplate(userId);
    return template.template;
  }
  
  async createTemplate(createTemplateDto: CreateTemplateDto) {
    const template = new Template();
    template.userId = createTemplateDto.userId;
    await this.templateRepository.createTemplate(template);
    return template;
  }
}
