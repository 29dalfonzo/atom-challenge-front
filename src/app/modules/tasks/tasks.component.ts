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

import { AuthService } from '../login/auth.service';
import { TaskFormComponent } from "./task-form/task-form.component";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  standalone: true,
  providers: [AuthService],
  imports: [CommonModule, MatButtonModule, MatCardModule,
    MatFormFieldModule, MatInputModule,
    MatProgressBarModule, MatDividerModule, MatListModule, ReactiveFormsModule, MatCheckboxModule,
    MatTooltipModule, MatIconModule, TaskFormComponent, HttpClientModule],
})
export class TasksComponent implements OnInit {
  task: Task | null = null;

  loading = false;
  tasks:Task[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      date: new Date(),
      done: false
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description 2',
      date: new Date(),
      done: false
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description 3',
      date: new Date(),
      done: false
    },
  ];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.validateLogin();
  }

  validateLogin(): void {
    if (!this.authService.validateLogin()) {
      this.router.navigate(['/login']);
    }
  }

  changeTask(task: Task):void {
    // TODO: Cambiar el estado de la tarea (done)
    task.done = !task.done;
  }

  handleForm(task: Task): void {
    console.log('Task form', task);
    if (task.id) {
      // TODO: Edit
      const index = this.tasks.findIndex((t) => t.id === task.id);
      this.tasks[index] = task;
    } else {
      // TODO: Create
      task.id = this.tasks.length + 1;
      this.tasks.push(task);
    }
  }

  editTask(task: Task): void {
    this.task = task;
  }

  deleteTask(task: Task): void {
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
  }
}
