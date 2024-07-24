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
      <div class="_ibg">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M680-80v-120H560v-80h120v-120h80v120h120v80H760v120h-80Zm-480-80q-33 0-56.5-23.5T120-240v-480q0-33 23.5-56.5T200-800h40v-80h80v80h240v-80h80v80h40q33 0 56.5 23.5T760-720v244q-20-3-40-3t-40 3v-84H200v320h280q0 20 3 40t11 40H200Zm0-480h480v-80H200v80Zm0 0v-80 80Z"/></svg>
      </div>
      <span></span>
    </button>

    <button *ngIf="isJoinedByMe()" class="event-detail__unjoin btn-icon _ibg" (click)="unregisterForEvent()">
      <div class="_ibg">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m388-212-56-56 92-92-92-92 56-56 92 92 92-92 56 56-92 92 92 92-56 56-92-92-92 92ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>
      </div>
      <span></span>
    </button>
  `,
  styles: [`
    .event-detail__join {
      color: var(--col-green);
      box-shadow: inset 0 0 0 3px var(--col-green);
      &:hover {
        background-color: var(--col-green);
        color: var(--col-light);
      }
      @media (min-width: 575px) {
        span:after {
          content:"Anmelden";
        }
      }
    }
    .event-detail__unjoin {
      color: var(--col-red);
      box-shadow: inset 0 0 0 3px var(--col-red);
      &:hover {
        background-color: var(--col-red);
        color: var(--col-light);
      }
      @media (min-width: 575px) {
        span:after {
          content:"Abmelden";
        }
      }
    }
  `]
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
      console.error('Fehler beim Registriern fürs Event:', error);
    }
  }

  async unregisterForEvent() {
    try {
      await firstValueFrom(this.eventService.unregisterForEvent(this.userId, this.eventId)); //TODO
      this.isJoinedByMe.set(false); //TODO
      this.participantsNum.update(num => num - 1);
    } catch (error) {
      console.error('Fehler beim Abmelden vom Event:', error);
    }
  }
}
