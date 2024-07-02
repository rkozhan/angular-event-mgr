import { Component, Input } from '@angular/core';
import { UserInterface } from '../../data/interfaces/user.interface';
import { ImgUrlPipe } from '../../data/helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input() profile!: UserInterface
}
