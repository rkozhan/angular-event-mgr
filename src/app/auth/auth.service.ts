import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient)
  cookieService = inject(CookieService)

  baseApiUrl = 'http://localhost:5454/auth/'

  token: string | null = null
 // refreshToken: string | null = null  //TODO in auth.interface

 get isAuth() {
  if (!this.token) {
    this.token = this.cookieService.get('token')
  }
  return !!this.token
 }

  login(payload: {email: string, password: string}) {
    //const fd = new FormData();
    //fd.append('email', payload.email)
    //fd.append('password', payload.password)
    return this.http.post<TokenResponse>(
      `${this.baseApiUrl}login`,
      //fd // if use form Data instead "payload"
      payload
    ).pipe(
      tap(val => {
        this.token = val.jwt
        //this.refreshToken = val.refresh

        this.cookieService.set('token', this.token)
        //this.cookieService.set('refreshToken', this.refreshToken)
        console.log(val.message)
      })
    )
  }
}
