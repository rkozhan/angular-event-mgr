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
    <button *ngIf="!isCancelled()" class="event-detail__cancel btn-icon _ibg" (click)="toogleCancelled()">
      <img src="/assets/svg/cancel.svg" alt="icon join">
    </button>
    <button *ngIf="isCancelled()" class="event-detail__restore btn-icon _ibg" (click)="toogleCancelled()">
      <img src="/assets/svg/restore.svg" alt="icon unjoin">
    </button>
  `
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
      console.error('Error cancelling event:', error);
    }
  }


}
