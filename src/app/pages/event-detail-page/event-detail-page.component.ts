import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventInterface } from '../../data/interfaces/event.interface';
import { ImgUrlPipe } from '../../data/helpers/pipes/img-url.pipe';
import { RouterLink } from '@angular/router';

import { UserInterface } from '../../data/interfaces/user.interface';
import { UserService } from '../../data/services/user.service';
import { firstValueFrom } from 'rxjs';

import { EventService } from '../../data/services/event.service';

@Component({
  selector: 'app-event-detail-page',
  standalone: true,
  imports: [],
  templateUrl: './event-detail-page.component.html',
  styleUrls: ['./event-detail-page.component.scss']
})
export class EventDetailPageComponent implements OnInit {
  route = inject(ActivatedRoute);
  eventService = inject(EventService);
  userService = inject(UserService)

  eventId: string | null = null;
  event: EventInterface | null = null;

  me = this.userService.me
  
  async ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');

    if (this.eventId) {
      this.event = await firstValueFrom(this.eventService.getEventById(this.eventId));
    }
  
  }
  

  async deleteEvent() {
    if (this.eventId && confirm('Are you sure you want to delete this event?')) {
      try {
        await firstValueFrom(this.eventService.deleteEvent(this.eventId));
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  }

  registerForEvent(userId: string, eventId: string) {

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
