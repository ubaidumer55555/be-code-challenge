import { IsString, IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/util/enum/task-status.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Write unit tests' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: TaskStatus.TODO })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus = TaskStatus.TODO;
}

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Improve README' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: TaskStatus.COMPLETE })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
