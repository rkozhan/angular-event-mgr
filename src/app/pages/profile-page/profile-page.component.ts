import { Component, inject } from '@angular/core';
import { UserService } from '../../data/services/user.service';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileHeaderComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  userService = inject(UserService)
  route = inject(ActivatedRoute)

}
