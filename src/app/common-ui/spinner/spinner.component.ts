import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `
    <div class="spinner"></div>
  `,
  styles: [`
    :host {
      margin: auto;
    }
    .spinner {
      border: .5rem solid rgba(0, 0, 0, 0.1);
      border-left-color: var(--col-primary);
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      animation: spin 1s linear infinite;
      margin: auto;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class SpinnerComponent { }

