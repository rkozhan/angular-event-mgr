import { Component, Input } from '@angular/core';
import { EventInterface } from '../../data/interfaces/event.interface';
import { ImgUrlPipe } from '../../data/helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {
  @Input() event!: EventInterface
}
