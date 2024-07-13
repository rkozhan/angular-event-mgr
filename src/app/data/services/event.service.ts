import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { EventInterface } from '../interfaces/event.interface';
import { RegistrationInterface } from '../interfaces/registration.interface';
import { catchError, tap, throwError } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  userService = inject(UserService);
  http = inject(HttpClient)
  baseApiUrl = "http://localhost:5454/api/v1/"

  me = this.userService.getMe

  userRegistrations: RegistrationInterface[] = [];

    constructor() {
  }

  getEvents() {
    return this.http.get<EventInterface[]>(`${this.baseApiUrl}events`)
  }

  getEventById(id: string) {
    return this.http.get<EventInterface>(`${this.baseApiUrl}events/${id}`)
  }

  deleteEvent(id: string) {
    return this.http.delete(`${this.baseApiUrl}events/${id}`, { responseType: 'text' });
  }


  getUserRegistrations(userId: string) {
    return this.http.get<RegistrationInterface[]>(`${this.baseApiUrl}registrations/users/${userId}`)
    .pipe(
      tap(val => console.log(val)))
  }

  registerForEvent(userId: string, eventId: string) {
    const registration: RegistrationInterface = { userId, eventId }; // Replace with your actual interface
    return this.http.post<RegistrationInterface>(`${this.baseApiUrl}registrations`, registration);
  }

}