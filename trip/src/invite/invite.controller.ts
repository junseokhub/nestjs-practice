import { Controller, Post, Body } from '@nestjs/common';
import { InviteService } from './invite.service';
import { CreateInviteDto } from './dto/create-invite.dto';

@Controller('invite')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Post()
  async inviteUser(@Body() createInviteDto: CreateInviteDto) {
    return await this.inviteService.inviteUser(createInviteDto);
  }
}
