import { Component, Input, inject, signal } from '@angular/core';
import { EventService } from '../../data/services/event.service';
import { firstValueFrom } from 'rxjs';

interface Participant {
  id: string;
  username: string;
}

@Component({
  selector: 'app-join-button',
  standalone: true,
  template: `
    <button class="event-detail__join btn-icon _ibg" (click)="registerForEvent()">
      <img src="/assets/svg/join.svg" alt="icon join">
    </button>
  `
})
export class JoinButtonComponent {
  @Input() eventId!: string;
  @Input() userId!: string;
  @Input() username!: string;
  @Input() participants = signal<Participant[]>([]);

  private eventService = inject(EventService);

  registerForEvent() {
    firstValueFrom(this.eventService.registerForEvent(this.userId, this.eventId)).then(
      () => {
        this.participants.update(participants => [...participants, { id: this.userId, username: this.username }]);
      },
      (error) => {
        console.error('Error registering for event:', error);
        alert('Failed to register for the event. Please try again.');
      }
    );
  }
}