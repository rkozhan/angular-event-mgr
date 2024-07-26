import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule], 
  template: `
    <div *ngIf="errorMessage" class="error">
      {{ errorMessage }}
    </div>
    `,
  styles: [`
    :host {
      margin:auto;
    }
    .error {
      padding: 1rem;
      background-color: var(--col-error);
      color: var(--col-light);
      font-size: 2rem;
      text-wrap:wrap;
    }
  `]
})
export class ErrorComponent {
  @Input() errorMessage: string | null = null;
}
