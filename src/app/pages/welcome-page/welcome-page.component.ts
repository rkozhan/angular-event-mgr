import { Component, inject, signal, OnInit } from '@angular/core';
import { EventDetailedInterface } from '../../data/interfaces/event-detailed.interface';
import { EventService } from '../../data/services/event.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent {
  eventService = inject(EventService);

  randomEvent: EventDetailedInterface | null = null;
  
  async ngOnInit() {
    this.randomEvent = await firstValueFrom(this.eventService.getRandomEventDetailed());

  }
}
