import { Component, inject } from '@angular/core';

import { EventCardComponent } from '../../common-ui/event-card/event-card.component';
import { EventService } from '../../data/services/event.service';
import { EventInterface } from '../../data/interfaces/event.interface';

@Component({
  selector: 'app-events-page',
  standalone: true,
  imports: [EventCardComponent],
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.scss'
})
export class EventsPageComponent {
  eventService = inject(EventService)
  events: EventInterface[] = []


  constructor() {
    this.eventService.getEvents()
    .subscribe(value => {
      console.log(value);
            
      this.events = value
    })
  }

  handleDelete(id: string) {
    this.events = this.events.filter(event => event.id !== id);
  }
}
