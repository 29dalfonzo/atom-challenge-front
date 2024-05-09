import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,
    MatDialogModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressBarModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loading = false;
  userEmail = '';

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RegisterData,
  ) {
  }

  cancel(): void {
    console.log('Register modal closed');
    this.dialogRef.close();
  }

  createUser(): void {
    console.log('User created');
    this.loading = true;
    setTimeout(() => {
      console.log('User created successfully');
      this.dialogRef.close({ email: this.data.email });
    }, 2000);
  }
}

// TODO: mover a una carpeta de interfaces
export interface RegisterData {
  email: string;
}
