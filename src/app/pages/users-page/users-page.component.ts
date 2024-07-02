import { Component, inject } from '@angular/core';

import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { ProfileService } from '../../data/services/user.service';
import { UserInterface } from '../../data/interfaces/user.interface';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent {
  profileService = inject(ProfileService)
  profiles: UserInterface[] = []

  constructor() {
    this.profileService.getUsers()
    .subscribe(value => {
      console.log(value);
      
      this.profiles = value
    })
  }
}
