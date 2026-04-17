import { IsString } from "class-validator";

export class AppleUserDto {
  @IsString()
  appleId: string;
}