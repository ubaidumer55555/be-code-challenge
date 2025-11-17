import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InviteModule } from './invite/invite.module';
import { TaskModule } from './task/task.module';
import { RoleGuard } from './util/decorator/auth/role.guard';
import { JwtAuthGuard } from './util/decorator/auth/auth.guard';
import { JwtStrategy } from './util/decorator/auth/auth.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    UserModule,
    InviteModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService, RoleGuard, JwtAuthGuard, JwtStrategy],
})
export class AppModule {}
