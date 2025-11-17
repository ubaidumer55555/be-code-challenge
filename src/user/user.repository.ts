import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/database/entity/user.entity';
import { IUserCreate } from './interface/user.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  findUserByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  createUser(data: IUserCreate) {
    return this.repo.save(data);
  }
}
