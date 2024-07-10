import { Component, Input, inject, signal } from '@angular/core';
import { EventInterface } from '../../data/interfaces/event.interface';
import { ImgUrlPipe } from '../../data/helpers/pipes/img-url.pipe';
import { RouterLink } from '@angular/router';

import { UserInterface } from '../../data/interfaces/user.interface';
import { UserService } from '../../data/services/user.service';
import { firstValueFrom } from 'rxjs';

import { EventService } from '../../data/services/event.service';

@Component({
  
  selector: 'app-event-card',
  standalone: true,
  imports: [ImgUrlPipe, RouterLink],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {
  userService = inject(UserService)
  eventService = inject(EventService)

  @Input() event!: EventInterface
  @Input() onDelete!: (id: string) => void;

  isActive = signal<boolean>(false)
  me = this.userService.me

  ngOnInit() {
    firstValueFrom(this.userService.getMe())
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
