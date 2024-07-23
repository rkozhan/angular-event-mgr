import { Component, Input, inject, signal } from '@angular/core';
import { EventService } from '../../data/services/event.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

interface Participant {
  id: string;
  username: string;
}

@Component({
  selector: 'app-toogle-event-cancelled',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button *ngIf="!isCancelled()" class="event-detail__cancel btn-icon" (click)="toogleCancelled()">
      <div class="_ibg">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q54 0 104-17.5t92-50.5L228-676q-33 42-50.5 92T160-480q0 134 93 227t227 93Zm252-124q33-42 50.5-92T800-480q0-134-93-227t-227-93q-54 0-104 17.5T284-732l448 448Z"/></svg>
      </div>
      <span></span>
    </button>
    <button *ngIf="isCancelled()" class="event-detail__restore btn-icon" (click)="toogleCancelled()">
      <div class="_ibg">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-400q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0 280q-139 0-241-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Z"/></svg>
      </div>
      <span></span>
    </button>
  `,
  styles: [`
    .event-detail__cancel {
      color: var(--col-red);
      box-shadow: inset 0 0 0 3px var(--col-red);
      &:hover {
        background-color: var(--col-red);
        color: var(--col-light);
      }
      @media (min-width: 575px) {
        span:after {
          content:"Abgsagen";
        }
      }
    }
    .event-detail__restore {
      color: var(--col-green);
      box-shadow: inset 0 0 0 3px var(--col-green);
      &:hover {
        background-color: var(--col-green);
        color: var(--col-light);
      }
      @media (min-width: 575px) {
        span:after {
          content:"Wieder herstellen";
        }
      }
    }
  `]
})
export class ToogleEventCancelledComponent {
  @Input() eventId!: string;
  @Input() isCancelled = signal<boolean>(false);

  private eventService = inject(EventService);

  async toogleCancelled() {
    try {
      await firstValueFrom(this.eventService.toggleIsCancelled(this.eventId)); //TODO
      this.isCancelled.set(!this.isCancelled());
    } catch (error) {
      console.error('Fehler beim Abgsagen des Events:', error);
    }
  }


}
