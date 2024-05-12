import { CommonModule } from '@angular/common';
import {
  Component, EventEmitter, Input, OnChanges, Output, SimpleChanges
} from '@angular/core';
import {
  FormControl, FormGroup, ReactiveFormsModule, Validators
} from '@angular/forms';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskAction, TaskActionEnum } from 'src/app/interfaces/taskAction.interface';
import { MaterialModule } from 'src/app/material.module';

import { TaskService } from '../Tasks.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  providers: [TaskService],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnChanges {
  @Input() task: Task | null = null;
  @Output() submitEvent: EventEmitter<TaskAction> = new EventEmitter<TaskAction>();
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    done: new FormControl(false),
    date: new FormControl(new Date()),
    user_id: new FormControl(null)
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'].currentValue && this.task) {
      this.form.patchValue(this.task);
    }
  }

  submit(): void {
    if (this.form.valid) {
      if (this.task) {
        this.submitEvent.emit({
          action: TaskActionEnum.EDIT,
          ...this.form.value
        });
      } else {
        this.submitEvent.emit({
          action: TaskActionEnum.CREATE,
          ...this.form.value
        });
      }
      this.form.reset();
      this.task = null;
    }
  }
}
