import { Component, Input, inject, signal } from '@angular/core';
import { EventService } from '../../data/services/event.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

interface Participant {
  id: string;
  username: string;
}

@Component({
  selector: 'app-join-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button *ngIf="!isJoinedByMe()" class="event-detail__join btn-icon _ibg" (click)="registerForEvent()">
      <img src="/assets/svg/join.svg" alt="icon join">
    </button>
    <button *ngIf="isJoinedByMe()" class="event-detail__unjoin btn-icon _ibg" (click)="unregisterForEvent()">
      <img src="/assets/svg/unjoin.svg" alt="icon unjoin">
    </button>
  `
})
export class JoinButtonComponent {
  @Input() eventId!: string;
  @Input() userId!: string;
  @Input() username!: string;
  @Input() participantsNum = signal<number>(0);
  @Input() isJoinedByMe = signal<boolean>(false);

  private eventService = inject(EventService);

  async registerForEvent() {
    try {
      await firstValueFrom(this.eventService.registerForEvent(this.userId, this.eventId));
      this.participantsNum.update(num => num + 1); 
      this.isJoinedByMe.set(true);
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  }

  async unregisterForEvent() {
    try {
      await firstValueFrom(this.eventService.unregisterForEvent(this.userId, this.eventId)); //TODO
      this.isJoinedByMe.set(false); //TODO
      this.participantsNum.update(num => num - 1);
    } catch (error) {
      console.error('Error unregistering for event:', error);
    }
  }
}
