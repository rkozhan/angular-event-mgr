import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { RegistrationInterface } from '../interfaces/registration.interface';
import { catchError, tap, throwError, Observable } from 'rxjs';
import { UserService } from './user.service';
import { EventInterface } from '../interfaces/event.interface';
import { EventDetailedInterface } from '../interfaces/event-detailed.interface';
import { EventAddRequestInterface } from '../interfaces/event-add-request.interface';
import { environment } from '../../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class EventService {
  http = inject(HttpClient)
  userService = inject(UserService)
  baseApiUrl = environment.baseApiUrl

  me = this.userService.getMe

  userRegistrations: RegistrationInterface[] = [];
    constructor() {
  }

  getEvents() {
    return this.http.get<EventInterface[]>(`${this.baseApiUrl}events`)
  }

  getEventsIncludePast() {
    return this.http.get<EventInterface[]>(`${this.baseApiUrl}events/all`)
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

  registerForEvent(userId: string, eventId: string) {
    const registration: RegistrationInterface = { userId, eventId }; // Replace with your actual interface
    return this.http.post<RegistrationInterface>(`${this.baseApiUrl}registrations`, registration);
  }

  unregisterForEvent(userId: string, eventId: string) {
    const url = `${this.baseApiUrl}registrations/${eventId}/${userId}`;
    return this.http.delete(`${this.baseApiUrl}registrations/${eventId}/${userId}`, { responseType: 'text' })
  }

  addEvent(payload: EventAddRequestInterface) {
    return this.http.post<EventAddRequestInterface>(`${this.baseApiUrl}events`, payload)
      .pipe(tap(value => console.log(value)));
  }


  toggleIsCancelled(id: string) {
    return this.http.put(`${this.baseApiUrl}events/${id}`, null)
      .pipe(
        tap(response => console.log('Toggled isCancelled:', response)),
        catchError(error => {
          console.error('Error toggling isCancelled:', error);
          return throwError(error);
        })
      );
  }


}