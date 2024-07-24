import { Component, Input, inject, signal } from '@angular/core';
import { EventInterface } from '../../data/interfaces/event.interface';
import { ImgUrlPipe } from '../../data/helpers/pipes/img-url.pipe';
import { RouterLink } from '@angular/router';

import { UserInterface } from '../../data/interfaces/user.interface';
import { UserService } from '../../data/services/user.service';
import { firstValueFrom } from 'rxjs';

import { EventService } from '../../data/services/event.service';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { EventParticipantsNumberLabelComponent } from '../event-participants-number-label/event-participants-number-label.component';
import { FavoriteButtonComponent } from '../buttons/favorite-button.component';
import { JoinButtonComponent } from '../buttons/join-button.component';
import { EditButtonComponent } from '../buttons/edit-button.component';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [ImgUrlPipe,
    RouterLink,
    CommonModule,
    EventParticipantsNumberLabelComponent,
    FavoriteButtonComponent,
    JoinButtonComponent,
    EditButtonComponent
  ],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {
  userService = inject(UserService)
  eventService = inject(EventService)
  public authService = inject(AuthService);

  @Input() event!: EventInterface
  @Input() me!: any; 
  @Input() onDelete!: (id: string) => void;
  @Input() joinedEventsIds!: () => string[]; 

  isCancelled = signal<boolean>(false);

  participantsNum = signal(0);

  isJoinedByMe = signal(false);

  ngOnInit() {
    if (this.event) {
      this.isCancelled.set(this.event.cancelled);
      
      this.isJoinedByMe.set(this.joinedEventsIds().includes(this.event.id));
    }
    
  }

  async deleteEvent() {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await firstValueFrom(this.eventService.deleteEvent(this.event.id));
        this.onDelete(this.event.id); // Notify parent about the deletion
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  }

}
