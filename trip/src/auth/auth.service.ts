import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {}
  
  async kakaoLogin({ req, res }) {
    const user = await this.userService.findOneKakaoId(req.user.kakaoId);
    if (user == null) {
      await this.userService.signUpKaKaoUser({
        email: req.user.email || null,
        name: req.user.name,
        kakaoId: req.user.kakaoId,
      });
    } 
   return user;
  }

  async googleLogin({ req, res }) {
    const user = await this.userService.findOneGoogleId(req.user.googleId);
    return await this.userService.signUpGoogleUser({
      email: req.user.email,
      name: req.user.name,
      googleId: req.user.googleId,
    });
  }
}
