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
      color: red;
    }
  `]
})
export class ErrorComponent {
  @Input() errorMessage: string | null = null;
}
