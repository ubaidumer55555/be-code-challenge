import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { Invite } from 'src/database/entity/invite.entity';
import { InviteRepository } from './invite.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Invite])],
  controllers: [InviteController],
  providers: [InviteService, InviteRepository],
  exports: [InviteService],
})
export class InviteModule {}
