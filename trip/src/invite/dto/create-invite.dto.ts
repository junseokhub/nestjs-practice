import { IsNumber } from "class-validator";

export class CreateInviteDto {
  @IsNumber()
  inviteId: number;

  @IsNumber()
  invitedId: number;
}
