import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService)
  
  logout() {
    this.authService.logout();
  }

}
