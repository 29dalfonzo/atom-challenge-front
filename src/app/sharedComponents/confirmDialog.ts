import { CommonModule } from '@angular/common';
import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-confirm-dialog',
  template: `
  <h2 mat-dialog-title>{{ title }}</h2>
  <mat-dialog-content>
    {{ content }}
  </mat-dialog-content>
  <mat-dialog-actions style="display: flex; justify-content: space-around;">
    <button mat-button mat-dialog-close color="secondary">Cancelar</button>
    <button mat-button mat-dialog-close cdkFocusInitial (click)="confirm()" color="primary">Aceptar</button>
  </mat-dialog-actions>
  `,
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatProgressBarModule],
})
export class ConfirmDialogComponent {
  title: string;
  content: string;
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.content = data.content;
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
