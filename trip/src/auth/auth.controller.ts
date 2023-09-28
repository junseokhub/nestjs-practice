import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Get('/google/login')
  @UseGuards(AuthGuard('google'))
  async kakaoLogin(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return await this.authService.googleLogin({req,res});
  }

  @Get('/kakao/login')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(
    @Req() req: Request, @Res() res: Response) {
    await this.authService.kakaoLogin({ req, res });
  }
}
