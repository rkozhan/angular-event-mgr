import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="forbidden-container">
      <h1>403 - Forbidden</h1>
      <p>You do not have permission to access this page.</p>
      <a [routerLink]="['/']">Go to Home Page</a>
    </div>

  `,
  styles: [`
    .forbidden-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100dvh;
    }
    .forbidden-container h1 {
      font-size: 3rem;
    }
    .forbidden-container p {
      font-size: 1.5rem;
    }
    .forbidden-container a {
      text-decoration: underline;
    }
  `]
})
export class ForbiddenComponent {}
