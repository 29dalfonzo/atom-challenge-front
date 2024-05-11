/* eslint-disable class-methods-use-this */
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Component } from '@angular/core';
import {
  FormControl, FormGroup, ReactiveFormsModule, Validators
} from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MaterialModule } from "src/app/material.module";

import { AuthService } from "./auth.service";
import { RegisterComponent } from "./register/register.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  // eslint-disable-next-line max-len
  imports: [CommonModule, NgOptimizedImage, ReactiveFormsModule, HttpClientModule, MaterialModule,],
  providers: [AuthService],
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  testEmail = 'email@test.com';
  loading = false;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService
  ) { }

  submit(): void {
    this.loading = true;

    this.authService.login(this.form.value.email).subscribe({
      next: (response) => {
        this.loading = false;
        localStorage.setItem('token', JSON.stringify(response));
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        this.loading = false;
        if (error.status === 404) {
          this.openRegisterModal();
        }
      }
    });
  }

  openRegisterModal(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '280px',
      height: '320px',
      data: { email: this.form.value.email },
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (!response) {
        return;
      }
      setTimeout(() => {
        this.router.navigate(['/tasks']);
      }, 2000);
    });
  }
}
