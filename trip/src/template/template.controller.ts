import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  async findAllTemplate() {
    return await this.templateService.findAllTemplate();
  }

  @Get('/:id')
  async findOneTemplate(@Param('id') id: number) {
    return await this.templateService.findOneTemplate(id);
  }

  @Get('/user/:userId')
  async findOneUserWithTemplate(@Param('userId') userId: number) {
    return await this.templateService.findOneUserWithTemplate(userId);
  }

  @Post()
  async createTemplate(@Body() createTemplateDto: CreateTemplateDto) {
    return await this.templateService.createTemplate(createTemplateDto);
  }
}
