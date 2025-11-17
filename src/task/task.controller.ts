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
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { JwtAuthGuard } from 'src/util/decorator/auth/auth.guard';

interface AuthRequest extends Express.Request {
  user?: { sub: string; email: string; role: string };
}

@Controller('/tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTasks(@Req() req: AuthRequest) {
    const userId = req.user?.sub || '';
    return this.taskService.getAllTasks(userId);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @Req() req: AuthRequest) {
    const userId = req.user?.sub || '';
    return this.taskService.getTaskById(id, userId);
  }

  @Post()
  createTask(@Body() dto: CreateTaskDto, @Req() req: AuthRequest) {
    const userId = req.user?.sub || '';
    return this.taskService.createTask(dto, userId);
  }

  @Put('/:id')
  updateTask(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
    @Req() req: AuthRequest,
  ) {
    const userId = req.user?.sub || '';
    return this.taskService.updateTask(id, dto, userId);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @Req() req: AuthRequest) {
    const userId = req.user?.sub || '';
    return this.taskService.deleteTask(id, userId);
  }
}
