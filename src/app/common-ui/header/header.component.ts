import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../data/services/user.service';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../data/helpers/pipes/img-url.pipe';
import { ProfileHeaderComponent } from '../profile-header/profile-header.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ImgUrlPipe, ProfileHeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService)
  userService = inject(UserService)

  me = this.userService.me

  isActive: boolean = false;

  ngOnInit() {
    firstValueFrom(this.userService.getMe())
    console.log(this.me);
  }
  
  logout() {
    this.authService.logout();
  }

  toggleActive() {
    this.isActive = !this.isActive;
  }

  setActive() {
    this.isActive = false;
    console.log("set");
    
  }

}
