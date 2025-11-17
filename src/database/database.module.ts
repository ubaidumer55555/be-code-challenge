import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './entity/user.entity';
import { DatabaseService } from './database.service';
import { UserModule } from 'src/user/user.module';
import { Invite } from './entity/invite.entity';
import { Task } from './entity/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [User, Invite, Task],
        synchronize: true,
        ssl: { rejectUnauthorized: false },
      }),
    }),
    UserModule,
  ],
  providers: [DatabaseService],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private readonly databaseService: DatabaseService) {}
  async onModuleInit() {
    await this.databaseService.seedUsers();
  }
}
