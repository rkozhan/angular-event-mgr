import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient)
  baseApiUrl = 'http://localhost:5454/auth/'

  login(payload: {email: string, password: string}) {
    //const fd = new FormData();
    //fd.append('email', payload.email)
    //fd.append('password', payload.password)
    return this.http.post(
      `${this.baseApiUrl}login`,
      //fd // if use form Data instead "payload"
      payload

    )
  }
}
