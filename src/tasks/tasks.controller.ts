import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { UseGuards } from '@nestjs/common';
import { JwtStrategy } from '../auth/jwt-auth.guard';

@UseGuards(JwtStrategy)
 

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() task: Task): Task {
    return this.tasksService.create(task);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() task: Task): Task {
    return this.tasksService.update(Number(id), task);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.tasksService.remove(Number(id));
  }
}
