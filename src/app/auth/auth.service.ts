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
    //this.refreshToken = this.cookieService.get('refreshToken')
  }
  return !!this.token
 }

  private get userRoles() {
    if (!this.roles.length) {
      if (!this.token) this.isAuth
      this.saveRoles()
    }
    return this.roles
  }

  get isEditor() {
      return this.userRoles.includes("ROLE_EDITOR")
  }

  get isAdmin() {
    return this.userRoles.includes("ROLE_ADMIN")
  }

  get isUser() {
    return this.userRoles.includes("ROLE_USER")
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
      tap(value => {
        this.saveTokens(value)
        this.saveRoles
      })
    )
  }

  signup(payload: { username: string, newPassword: string, email: string, isEditor: boolean }) {
    const roles = payload.isEditor ? ['ROLE_EDITOR'] : ['ROLE_USER'];

    const signupPayload = {
      username: payload.username,
      email: payload.email,
      password: payload.newPassword,
      roles: roles
    };
    
    return this.http.post<any>(
      `${this.baseApiUrl}signup`,
      signupPayload
      ).pipe(
      tap(response => {
        // Handle successful signup response if needed
        console.log('Signup successful', response);
      })//,
      //catchError(error => {
        // Handle error in signup process
        //console.error('Error in signup', error);
        //return throwError(error);
      //})
    );
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
    this.cookieService.set('token', this.token)
    //this.cookieService.set('refreshToken', this.refreshToken)
    console.log(resp.message)
  }
  
  saveRoles () {
    if (this.token) {
      const decoded:any = jwtDecode(this.token)
      this.roles = decoded.roles
    }
  }
}
