import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a [href]="url" class="logo" [ngStyle]="{ 'font-size': fontSize }">Vü L🤩S !</a>
  `,
  styles: [`
  :host {
    margin: 1em;
  }
    .logo {
      display: inline-block;
      padding: .5em;
      font-family: title;
      font-style: italic;
      border-radius: 4em 1.2em 4em 2em;
      color: var(--col-light);
      background-color: var(--col-primary);
    }
    .logo:hover {
        box-shadow: inset 0 0 0 2px var(--col-primary);
        background-color: var(--col-light);
        color: var(--col-primary);
    } 
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent implements OnInit {
  @Input() fontSize: string = '4rem';
  @Input() url: string = '#';

  ngOnInit(): void {
    // Optionally, additional initialization logic can be added here
  }
}
