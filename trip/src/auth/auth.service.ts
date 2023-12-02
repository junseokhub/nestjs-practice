import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Payload } from './interface/jwt.payload';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { RedisCacheService } from 'src/common/redis-cache/redis-cache.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisCacheService: RedisCacheService,
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

  async generateRefreshToken(user: User): Promise<string> {
    const payload: Payload = {
      id: user.id,
      kakaoId: user.kakaoId,
      googleId: user.googleId,
      email: user.email,
    }
    return this.jwtService.signAsync({
      id: payload.id,
      kakaoId: user.kakaoId,
      googleId: user.googleId,
      email: user.email,
     }, 
     {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME'),
    },);
  }

  async setRefreshToken(user_email: string, refresh_token: string) {
    const user = await this.userService.findOneUserEmail(user_email);
    const hashedToken = await this.getCurrentHashedRefreshToken(refresh_token);
    await this.redisCacheService.setKeyValue(user_email, hashedToken, 'PX', parseInt(process.env.JWT_REFRESH_EXPIRATION_TIME));
    return user;
  }
  
  async getCurrentHashedRefreshToken(refresh_token: string) {
    const currentRefreshToken = await bcrypt.hash(refresh_token, 10);
    return currentRefreshToken;
  }

  async removeRefreshToken(id: number) {
    return await this.redisCacheService.deleteKeyValue(id);
  }

  async getUserIfRefreshTokenMatches( id: number, refresh_token: string): Promise<User> {
    const user: User = await this.userService.findOneUser(id);
    const getRefreshTokenInRedis = await this.redisCacheService.getKey(user.user_email);
    const isRefreshTokenMatching = await bcrypt.compare(
      refresh_token,
      getRefreshTokenInRedis
    );
    if (isRefreshTokenMatching) {
      return user;
    } 
    return user;
  }

  async refresh(user: User) : Promise<string>{
    const findOneUser = await this.userService.findOneUser(user.id);
    const getKeyInRedis = await this.redisCacheService.getKey(user.user_email);
    const accessToken = await this.generateAccessToken(user);
    if (!findOneUser) {
      throw new UnauthorizedException('User is not found.');
    }
    if (!getKeyInRedis) {
      throw new UnauthorizedException('RefreshToken is not found.');
    }
    return accessToken;
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
