import { IsNumber, IsOptional } from "class-validator";

export class CreateInviteDto {
  @IsNumber()
  sendId: number;

  @IsNumber()
  @IsOptional()
  receiveId: number;

  @IsNumber()
  templateId: number;

}
