import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { KakaoUserDto } from './dto/kakao-user.dto';
import { GoogleUserDto } from './dto/google-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async findAllUser() {
    return await this.userRepository.findAllUser();
  }

  async findOneUserEmail(email: string) {
    return await this.userRepository.findOneUserEmail(email);
  }

  async findOneKakaoId(kakaoId: number) {
    return await this.userRepository.findOneUserKakaoId(kakaoId);
  }

  async findOneGoogleId(googleId: string) {
    return await this.userRepository.findOneUserGoogleId(googleId);
  }

  async signUpKaKaoUser(kakoUserDto: KakaoUserDto): Promise<User> {
    const user = new User();
    user.type = 'kakao';
    user.email = kakoUserDto.email;
    user.name = kakoUserDto.name;
    user.kakaoId = kakoUserDto.kakaoId;

    await this.userRepository.createKaKaoUser(user);
    return user
  }

  async signUpGoogleUser(googleUserDto: GoogleUserDto) {
    await this.userRepository.findOneUserGoogleId(googleUserDto.googleId);
    const user = new User();
    user.type = 'google';
    user.email = googleUserDto.email;
    user.name = googleUserDto.name;
    user.googleId = googleUserDto.googleId;

    await this.userRepository.createGoogleUser(user);
    return user;
  }
}
