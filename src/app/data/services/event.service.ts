import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { RegistrationInterface } from '../interfaces/registration.interface';
import { catchError, tap, throwError, Observable } from 'rxjs';
import { UserService } from './user.service';
import { EventInterface } from '../interfaces/event.interface';
import { EventDetailedInterface } from '../interfaces/event-detailed.interface';
import { EventAddRequestInterface } from '../interfaces/event-add-request.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  http = inject(HttpClient)
  userService = inject(UserService)
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

  getEventDetailedById(id: string) {
    return this.http.get<EventDetailedInterface>(`${this.baseApiUrl}events/detailed/${id}`)
  }

  getRandomEventDetailed() {
    return this.http.get<EventDetailedInterface>(`${this.baseApiUrl}events/random`)
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



  addEvent(payload: EventAddRequestInterface) {
    return this.http.post<EventAddRequestInterface>(`${this.baseApiUrl}events`, payload)
      .pipe(tap(value => console.log(value)));
  }

}