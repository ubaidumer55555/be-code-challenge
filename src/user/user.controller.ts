import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto, SignupUserDto } from './dto/user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/database/entity/user.entity';
import { ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Create a user (requires invite token)' })
  @ApiResponse({ status: 201, description: 'User created', type: User })
  @ApiBody({
    type: SignupUserDto,
    examples: {
      default: {
        summary: 'Sample signup',
        value: {
          email: 'user@example.com',
          password: 'strongPassword123',
          role: 'USER',
          token: 'invite-token-abc',
        },
      },
    },
  })
  signup(@Body() dto: SignupUserDto): Promise<User> {
    return this.userService.signup(dto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Returns access token' })
  @ApiBody({
    type: LoginUserDto,
    examples: {
      default: {
        summary: 'Sample login',
        value: { email: 'user@example.com', password: 'strongPassword123' },
      },
    },
  })
  login(@Body() dto: LoginUserDto): Promise<{ accessToken: string }> {
    return this.userService.login(dto);
  }
}
