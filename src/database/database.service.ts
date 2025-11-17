import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { UserRole } from 'src/util/enum/user-role.enum';
import { hashPassword } from 'src/util/helper/password.helper';

const seedUserArray = [
  {
    email: 'admin@example.com',
    password: 'Admin@123',
    role: UserRole.ADMIN,
  },
];

@Injectable()
export class DatabaseService {
  constructor(private readonly userRepository: UserRepository) {}

  async seedUsers() {
    for (const userElement of seedUserArray) {
      const existingUser = await this.userRepository.findUserByEmail(
        userElement.email,
      );
      if (existingUser) {
        continue;
      }
      const hashedPassword = await hashPassword(userElement.password);
      await this.userRepository.createUser({
        email: userElement.email,
        password: hashedPassword,
        role: userElement.role,
      });
    }
  }
}
