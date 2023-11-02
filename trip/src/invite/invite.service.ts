import { Injectable } from '@nestjs/common';
import { CreateInviteDto } from './dto/create-invite.dto';
import { UpdateInviteDto } from './dto/update-invite.dto';
import { UserService } from 'src/user/user.service';
import { TemplateService } from 'src/template/template.service';
import { InviteRepository } from './invite.repository';
import { Invite } from './invite.entity';

@Injectable()
export class InviteService {
  constructor(
    private readonly inviteRepository: InviteRepository,
    private readonly userService: UserService,
    private readonly templateService: TemplateService,
  ) {}

  async inviteUser(createInviteDto: CreateInviteDto) {
    const sendUser = await this.userService.findOneUser(createInviteDto.sendId);
    const receiveUser = await this.userService.findOneUser(createInviteDto.receiveId);

    const invite = new Invite();
    invite.sendId = sendUser.id;
    invite.receiveId = receiveUser.id;

    await this.inviteRepository.save(invite);
    return invite;
  }
}
