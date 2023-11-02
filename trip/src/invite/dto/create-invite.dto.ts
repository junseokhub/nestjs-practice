import { IsNumber } from "class-validator";

export class CreateInviteDto {
  @IsNumber()
  sendId: number;

  @IsNumber()
  receiveId: number;
}
