import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,
    MatDialogModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressBarModule],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loading = false;
  userEmail = '';

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RegisterData,
    private authService: AuthService
  ) {
  }

  cancel(): void {
    console.log('Register modal closed');
    this.dialogRef.close();
  }

  createUser(): void {
    console.log('User created');
    this.authService.register(this.data.email).subscribe({
      next: (response) => {
        console.log('Respuesta recibida:', response);
        this.dialogRef.close({ email: this.data.email });
      },
      error: (error) => {
        console.error('Error al crear el usuario:', error);
        console.log('Detalles del error:', error.status, error.statusText, error.url, error.ok);
      }
    });
  }
}

// TODO: mover a una carpeta de interfaces
export interface RegisterData {
  email: string;
}
