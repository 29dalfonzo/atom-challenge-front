/* eslint-disable no-param-reassign */
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskAction, TaskActionEnum } from 'src/app/interfaces/taskAction.interface';

import { AuthService } from '../login/auth.service';
import { TaskFormComponent } from "./task-form/task-form.component";
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from './Tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  standalone: true,
  providers: [AuthService, TaskService],
  imports: [CommonModule, MatButtonModule, MatCardModule,
    MatFormFieldModule, MatInputModule,
    MatProgressBarModule, MatDividerModule, MatListModule, ReactiveFormsModule, MatCheckboxModule,
    MatTooltipModule, MatIconModule, TaskFormComponent, HttpClientModule, TaskItemComponent],
})
export class TasksComponent implements OnInit {
  task: Task | null = null;

  loading = false;
  tasks:Task[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    public tasksService: TaskService
  ) { }

  ngOnInit(): void {
    this.validateLogin();
  }

  validateLogin(): void {
    if (!this.authService.validateLogin()) {
      this.router.navigate(['/login']);
    }
  }

  changeTask(task: Task):void {
    // TODO: meterle toast
    this.tasksService.updateTask({ ...task, done: !task.done });
  }

  handleForm(task: TaskAction): void {
    this.loading = true;
    const { action, ...taskWithoutAction } = task;
    switch (action) {
      case TaskActionEnum.CREATE:
        this.tasksService.addTask(this.tasksService.validateTask(taskWithoutAction));
        break;
      case TaskActionEnum.EDIT:
        this.tasksService.updateTask(taskWithoutAction);
        break;
      default:
        break;
    }
    this.loading = false;
  }
  handleTaskAction(taskAction: TaskAction): void {
    this.loading = true;
    const { action, ...taskWithoutAction } = taskAction;
    switch (action) {
      case TaskActionEnum.CREATE:
        this.tasksService.addTask(this.tasksService.validateTask(taskWithoutAction));
        break;
      case TaskActionEnum.UPDATE:
        this.tasksService.updateTask(taskWithoutAction);
        break;
      case TaskActionEnum.EDIT:
        this.task = taskWithoutAction;
        break;
      case TaskActionEnum.DELETE:
        this.tasksService.deleteTask(taskWithoutAction);
        break;
      default:
        break;
    }
    this.loading = false;
  }

  editTask(task: Task): void {
    this.task = task;
  }

  deleteTask(task: Task): void {
    this.tasksService.deleteTask(task);
  }
  logout(): void {
    this.router.navigate(['/login']);
  }
}
