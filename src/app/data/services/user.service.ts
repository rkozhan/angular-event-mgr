import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient)
  baseApiUrl = "http://localhost:5454/api/v1/"

  me = signal<UserInterface | null>(null)

  getUsers() {
    return this.http.get<UserInterface[]>(`${this.baseApiUrl}users`)
  }

  getMe() {
    return this.http.get<UserInterface>(`${this.baseApiUrl}users/me`)
    .pipe(
      tap(res => {
        this.me.set(res)        
      })
    )
  }

  getAccount (id: string) {
    return this.http.get<UserInterface>(`${this.baseApiUrl}users/{id}`)
  }

}
