import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { TokenResponse } from './auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient)
  baseApiUrl = 'http://localhost:5454/auth/'

  token: string | null = null
 // refreshToken: string | null = null  //TODO in auth.interface

 get isAuth() {
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

        console.log(val.message)
      })
    )
  }
}
