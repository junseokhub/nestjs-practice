import { IsString } from "class-validator";

export class GoogleUserDto {
  @IsString()
  googleId: string;
  
  @IsString()
  email: string;

  @IsString()
  name: string;

}
