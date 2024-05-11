import { CommonModule } from '@angular/common';
import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
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
import { Task } from 'src/app/interfaces/task.interface';
import { TaskAction, TaskActionEnum } from 'src/app/interfaces/taskAction.interface';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() taskAction = new EventEmitter<TaskAction>();

  constructor() {}

  changeTask(): void {
    console.log('changeTask', this.task);
    this.taskAction.emit({ action: TaskActionEnum.UPDATE, ...this.task, done: !this.task.done });
  }

  deleteTask(): void {
    console.log('deleteTask', this.task);
    this.taskAction.emit({ action: TaskActionEnum.DELETE, ...this.task });
  }

  editTask(): void {
    console.log('editTask', this.task);
    this.taskAction.emit({ action: TaskActionEnum.EDIT, ...this.task });
  }
}
