import { CommonModule } from '@angular/common';
import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskAction, TaskActionEnum } from 'src/app/interfaces/taskAction.interface';
import { MaterialModule } from 'src/app/material.module';
import { ConfirmDialogComponent } from 'src/app/sharedComponents/confirmDialog';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmDialogComponent,
    MaterialModule
  ],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() taskAction = new EventEmitter<TaskAction>();

  constructor(public dialog: MatDialog) { }

  changeTask(): void {
    this.taskAction.emit({ action: TaskActionEnum.UPDATE, ...this.task, done: !this.task.done });
  }

  deleteTask(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Eliminar Tarea', content: '¿Está seguro que desea eliminar esta tarea?' }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.taskAction.emit({ action: TaskActionEnum.DELETE, ...this.task });
      }
    });
  }

  editTask(): void {
    this.taskAction.emit({ action: TaskActionEnum.EDIT, ...this.task });
  }
}
