import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SnackBarService } from 'src/app/sharedServices/snackBar.service';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,
    MatDialogModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressBarModule],
  providers: [AuthService, SnackBarService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loading = false;
  userEmail = '';

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RegisterData,
    private authService: AuthService,
    private snackBarService: SnackBarService
  ) {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  createUser(): void {
    this.authService.register(this.data.email).subscribe({
      next: () => {
        this.dialogRef.close({ email: this.data.email });
        this.snackBarService.openSnackBar('Usuario registrado correctamente', 'Cerrar');
      },
      error: () => {
        this.snackBarService.openSnackBar('Error al registrar el usuario', 'Cerrar');
      }
    });
  }
}

// TODO: mover a una carpeta de interfaces
export interface RegisterData {
  email: string;
}
