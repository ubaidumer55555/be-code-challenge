import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getAllTasks(userId: string) {
    return await this.taskRepository.findAllTasks(userId);
  }

  async getTaskById(id: string, userId: string) {
    const task = await this.taskRepository.findTaskById(id, userId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async createTask(dto: CreateTaskDto, userId: string) {
    return await this.taskRepository.createTask({
      title: dto.title,
      status: dto.status,
      userId,
    });
  }

  async updateTask(id: string, dto: UpdateTaskDto, userId: string) {
    await this.getTaskById(id, userId);
    return await this.taskRepository.updateTask(id, dto);
  }

  async deleteTask(id: string, userId: string) {
    await this.getTaskById(id, userId);
    return await this.taskRepository.deleteTask(id);
  }
}
