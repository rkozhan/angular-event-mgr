import { Component, Input, signal } from '@angular/core';
import { EventInterface } from '../../data/interfaces/event.interface';
import { ImgUrlPipe } from '../../data/helpers/pipes/img-url.pipe';
import { RouterLink } from '@angular/router';

@Component({
  
  selector: 'app-event-card',
  standalone: true,
  imports: [ImgUrlPipe, RouterLink],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {
  isActive = signal<boolean>(false)



  @Input() event!: EventInterface
}
