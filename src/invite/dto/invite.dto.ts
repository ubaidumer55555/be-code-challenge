import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendInviteDto {
  @ApiProperty({ example: 'invitee@example.com' })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
}

export class ValidateTokenDto {
  @ApiProperty({ example: 'token-hex-string' })
  @IsNotEmpty()
  @IsString()
  token: string;
}
