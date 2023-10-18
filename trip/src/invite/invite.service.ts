import { Injectable } from '@nestjs/common';
import { CreateInviteDto } from './dto/create-invite.dto';
import { UpdateInviteDto } from './dto/update-invite.dto';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Invite } from './invite.entity';
import { Repository } from 'typeorm';
import { STATUS } from './interface/interface';

@Injectable()
export class InviteService {
  constructor(
    @InjectRepository(Invite)
    private readonly inviteRepository: Repository<Invite>,
    private readonly userService: UserService,
  ) {}

  async findOneInvite(userId: number) {
    await this.userService.findOneUserWithInvite(userId);
  }

  async inviteUser(createInviteDto: CreateInviteDto) {
    const sendUser = await this.userService.findOneUser(createInviteDto.sendId);
    const receiveUser = await this.userService.findOneUserEmail(createInviteDto.receiveUser);

    const invite = new Invite();
    invite.sendId = sendUser.id;
    invite.status = STATUS.PENDING;
    invite.recieveId = receiveUser.id;

    await this.inviteRepository.save(invite);
    return invite;
  }
}

