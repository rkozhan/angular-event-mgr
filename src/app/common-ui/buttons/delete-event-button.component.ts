import { Component, Input, inject } from '@angular/core';
import { EventService } from '../../data/services/event.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-delete-event-button',
  standalone: true,
  template: `
    <button class="event-card__del btn-icon" (click)="deleteEvent()">
        <div class="_ibg">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </div>
        <span></span>
    </button>
  `,
  styles: [`
    .event-card__del {
      color: var(--col-red);
      box-shadow: inset 0 0 0 3px var(--col-red);
      &:hover {
        background-color: var(--col-red);
        color: var(--col-light);
      }
      @media (min-width: 575px) {
        span:after {
          content:"Löschen";
        }
      }
    }
  `]
})
export class DeleteEventButtonComponent {
  @Input() eventId!: string;

  private eventService = inject(EventService);
  private router = inject(Router);

  async deleteEvent() {
    if (this.eventId && confirm('Bist du sicher, dass du dieses Event löschen willst?')) {
      try {
        await firstValueFrom(this.eventService.deleteEvent(this.eventId));
        this.router.navigate(['/']); // Navigation to the main page
      } catch (error) {
        console.error('Fehler beim Löschen des Events:', error);
        alert('Das Löschen des Events is fehlgeschlagen. Bitte versuch\'s no amoi.');
      }
    }
  }
}
