import { IsNumber } from "class-validator";

export class CreateTemplateDto {
  @IsNumber()
  userId: number;
}
