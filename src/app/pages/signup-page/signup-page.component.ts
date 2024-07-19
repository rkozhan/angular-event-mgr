import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../common-ui/spinner/spinner.component';
import { ErrorComponent } from '../../common-ui/error/error.component';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, SpinnerComponent, ErrorComponent],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  loading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  isPasswordMatches = signal<boolean>(true);


  checkIfPasswordMatches() {
    return this.form.value.confirmPassword === this.form.value.newPassword
  }

  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    newPassword: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    isEditor: new FormControl(false)
  });

  onSubmit() {
    if (!this.checkIfPasswordMatches()) {
      this.errorMessage.set("Passwörter stimmen ned überein!");
      return
    }

    if (!this.form.valid) {
      this.errorMessage.set("Füll' alle Felder aus!");
      return
    }

    if (this.form.valid) {
      this.loading.set(true)
      this.errorMessage.set(null)
      this.isPasswordMatches.set(true)
      
      const { username, email, newPassword, isEditor } = this.form.value;
      //@ts-ignore
      this.authService.signup({ username, email, newPassword, isEditor })
        .subscribe({
          next: res => {
            this.loading.set(false);
            this.form.reset
            this.router.navigate(['/login']);
          },
          error: error => {
            this.loading.set(false);
            if (error.status === 403) {
              this.errorMessage.set('Ungültiger Anmeldeversuch. Bitte versuch\'s no amoi.');
            } else if (error.status === 400) {
              this.errorMessage.set('Dieser Account existiert scho.');
            } else {
              this.errorMessage.set(error.error.message || 'Es is a Fehler passiert. Bitte versuch\'s später no amoi.');
            }
          }
        });
    }
  }
}
