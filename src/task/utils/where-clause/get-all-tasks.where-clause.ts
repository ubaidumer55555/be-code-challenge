import { UserRole } from 'src/util/enum/user-role.enum';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';
import { Task } from 'src/database/entity/task.entity';
import { User } from 'src/database/entity/user.entity';
import { TaskStatus } from 'src/util/enum/task-status.enum';

export const getAllTasksWhereClause = (
  role: UserRole,
  userId: string,
  status?: string,
  email?: string,
  offset = 0,
  limit = 10,
): FindManyOptions<Task> => {
  const where: FindOptionsWhere<Task> = {};
  const options: FindManyOptions<Task> = {};

  if (role !== UserRole.ADMIN) {
    where.userId = userId;
  } else {
    if (status) {
      where.status = status as unknown as TaskStatus;
    }

    if (email) {
      where.user = { email } as FindOptionsWhere<User>;
    }
  }
  options.relations = ['user'];
  options.where = where;
  options.order = { createdAt: 'DESC' };
  options.skip = offset;
  options.take = limit;

  return options;
};
