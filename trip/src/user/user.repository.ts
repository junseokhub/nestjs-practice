import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { plainToInstance } from 'class-transformer';
import { GoogleUserDto } from './dto/google-user.dto';
import { KakaoUserDto } from './dto/kakao-user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findAllUser() {
    return await this.find();
  }

  async findOneUser(id: number) {
    return await this.findOne({
      where: { id },
    });
  }

  async findOneUserEmail(email: string) {
    return await this.findOne({
      where: { email },
    });
  }

  async findOneUserKakaoId(kakaoId: number) {
    return await this.findOne({
      where: { kakaoId },
    });
  }

  async findOneUserGoogleId(googleId: string) {
    return await this.findOne({
      where: { googleId },
    });
  }

  async findOneUserWithTemplate(id: number) {
    return await this.findOne({
      where: { id },
      relations: ['template'],
    });
  }

  async createGoogleUser(createUserDto: GoogleUserDto): Promise<User> {
    const user: User = plainToInstance(User, createUserDto);
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(createUserDto);
      await queryRunner.commitTransaction();
      return user;
    } catch (err){
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async createKaKaoUser(createUserDto: KakaoUserDto): Promise<User> {
    const user: User = plainToInstance(User, createUserDto);
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(createUserDto);
      await queryRunner.commitTransaction();
      return user;
    } catch (err){
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
