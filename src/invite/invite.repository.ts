import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Invite } from 'src/database/entity/invite.entity';
import { IInviteCreate } from './interface/invite.interface';

@Injectable()
export class InviteRepository {
  constructor(
    @InjectRepository(Invite)
    private readonly repo: Repository<Invite>,
  ) {}

  findInviteById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  findInviteByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  findInviteByToken(token: string) {
    return this.repo.findOne({ where: { token } });
  }

  createInvite(data: IInviteCreate) {
    return this.repo.save(data);
  }

  async updateInvite(id: string, data: Partial<IInviteCreate>) {
    await this.repo.update(id, data);
    return this.findInviteById(id);
  }
}
