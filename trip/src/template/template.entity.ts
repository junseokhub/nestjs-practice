import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  id: number;
}
