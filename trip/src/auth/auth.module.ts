import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategy/google.strategy';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessAuthGuard } from './guard/jwt-access.guard';
import { RedisCacheService } from 'src/common/redis-cache/redis-cache.service';

@Module({
  imports: [
    UserModule,
    PassportModule.register({}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRATION_TIME'),
        } 
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    KakaoStrategy,
    GoogleStrategy,
    JwtModule,
    JwtAccessAuthGuard,
    RedisCacheService,
  ]
})
export class AuthModule {}
