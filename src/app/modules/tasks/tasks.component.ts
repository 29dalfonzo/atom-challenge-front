/* eslint-disable no-param-reassign */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl, FormGroup, ReactiveFormsModule, Validators
} from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  imports: [CommonModule, MatButtonModule, MatCardModule,
    MatFormFieldModule, MatInputModule,
    MatProgressBarModule, MatDividerModule, MatListModule, ReactiveFormsModule, MatCheckboxModule, MatTooltipModule],
  standalone: true,
})
export class TasksComponent {
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    done: new FormControl(false),
  });

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
  submit() {
    console.log(this.form.value);
    this.loading = true;
    setTimeout(() => {
      console.log('Task created successfully');
      this.tasks.push({
        id: this.tasks.length + 1,
        title: this.form.value.title,
        description: this.form.value.description,
        date: new Date(),
        done: this.form.value.done
      });
      this.loading = false;
      this.resetFormt();
    }, 2000);
  }

  changeTask(task: Task):void {
    task.done = !task.done;
  }

  resetFormt() {
    this.form.reset();
  }
}

export interface Task {
  id: number;
  title: string;
  description: string;
  date: Date;
  done: boolean;
}
