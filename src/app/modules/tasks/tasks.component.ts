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
import { MatIconModule } from '@angular/material/icon';
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
    MatProgressBarModule, MatDividerModule, MatListModule, ReactiveFormsModule, MatCheckboxModule,
    MatTooltipModule, MatIconModule],
  standalone: true,
})
export class TasksComponent {
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
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
    // valida si el id existe en el arreglo
    // si existe actualiza el objeto
    // si no existe lo agrega
    const findTask = this.tasks.find((t) => t.id === this.form.value.id);
    if (findTask) {
      this.tasks = this.tasks.map((t) => {
        if (t.id === this.form.value.id) {
          t.title = this.form.value.title;
          t.description = this.form.value.description;
          t.done = this.form.value.done;
        }
        return t;
      });
    } else {
      this.tasks.push({
        id: this.tasks.length + 1,
        title: this.form.value.title,
        description: this.form.value.description,
        date: new Date(),
        done: this.form.value.done
      });
    }
    this.loading = false;
    this.resetFormt();
  }

  changeTask(task: Task):void {
    task.done = !task.done;
  }

  editTask(task: Task): void {
    console.log('Edit task', task);
    this.form.setValue({
      title: task.title,
      description: task.description,
      done: task.done,
      id: task.id
    });
  }

  deleteTask(task: Task): void {
    console.log('Delete task', task);
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
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
