
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-participants-number-label',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="event__members">
      <div class="_ibg">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m160-419 101-101-101-101L59-520l101 101Zm540-21 100-160 100 160H700Zm-220-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-160q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640Zm0 40ZM0-240v-63q0-44 44.5-70.5T160-400q13 0 25 .5t23 2.5q-14 20-21 43t-7 49v65H0Zm240 0v-65q0-65 66.5-105T480-450q108 0 174 40t66 105v65H240Zm560-160q72 0 116 26.5t44 70.5v63H780v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5Zm-320 30q-57 0-102 15t-53 35h311q-9-20-53.5-35T480-370Zm0 50Z"/></svg>
      </div>
      <span class="event__members_label">{{participantsNum}}</span>
    </div>
  `,
  styles: [`
    .event__members {
      position: absolute;
      display: flex;
      gap: 1em;
      top: 1em;
      left: 1em;
      height: 3em;
      padding: .6em 1em;
      background-color: var(--col-light);
      box-shadow: inset 0 0 0 3px var(--col-primary);
      color: var(--col-primary);
      border-radius: 6px;
      ._ibg {
        width: 3em;
        aspect-ratio: 1/1;
      }
      &_label {
        font-size: 2.5em;
        font-weight: bold;
      }
    }
  `]
})
export class EventParticipantsNumberLabelComponent {
  @Input() participantsNum: number = 0;
}

