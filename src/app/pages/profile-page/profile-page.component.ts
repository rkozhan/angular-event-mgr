import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetailedInterface } from '../../data/interfaces/user-detailed.interface';
import { UserService } from '../../data/services/user.service';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../data/helpers/pipes/img-url.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileHeaderComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  route = inject(ActivatedRoute)
  userService = inject(UserService)

  profileId: string | null = null;
  profile: UserDetailedInterface | null = null;

  async ngOnInit() {
    this.profileId = this.route.snapshot.paramMap.get('id');

    if (this.profileId) {
      this.profile = await firstValueFrom(this.userService.getAccountDetailed(this.profileId));
    }
  }

}
