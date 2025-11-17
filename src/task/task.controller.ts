import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { JwtAuthGuard } from 'src/util/decorator/auth/auth.guard';
import { UserRole } from 'src/util/enum/user-role.enum';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { Task } from 'src/database/entity/task.entity';
import { DeleteResult } from 'typeorm';

interface AuthRequest extends Express.Request {
  user?: { sub: string; email: string; role: UserRole };
}

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('/tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOperation({ summary: 'Get tasks with optional filters' })
  @ApiResponse({ status: 200, description: 'Returns tasks and total count' })
  @ApiQuery({ name: 'status', required: false, example: 'TODO' })
  @ApiQuery({ name: 'userName', required: false, example: 'alice@example.com' })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  getAllTasks(
    @Req() req: AuthRequest,
    @Query('status') status?: string,
    @Query('userName') userName?: string,
    @Query('offset') offset?: string,
    @Query('limit') limit?: string,
  ): Promise<{ data: Task[]; count: number }> {
    if (!req.user) {
      return Promise.resolve({ data: [], count: 0 });
    }
    const { role, sub: userId } = req.user;
    const offsetNum = offset ? parseInt(offset, 10) || 0 : 0;
    const limitNum = limit ? parseInt(limit, 10) || 10 : 10;
    return this.taskService.getAllTasks(
      role,
      userId,
      status,
      userName,
      offsetNum,
      limitNum,
    );
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get task by id' })
  @ApiResponse({ status: 200, description: 'Returns task' })
  @ApiParam({ name: 'id', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  getTaskById(@Param('id') id: string, @Req() req: AuthRequest): Promise<Task> {
    const userId = req.user?.sub || '';
    return this.taskService.getTaskById(id, userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a task' })
  @ApiResponse({ status: 201, description: 'Task created' })
  @ApiBody({
    type: CreateTaskDto,
    examples: {
      default: { value: { title: 'Write integration tests', status: 'TODO' } },
    },
  })
  createTask(
    @Body() dto: CreateTaskDto,
    @Req() req: AuthRequest,
  ): Promise<Task> {
    const userId = req.user?.sub || '';
    return this.taskService.createTask(dto, userId);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'Task updated' })
  @ApiParam({ name: 'id', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @ApiBody({
    type: UpdateTaskDto,
    examples: {
      default: { value: { title: 'Fix typo', status: 'IN_PROGRESS' } },
    },
  })
  updateTask(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
    @Req() req: AuthRequest,
  ): Promise<Task | null> {
    const userId = req.user?.sub || '';
    return this.taskService.updateTask(id, dto, userId);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'Task deleted' })
  @ApiParam({ name: 'id', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  deleteTask(
    @Param('id') id: string,
    @Req() req: AuthRequest,
  ): Promise<DeleteResult> {
    const userId = req.user?.sub || '';
    return this.taskService.deleteTask(id, userId);
  }
}
