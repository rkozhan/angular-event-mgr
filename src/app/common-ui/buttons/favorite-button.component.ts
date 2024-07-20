import { Component, Input, inject, signal } from '@angular/core';
import { EventService } from '../../data/services/event.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button *ngIf="!isFavoritedByMe()" class="event__btn-favorite btn-icon" (click)="like()">
        <div class="_ibg">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-501Zm0 381L313-234q-72-65-123.5-116t-85-96q-33.5-45-49-87T40-621q0-94 63-156.5T260-840q52 0 99 22t81 62q34-40 81-62t99-22q81 0 136 45.5T831-680h-85q-18-40-53-60t-73-20q-51 0-88 27.5T463-660h-46q-31-45-70.5-72.5T260-760q-57 0-98.5 39.5T120-621q0 33 14 67t50 78.5q36 44.5 98 104T440-228q26-23 61-53t56-50l9 9 19.5 19.5L605-283l9 9q-22 20-56 49.5T498-172l-58 52Zm280-160v-120H600v-80h120v-120h80v120h120v80H800v120h-80Z"/></svg>
          </div>
    </button>

    <button *ngIf="isFavoritedByMe()" class="event__btn-favorite btn-icon" (click)="unlike()">
        <div class="_ibg">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-501Zm0 381L313-234q-72-65-123.5-116t-85-96q-33.5-45-49-87T40-621q0-94 63-156.5T260-840q52 0 99 22t81 62q34-40 81-62t99-22q84 0 153 59t69 160q0 14-2 29.5t-6 31.5h-85q5-18 8-34t3-30q0-75-50-105.5T620-760q-51 0-88 27.5T463-660h-46q-31-45-70.5-72.5T260-760q-57 0-98.5 39.5T120-621q0 33 14 67t50 78.5q36 44.5 98 104T440-228q26-23 61-53t56-50l9 9 19.5 19.5L605-283l9 9q-22 20-56 49.5T498-172l-58 52Zm160-280v-80h320v80H600Z"/></svg>
          </div>
    </button>
  `,
  styles: [`
    .event__btn-favorite {
      color: var(--col-favor);
      box-shadow: inset 0 0 0 3px var(--col-favor);
      &:hover {
        background-color: var(--col-favor);
        color: var(--col-light);
        
      }
    }
  `]
})
export class FavoriteButtonComponent {
  @Input() eventId!: string;
  @Input() userId!: string;
  @Input() likesNum = signal<number>(0);
  @Input() isFavoritedByMe = signal<boolean>(false);

  private eventService = inject(EventService);

  async like() {
    try {
      //await firstValueFrom(this.eventService.addToVavorite(this.userId, this.eventId));
      this.likesNum.update(num => num + 1);
      this.isFavoritedByMe.set(true);
    } catch (error) {
      console.error('Fehler beim Registriern fürs Event:', error);
    }
  }

  async unlike() {
    try {
      //await firstValueFrom(this.eventService.deleteFromFavorite(this.userId, this.eventId)); //TODO
      this.isFavoritedByMe.set(false); 
      this.likesNum.update(num => num - 1);
    } catch (error) {
      console.error('Fehler beim Abmelden vom Event:', error);
    }
  }
}
