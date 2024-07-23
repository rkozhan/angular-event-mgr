import { Component, inject, signal } from '@angular/core';

import { EventCardComponent } from '../../common-ui/event-card/event-card.component';
import { EventService } from '../../data/services/event.service';
import { EventInterface } from '../../data/interfaces/event.interface';
import { UserService } from '../../data/services/user.service';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../common-ui/error/error.component';
import { SpinnerComponent } from '../../common-ui/spinner/spinner.component';
  

@Component({
  selector: 'app-events-page',
  standalone: true,
  imports: [EventCardComponent, CommonModule, ErrorComponent, SpinnerComponent],
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
  joinedEventsIds = signal<string[]>([]);
  
  errorMessage = signal<string | null>(null);
  loading = signal<boolean>(false);

  async ngOnInit() {
    this.loading.set(true);
    await firstValueFrom(this.userService.getMe());
    await this.getUpcomingEvents();

    this.filterByRole();

    const currentUser = this.me();
    if (currentUser) {
      const joinedEvents = currentUser.joinedEvents;
      this.joinedEventsIds.set(joinedEvents.map(event => event.id));
    }
  }

  async getPastEvents() {
    this.loading.set(true);
    this.events = await firstValueFrom(this.eventService.getEventsIncludePast());
    this.filterByRole();
  }

  async getUpcomingEvents() {
    this.loading.set(true);
    this.events = await firstValueFrom(this.eventService.getEvents());
    this.filterByRole();
  }
  
  showAllEvents() {
    this.eventsFiltered = this.events;
  }

  showCreatedByMe() {
    const userId = this.userService.me()!.id;
    this.eventsFiltered = this.events.filter(event => event.createdBy === userId);
  }

  showJoinedByMe() {
    const userId = this.userService.me()!.id;
    this.eventsFiltered = this.events.filter(event => this.joinedEventsIds().includes(event.id));
  }

  filterByRole() {
    if (this.authService.isUser) {
      this.eventsFiltered = this.events;
    }
    if (this.authService.isEditor) {
      const userId = this.userService.me()!.id;
      this.eventsFiltered = this.events.filter(event => event.createdBy === userId);
    }
    this.loading.set(false);
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

