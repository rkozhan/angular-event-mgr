import { Component, inject } from '@angular/core';

import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent {
  profileService = inject(ProfileService)
  profiles: Profile[] = []

  constructor() {
    this.profileService.getUsers()
    .subscribe(value => {
      this.profiles = value
    })
  }
}
