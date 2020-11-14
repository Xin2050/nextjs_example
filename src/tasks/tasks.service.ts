import { Injectable, NotFoundException } from '@nestjs/common';


import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository) {

  }

  getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id "${id}" not found.`);
    }
    return found;
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id "${id}" not found.`);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;

  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }
}