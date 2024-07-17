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

@Component({
  
  selector: 'app-event-card',
  standalone: true,
  imports: [ImgUrlPipe, RouterLink, CommonModule],
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

  isCancelled = signal<boolean>(false);


  isActive = signal<boolean>(false)

  ngOnInit() {
    if (this.event) {
      this.isCancelled.set(this.event.cancelled);
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

  registerForEvent(userId: string, eventId: string) {

    if (!this.isCancelled()) {
      firstValueFrom(this.eventService.registerForEvent(userId, eventId)).then(
        () => {
          alert('Successfully registered for the event!');
        },
        (error) => {
          console.error('Error registering for event:', error);
          alert('Failed to register for the event. Please try again.');
        }
      );
    }
  }


}
