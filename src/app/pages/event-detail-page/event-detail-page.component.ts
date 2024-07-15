import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDetailedInterface } from '../../data/interfaces/event-detailed.interface';
import { ImgUrlPipe } from '../../data/helpers/pipes/img-url.pipe';
import { Router, RouterLink } from '@angular/router';

import { UserInterface } from '../../data/interfaces/user.interface';
import { UserService } from '../../data/services/user.service';
import { firstValueFrom } from 'rxjs';

import { EventService } from '../../data/services/event.service';

@Component({
  selector: 'app-event-detail-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './event-detail-page.component.html',
  styleUrls: ['./event-detail-page.component.scss']
})
export class EventDetailPageComponent implements OnInit {
  route = inject(ActivatedRoute);
  eventService = inject(EventService);
  userService = inject(UserService)

  eventId: string | null = null;
  event: EventDetailedInterface | null = null;

  me = this.userService.me
  joinedByMe = signal(false)
  participantsNum = signal(0);
  
  async ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');

    if (this.eventId) {
      this.event = await firstValueFrom(this.eventService.getEventDetailedById(this.eventId));
    }

    if (this.event) {
      this.participantsNum.set(this.event.participants.length)
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
        this.participantsNum.set(this.participantsNum() + 1)
      },
      (error) => {
        console.error('Error registering for event:', error);
        alert('Failed to register for the event. Please try again.');
      }
    );
  }
}
