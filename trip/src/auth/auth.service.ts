import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Payload } from './interface/jwt.payload';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async generateAccessToken(user: User): Promise<string> {
    const payload: Payload = {
      id: user.id,
      kakaoId: user.kakaoId,
      googleId: user.googleId,
      email: user.email
    }
    return this.jwtService.signAsync(payload);
  }
  
  async kakaoLogin(req: Request) {
    const user = await this.userService.findOneKakaoId(req.user.kakaoId);
    if (!user) {
      await this.userService.signUpKaKaoUser({
        email: req.user.email || null,
        name: req.user.name,
        kakaoId: req.user.kakaoId,
      });
      return user;
    } 
   return user;
  }

  async googleLogin(req: Request) {
    const user = await this.userService.findOneGoogleId(req.user.googleId);
    if (!user) {
      await this.userService.signUpGoogleUser({
        email: req.user.email,
        name: req.user.name,
        googleId: req.user.googleId,
      });
      return user;
    }
    return user;
  }
}
