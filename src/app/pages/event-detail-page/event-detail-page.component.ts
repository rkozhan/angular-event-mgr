import { Component, OnInit, inject, signal } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventDetailedInterface } from '../../data/interfaces/event-detailed.interface';
import { UserInterface } from '../../data/interfaces/user.interface';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../data/services/user.service';
import { EventService } from '../../data/services/event.service';
import { JoinButtonComponent } from '../../common-ui/buttons/join-button.component';
import { FavoriteButtonComponent } from '../../common-ui/buttons/favorite-button.component';
import { DeleteEventButtonComponent } from '../../common-ui/buttons/delete-event-button.component';
import { EditButtonComponent } from '../../common-ui/buttons/edit-button.component';
import { ToogleEventCancelledComponent } from '../../common-ui/buttons/toogle-event-cancelled.component';
import { CommonModule } from '@angular/common';
import { EventParticipantsNumberLabelComponent } from '../../common-ui/event-participants-number-label/event-participants-number-label.component';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';


@Component({
  selector: 'app-event-detail-page',
  standalone: true,
  imports: [RouterLink,
    JoinButtonComponent,
    DeleteEventButtonComponent,
    FavoriteButtonComponent,
    EditButtonComponent,
    CommonModule,
    ToogleEventCancelledComponent,
    EventParticipantsNumberLabelComponent,
    ProfileHeaderComponent
  ],
  templateUrl: './event-detail-page.component.html',
  styleUrls: ['./event-detail-page.component.scss']
})
export class EventDetailPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private eventService = inject(EventService);
  private userService = inject(UserService);
  public authService = inject(AuthService);

  eventId: string | null = null;
  event: EventDetailedInterface | null = null;

  me = this.userService.me;
  participants = signal<UserInterface[]>([]);
  participantsNum = signal(0);
  isJoinedByMe = signal(false);

  isCancelled = signal<boolean>(false);

  async ngOnInit() {
    await firstValueFrom(this.userService.getMe());
    
    this.eventId = this.route.snapshot.paramMap.get('id');

    if (this.eventId) {
      this.event = await firstValueFrom(this.eventService.getEventDetailedById(this.eventId));

      const currentUser = this.me();

      if (currentUser) {
        const joinedEvents = currentUser.joinedEvents;
        const joinedEventsIds = joinedEvents.map(event => event.id);
        this.isJoinedByMe.set(joinedEventsIds.includes(this.eventId));
      }
    }

    if (this.event) {
      this.participants.set(this.event.participants);
      console.dir(this.participants);
      
      this.participantsNum.set(this.participants().length);

      this.isCancelled.set(this.event.cancelled);
    }
  }
}