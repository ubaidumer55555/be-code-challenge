import { IsString, IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/util/enum/task-status.enum';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus = TaskStatus.TODO;
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
