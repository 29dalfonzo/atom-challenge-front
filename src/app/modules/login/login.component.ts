import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  // eslint-disable-next-line max-len
  imports: [CommonModule, MatButtonModule, NgOptimizedImage, MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
  });
  constructor() { }

  submit(): void {
    console.log(this.form.value);
  }
}
