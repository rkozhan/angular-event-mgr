import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../../data/services/user.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  userService = inject(UserService)

  ngOnInit() {
    console.log('ngOnInit');
    this.userService.getMe().subscribe(val => {
      console.log(val);
      
    })
  }
}
