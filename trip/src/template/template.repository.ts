import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Template } from "./template.entity";

@Injectable()
export class TemplateRepository extends Repository<Template> {
  constructor(private dataSource: DataSource) {
    super(Template, dataSource.createEntityManager());
  }
}