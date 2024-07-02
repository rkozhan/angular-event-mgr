import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient)

  baseApiUrl = "http://localhost:5454/api/v1/"

  getUsers() {
    return this.http.get<UserInterface[]>(`${this.baseApiUrl}users`)
  }

}
