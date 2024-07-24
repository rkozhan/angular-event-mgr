import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-button',
  standalone: true,
  template: `
    <button class="event-btn__edit btn-icon">
        <div class="_ibg">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                <path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" />
            </svg>
        </div>
        <span></span>
    </button>
  `,
  styles: [`
    .event-btn__edit {
      color: var(--col-primary);
      box-shadow: inset 0 0 0 3px var(--col-primary);
      &:hover {
        background-color: var(--col-primary);
        color: var(--col-light);
      }
      @media (min-width: 575px) {
        span:after {
          content:"Bearbeiten";
        }
      }
    }
  `]
})
export class EditButtonComponent {

}
