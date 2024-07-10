import { Component, inject } from '@angular/core';

import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { UserService } from '../../data/services/user.service';
import { UserInterface } from '../../data/interfaces/user.interface';

import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';


@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [ProfileCardComponent, ProfileHeaderComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent {
  profileService = inject(UserService)
  profiles: UserInterface[] = []

  constructor() {
    this.profileService.getUsers()
    .subscribe(value => {
      console.log(value);
      
      this.profiles = value
    })
  }
}
