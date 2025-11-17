import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from 'src/database/entity/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ITaskCreate } from './interface/task.interface';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repo: Repository<Task>,
  ) {}

  findAllTasks(userId: string) {
    return this.repo.find({ where: { userId } });
  }

  findTaskById(id: string, userId: string) {
    return this.repo.findOne({ where: { id, userId } });
  }

  createTask(data: ITaskCreate) {
    return this.repo.save(data);
  }

  deleteTask(id: string) {
    return this.repo.delete(id);
  }

  async updateTask(id: string, data: Partial<ITaskCreate>) {
    await this.repo.update(id, data);
    const updatedTask = await this.repo.findOne({ where: { id } });
    return updatedTask;
  }
}
