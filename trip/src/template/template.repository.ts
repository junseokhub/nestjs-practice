import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Template } from "./template.entity";
import { CreateTemplateDto } from "./dto/create-template.dto";
import { plainToInstance } from "class-transformer";
import { UpdateTemplateDto } from "./dto/update-template.dto";

@Injectable()
export class TemplateRepository extends Repository<Template> {
  constructor(private dataSource: DataSource) {
    super(Template, dataSource.createEntityManager());
  }
  
  async findAllTemplate() {
    return await this.find();
  }

  async findOneTemplate(id: number) {
    return await this.findOne({
      where: { id },
    });
  }

  async createTemplate(createTemplateDto: CreateTemplateDto): Promise<Template> {
    const template: Template = plainToInstance(Template, createTemplateDto);
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(createTemplateDto);
      await queryRunner.commitTransaction();
      return template;
    } catch (err){
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async updateTemplate(id: number, updateTemplateDto: UpdateTemplateDto) {
    const template: Template = plainToInstance(Template, updateTemplateDto);
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(Template, id, updateTemplateDto);
      await queryRunner.commitTransaction();
      return template;
    } catch (err){
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}