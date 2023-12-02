import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtAccessAuthGuard } from './guard/jwt-access.guard';
import { UserService } from 'src/user/user.service';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    ) {}

  async integrationLogin(req: Request, res: Response){
    const user = await this.authService.googleLogin(req) || await this.authService.kakaoLogin(req);
    const accessToken = await this.authService.generateAccessToken(user);
    const refreshToken = await this.authService.generateRefreshToken(user);
    res.setHeader('Authorization', 'Bearer ' + [accessToken, refreshToken]);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: parseInt(process.env.JWT_ACCESS_EXPIRATION_TIME),
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: parseInt(process.env.JWT_REFRESH_EXPIRATION_TIME),
    });
  
  }

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
    await this.authService.googleLogin(req);
    return res.redirect(process.env.REDIRECT_URL)
  }

  @Get('/kakao/login')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin(@Req() req: Request, @Res() res: Response) {
    await this.generateTokenCookie(req, res);
    await this.authService.kakaoLogin(req);
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


  @Post('logout')
  @UseGuards(JwtRefreshGuard)
  async logout(@Req() req: Request, @Res() res: Response) {
    await this.authService.removeRefreshToken(req.user.id);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.send({
      message: 'logout success'
    });
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  async regenerateAccessToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    const newAccessToken = await this.authService.refresh(user);
    res.setHeader('Authorization', 'Bearer ' + newAccessToken);
    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      maxAge: parseInt(process.env.JWT_ACCESS_EXPIRATION_TIME),
    });
    res.send({
      id: user.id,
      user_email: user.user_email,
      user_name: user.user_name,
      access_token: newAccessToken,
    });
  }
}
