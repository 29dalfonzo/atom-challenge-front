import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <div style="text-align: center;">
      <h1>404</h1>
      <p>Página no encontrada</p>
      <button mat-button (click)="goToHome()" color="primary">Aceptar</button>
    </div>
  `,
  styles: [`
    div {
      margin-top: 50px;
    }
    h1 {
      font-size: 72px;
    }
  `]
})
export class PageNotFoundComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigateByUrl("/");
  }
}
