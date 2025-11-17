import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { LoginUserDto, SignupUserDto } from './dto/user.dto';
import { hashPassword, verifyPassword } from 'src/util/helper/password.helper';
import { JwtService } from '@nestjs/jwt';
import { InviteService } from 'src/invite/invite.service';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly inviteService: InviteService,
    private readonly userRepository: UserRepository,
  ) {}

  async signup(dto: SignupUserDto) {
    const existingUser = await this.userRepository.findUserByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('User Email already exists');
    }

    const hashedPassword = await hashPassword(dto.password);
    const isValid = await this.inviteService.validateInvite({
      token: dto.token,
    });

    if (!isValid) {
      throw new BadRequestException('Invalid invite token');
    }

    return await this.userRepository.createUser({
      email: dto.email,
      password: hashedPassword,
      role: dto.role,
    });
  }

  async login(dto: LoginUserDto) {
    const existingUser = await this.userRepository.findUserByEmail(dto.email);
    if (!existingUser) {
      throw new BadRequestException('Invalid credentials');
    }

    const isMatch = await verifyPassword(existingUser.password, dto.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = {
      sub: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    };
    const token = this.jwtService.sign(payload);

    return { accessToken: token };
  }
}
