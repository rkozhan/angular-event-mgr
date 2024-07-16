import { Component, Input, inject } from '@angular/core';
import { EventService } from '../../data/services/event.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-event-button',
  standalone: true,
  template: `
    <button class="event-detail__del btn-icon _ibg" (click)="deleteEvent()">
      <img src="/assets/svg/bin.svg" alt="icon delete">
    </button>
  `
})
export class DeleteEventButtonComponent {
  @Input() eventId!: string;

  private eventService = inject(EventService);
  private router = inject(Router);

  async deleteEvent() {
    if (this.eventId && confirm('Are you sure you want to delete this event?')) {
      try {
        await firstValueFrom(this.eventService.deleteEvent(this.eventId));
        this.router.navigate(['/']); // Navigation to the main page
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete the event. Please try again.');
      }
    }
  }
}
