import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendInviteDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
}

export class ValidateTokenDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}
