import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorComponent } from '../../common-ui/error/error.component';
import { CommonModule } from '@angular/common'; //for NgIf
import { SpinnerComponent } from '../../common-ui/spinner/spinner.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ErrorComponent, CommonModule, SpinnerComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService = inject(AuthService)
  router = inject(Router)

  isPasswordVisible = signal<boolean>(false)
  errorMessage = signal<string | null>(null);
  loading = signal<boolean>(false);

  form = new FormGroup ({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  })

  //onSubmit(event: Event) {
  //  console.log(event);
  //}  ++ add into tag <form> => <form (ngSubmit)="onSubmit($event)">


  onSubmit() {
    this.loading.set(true)
    this.errorMessage.set(null)
    if(this.form.valid) {
      //@ts-ignore  
      this.authService.login(this.form.value)
      .pipe(
        catchError(error => {
          this.loading.set(false);
          if (error.status === 403) {
            this.errorMessage.set('Invalid credentials. Please try again.')
          } else {
            this.errorMessage.set('An error occurred. Please try again later.')
          }
          return throwError(error)
        })
      )
      .subscribe(res => {
        this.loading.set(false)
        this.router.navigate([''])
        console.log(res);
        
      })
      //TODO form typization 
    }
  }
}
