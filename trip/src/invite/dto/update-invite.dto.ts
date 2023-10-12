import { PartialType } from '@nestjs/mapped-types';
import { CreateInviteDto } from './create-invite.dto';
import { IsEnum } from 'class-validator';
import { STATUS } from '../interface/interface';

export class UpdateInviteDto extends PartialType(CreateInviteDto) {
  @IsEnum(STATUS)
  status: STATUS;
}
