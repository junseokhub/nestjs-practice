import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtAccessAuthGuard } from './guard/jwt-access.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    ) {}

  private async generateTokenCookie(req: Request, res: Response){
    const accessToken = await this.authService.generateAccessToken(req.user);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: parseInt(process.env.JWT_ACCESS_EXPIRATION_TIME),
     });
  }
  
  @Get('/google/login')
  @UseGuards(AuthGuard('google'))
  async googleLogin(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.generateTokenCookie(req, res);
    await this.authService.googleLogin({ req, res });
    return res.redirect(process.env.REDIRECT_URL)
  }

  @Get('/kakao/login')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin(@Req() req: Request, @Res() res: Response) {
    await this.generateTokenCookie(req, res);
    await this.authService.kakaoLogin({ req, res });
    return res.redirect(process.env.REDIRECT_URL)
  }

  @Get('/apple/login')
  @UseGuards(AuthGuard('apple'))
  async appleLogin(@Req() req: Request, @Res() res: Response) {
    console.log(res);
  }


  @Get('/authenticate')
  @UseGuards(JwtAccessAuthGuard)
  async user(@Req() req: Request, @Res() res: Response) {
    const id: number = req.user.id; 
    const user: User = await this.userService.findOneUser(id);
    return res.send(user);
  }
}
