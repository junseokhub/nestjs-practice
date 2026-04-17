import { IsNumber, IsString } from "class-validator";

export class KakaoUserDto {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsNumber()
  kakaoId: number;
}