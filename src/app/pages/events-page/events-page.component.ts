import { Component, inject, signal } from '@angular/core';

import { EventCardComponent } from '../../common-ui/event-card/event-card.component';
import { EventService } from '../../data/services/event.service';
import { EventInterface } from '../../data/interfaces/event.interface';
import { UserService } from '../../data/services/user.service';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
  

@Component({
  selector: 'app-events-page',
  standalone: true,
  imports: [EventCardComponent, CommonModule],
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.scss'
})
export class EventsPageComponent {
  eventService = inject(EventService)
  private userService = inject(UserService);
  public authService = inject(AuthService);
  events: EventInterface[] = []

  eventsFiltered: EventInterface[] = []
 //searchFilter = signal('');

  me = this.userService.me;

  async ngOnInit() {
    await firstValueFrom(this.userService.getMe());
    this.events = await firstValueFrom(this.eventService.getEvents());

    if (this.authService.isUser) {
      this.showAllEvents()
    }
    if (this.authService.isEditor) {
      this.showCreatedByMe()
    }
  }

  showAllEvents() {
    this.eventsFiltered = this.events;
    console.log("all");
  }

  showCreatedByMe() {
    const userId = this.userService.me()!.id;
    this.eventsFiltered = this.events.filter(event => event.createdBy === userId);
    console.log("my");
  }

  handleInputChange(event: Event): void {
    // Cast the event to HTMLInputElement to access input-specific properties
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value.toLowerCase().trim();
    
    this.eventsFiltered = this.events.filter(event =>
      event.title.toLowerCase().includes(filterValue)
      || event.description.toLowerCase().includes(filterValue)
      || event.date.toLowerCase().includes(filterValue)
      || event.location.toLowerCase().includes(filterValue)
      || event.category.toLowerCase().includes(filterValue)
    );;
  }


  handleDelete(id: string) {
    this.eventsFiltered = this.eventsFiltered.filter(event => event.id !== id);
  }


}

