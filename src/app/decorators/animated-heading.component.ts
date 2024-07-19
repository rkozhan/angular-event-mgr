import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animated-heading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="animated-heading">
      <span *ngFor="let text of displayedTexts; trackBy: trackByIndex">{{text}}</span>
    </h1>
  `,
  styles: [`
    .animated-heading {
      display: flex;
      flex-direction: column;
      text-align: center;
      gap: 1em;
      
    }
  `]
})
export class AnimatedHeadingComponent implements OnInit, OnDestroy {
  @Input() texts: string[] = [];
  displayedTexts: string[] = [];
  currentIndex = 0;
  currentText = '';
  private textSubscription: Subscription | undefined;

  ngOnInit(): void {
    if (this.texts.length > 0) {
      this.displayedTexts = this.texts.map(text => '');
      this.animateText();
    }
  }

  ngOnDestroy(): void {
    if (this.textSubscription) {
      this.textSubscription.unsubscribe();
    }
  }

  animateText(): void {
    let currentTextIndex = 0; // Index of the current text being animated
    let currentIndex = 0; // Index of the current character being displayed

    const textsLength = this.texts.length;
    const maxTextLength = Math.max(...this.texts.map(text => text.length));

    const intervalLength = 70; // Interval duration in milliseconds
    const maxIterations = maxTextLength; // Maximum number of iterations based on the longest text

    this.textSubscription = interval(intervalLength).subscribe(() => {
      if (currentTextIndex < textsLength) {
        if (currentIndex < this.texts[currentTextIndex].length) {
          // Display the current character up to the currentIndex
          this.displayedTexts[currentTextIndex] = this.texts[currentTextIndex].slice(0, currentIndex + 1);
          currentIndex++;
        } else if (currentIndex === this.texts[currentTextIndex].length) {
          // Once all characters are displayed, move to the next text
          currentIndex++;
        } else {
          // After displaying the whole text, increment to the next text
          currentTextIndex++;
          currentIndex = 0;
        }
      }

      // If all texts have been displayed, complete the subscription
      if (currentTextIndex === textsLength && currentIndex > maxIterations) {
        this.textSubscription?.unsubscribe();
      }
    });
  }

  // Track by index to ensure Angular properly tracks each item in the array
  trackByIndex(index: number): number {
    return index;
  }
}