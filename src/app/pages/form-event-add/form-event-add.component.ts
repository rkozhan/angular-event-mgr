import { Component, inject, signal, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../data/services/event.service';
import { Router, RouterLink } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { firstValueFrom, throwError } from 'rxjs';
import { ErrorComponent } from '../../common-ui/error/error.component';
import { CommonModule } from '@angular/common'; // for NgIf
import { SpinnerComponent } from '../../common-ui/spinner/spinner.component';
import { UserService } from '../../data/services/user.service';
import { EventAddRequestInterface } from '../../data/interfaces/event-add-request.interface';

@Component({
  selector: 'app-form-event-add',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ErrorComponent, CommonModule, SpinnerComponent],
  templateUrl: './form-event-add.component.html',
  styleUrls: ['./form-event-add.component.scss']
})
export class FormEventAddComponent implements OnInit {
  eventService = inject(EventService);
  userService = inject(UserService);
  router = inject(Router);

  today: Date = new Date();

  me = this.userService.me;
  createdBy: string | undefined;

  errorMessage = signal<string | null>(null);
  loading = signal<boolean>(false);

  form = new FormGroup({
    title: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    date: new FormControl<string>('', Validators.required),
    time: new FormControl<string>('', Validators.required),
    location: new FormControl<string>('', Validators.required),
    category: new FormControl<string>('', Validators.required),
  });

  async ngOnInit() {
    await firstValueFrom(this.userService.getMe());
    if (this.me()) {
      this.createdBy = this.me()?.id;
    }
  }

  onSubmit() {
    console.log('CreatedBy:', this.form.valid);
    // Log the form validity and the form controls' values
    console.log('Form valid:', this.form.valid);
    console.log('Form values:', this.form.value);


    if (this.form.valid && this.createdBy) {

      
      this.loading.set(true);
      this.errorMessage.set(null);

      const formValue: EventAddRequestInterface = {
        createdBy: this.createdBy,
        title: this.form.value.title || '', // Ensures that title is a string; if null or undefined, default to an empty string
        description: this.form.value.description || '', // Ensures that description is a string; if null or undefined, default to an empty string
        date: this.form.value.date || '', // Ensures that date is a string; if null or undefined, default to an empty string
        time: this.form.value.time || '', // Ensures that time is a string; if null or undefined, default to an empty string
        location: this.form.value.location || '', // Ensures that location is a string; if null or undefined, default to an empty string
        category: this.form.value.category || '', // Ensures that category is a string; if null or undefined, default to an empty string
      };

      this.eventService.addEvent(formValue)
        .subscribe({
          next: (resp) => {
            console.log('Event erfolgreich hinzugefügt:', resp);
            this.loading.set(false);
            this.form.reset;
            this.router.navigate([`../events/${resp.id}`]);
          },
          error: (error) => {
            console.error('Fehler beim Hinzufügen des Events:', error);
            this.loading.set(false);
            this.errorMessage.set('Das Hinzufügen des Events ist fehlgeschlagen. Bitte versuchen Sie es erneut.');
          }
        });
    }
  }
}
