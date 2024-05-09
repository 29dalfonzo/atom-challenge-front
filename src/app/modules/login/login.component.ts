/* eslint-disable class-methods-use-this */
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component } from '@angular/core';
import {
  FormControl, FormGroup, ReactiveFormsModule, Validators
} from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from "@angular/router";

import { RegisterComponent } from "./register/register.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  // eslint-disable-next-line max-len
  imports: [CommonModule, MatButtonModule, NgOptimizedImage, MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatProgressBarModule, MatDialogModule],
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
    public dialog: MatDialog
  ) { }

  submit(): void {
    console.log(this.form.value);
    this.loading = true;
    if (this.form.value.email === this.testEmail) {
      console.log('Email is correct');
      localStorage.setItem('email', this.form.value.email);

      setTimeout(() => {
        this.router.navigate(['/tasks']);
      }, 2000);
    } else {
      console.log('Email is incorrect');
      this.openRegisterModal();
    }
    this.loading = false;
  }

  openRegisterModal(): void {
    console.log('Register modal opened');
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '280px',
      height: '320px',
      data: { email: this.form.value.email },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      setTimeout(() => {
        this.router.navigate(['/tasks']);
      }, 2000);
    });
  }
}
