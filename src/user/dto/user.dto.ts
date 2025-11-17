import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/util/enum/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class SignupUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;

  @ApiProperty({ example: UserRole.CLIENT })
  @IsNotEmpty()
  @IsEnum(UserRole)
  @IsString()
  role: UserRole;

  @ApiProperty({ example: 'invite-token-abc' })
  @IsNotEmpty()
  @IsString()
  token: string;
}

export class LoginUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;
}
