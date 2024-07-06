import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  cookieService = inject(CookieService)
  router = inject(Router)

  baseApiUrl = 'http://localhost:5454/auth/'

  token: string | null = null
 // refreshToken: string | null = null  //TODO in auth.interface
  roles: string[] = [];

 get isAuth() {
  if (!this.token) {
    this.token = this.cookieService.get('token')
    this.roles = this.cookieService.get('roles').split(',')
    console.log(this.roles);
    
    //this.refreshToken = this.cookieService.get('refreshToken')
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
      tap(value => this.saveTokens(value))
    )
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(
      `${this.baseApiUrl}refresh`,  //TODO  2:08
      {
        //refresh_token: this.refreshToken,
      }
    ).pipe(
      tap(value => this.saveTokens(value)),
      catchError(err => {
        this.logout()
        return throwError(err)
      })
    )
  }

  logout() {
    this.cookieService.delete('token')
    this.cookieService.delete('refreshToken')
    this.cookieService.delete('roles')
    this.token = null
    //this.refreshToken = null
    this.roles = []
    this.router.navigate(['/login'])
  }

  saveTokens (resp: TokenResponse) {
    this.token = resp.jwt
    //this.refreshToken = resp.refresh

    this.decode(this.token);

    this.cookieService.set('token', this.token)
    //this.cookieService.set('refreshToken', this.refreshToken)
    console.log(resp.message)
  }

  decode(token: string): any {
    const decoded:any = jwtDecode(token);
    this.roles = decoded.roles
    this.cookieService.set('roles', decoded.roles)
  }
}
