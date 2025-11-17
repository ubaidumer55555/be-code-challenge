import { TaskStatus } from 'src/util/enum/task-status.enum';

export interface ITaskCreate {
  title: string;
  status?: TaskStatus;
  userId: string;
}
