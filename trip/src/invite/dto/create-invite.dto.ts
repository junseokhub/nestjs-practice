import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { STATUS } from "../interface/interface";

export class CreateInviteDto {
  @IsNumber()
  sendId: number;

  @IsString()
  receiveUser: string;

  @IsNumber()
  @IsOptional()
  receiveId: number;

  @IsEnum(STATUS)
  status: STATUS;
}
