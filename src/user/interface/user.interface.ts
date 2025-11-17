import { UserRole } from 'src/util/enum/user-role.enum';

export interface IUserCreate {
  email: string;
  password: string;
  role: UserRole;
}
