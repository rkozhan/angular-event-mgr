import { Component, OnInit, inject, signal } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventDetailedInterface, Participant } from '../../data/interfaces/event-detailed.interface';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../data/services/user.service';
import { EventService } from '../../data/services/event.service';
import { JoinButtonComponent } from '../../common-ui/buttons/join-button.component';
import { DeleteEventButtonComponent } from '../../common-ui/buttons/delete-event-button.component';
import { ToogleEventCancelledComponent } from '../../common-ui/buttons/toogle-event-cancelled.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-detail-page',
  standalone: true,
  imports: [RouterLink, JoinButtonComponent, DeleteEventButtonComponent, CommonModule, ToogleEventCancelledComponent],
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
  participants = signal<Participant[]>([]);
  participantsNum = signal(0);
  isJoinedByMe = signal(false);

  isCancelled = signal<boolean>(false);

  async ngOnInit() {
    await firstValueFrom(this.userService.getMe());
    
    this.eventId = this.route.snapshot.paramMap.get('id');

    if (this.eventId) {
      this.event = await firstValueFrom(this.eventService.getEventDetailedById(this.eventId));
    }

    if (this.event) {
      this.participants.set(this.event.participants);
      this.participantsNum.set(this.participants().length);

      this.isCancelled.set(this.event.cancelled);
    }

    const currentUser = this.me();
    const participantsList = this.participants();

    if (currentUser && participantsList) {
      const currentUserID = currentUser.id;
      const participantIDs = participantsList.map(participant => participant.id);
      this.isJoinedByMe.set(participantIDs.includes(currentUserID));
    }



  }
}