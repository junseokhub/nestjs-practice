import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { STATUS } from "../interface/interface";

export class CreateInviteDto {
  @IsNumber()
  sendId: number;
<<<<<<< HEAD

  @IsString()
  receiveUser: string;

  @IsNumber()
  @IsOptional()
  receiveId: number;

  @IsEnum(STATUS)
  status: STATUS;
=======

  @IsNumber()
  receiveId: number;
>>>>>>> master
}
