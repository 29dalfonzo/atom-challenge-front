import { CommonModule } from '@angular/common';
import {
  Component, EventEmitter, Input, OnChanges, Output, SimpleChanges
} from '@angular/core';
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
import { Task } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatProgressBarModule, MatDividerModule,
    MatListModule, ReactiveFormsModule, MatCheckboxModule, MatTooltipModule, MatIconModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnChanges {
  @Input() task: Task | null = null;
  @Output() submitEvent: EventEmitter<Task> = new EventEmitter<Task>();
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    done: new FormControl(false),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'].currentValue && this.task) {
      this.form.patchValue(this.task);
    }
  }

  submit(): void {
    if (this.form.valid) {
      this.submitEvent.emit(this.form.value);
      this.form.reset();
      this.task = null;
    }
  }
}
