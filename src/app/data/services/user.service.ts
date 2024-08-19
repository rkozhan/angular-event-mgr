import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';
import { catchError, tap, throwError } from 'rxjs';
import { UserDetailedInterface } from '../interfaces/user-detailed.interface';
import { environment } from '../../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient)
  baseApiUrl = environment.baseApiUrl

  me = signal<UserDetailedInterface | null>(null)

  getUsers() {
    return this.http.get<UserInterface[]>(`${this.baseApiUrl}users`)
  }

  getMe() {
    return this.http.get<UserDetailedInterface>(`${this.baseApiUrl}users/me`)
    .pipe(
      tap(res => {
        this.me.set(res)        
      })
    )
  }

  getAccount (id: string) {
    return this.http.get<UserInterface>(`${this.baseApiUrl}users/${id}`)
  }

  getAccountDetailed(id: string) {
    return this.http.get<UserDetailedInterface>(`${this.baseApiUrl}users/detailed/${id}`)
  }

}
