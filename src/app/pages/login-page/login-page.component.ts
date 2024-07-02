import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService = inject(AuthService)

  form = new FormGroup ({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  })

  //onSubmit(event: Event) {
  //  console.log(event);
  //}  ++ add into tag <form> => <form (ngSubmit)="onSubmit($event)">

  onSubmit() {
    if(this.form.valid) {
      //@ts-ignore  
      this.authService.login(this.form.value)
      .subscribe(res => {
        console.log(res);
        
      })
      //TODO form typization 
    }
  }
}
