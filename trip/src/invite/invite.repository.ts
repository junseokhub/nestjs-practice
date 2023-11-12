import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Invite } from "./invite.entity";
import { CreateInviteDto } from "./dto/create-invite.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class InviteRepository extends Repository<Invite> {
  constructor(private dataSource: DataSource) {
    super(Invite, dataSource.createEntityManager());
  }

  async findOneInviteWithReceiveId(templateId: number, receiveId: number) {
    return await this.findOne({
      where: {
        templateId,
        receiveId,
      },
    });
  }

  async findInvitedTemplateList(receiveId: number) {
    const templates = await this.find({
      where: { receiveId: receiveId },
      relations: ['user', 'template'],
    });
    return templates;
  }

  async inviteUser(createInviteDto: CreateInviteDto) {
    const invite: Invite = plainToInstance(Invite, createInviteDto);
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(createInviteDto);
      await queryRunner.commitTransaction();
      return invite;
    } catch (err){
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}