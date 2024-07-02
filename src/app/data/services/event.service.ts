import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EventInterface } from '../interfaces/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  http = inject(HttpClient)
  baseApiUrl = "http://localhost:5454/"

  getEvents() {
    return this.http.get<EventInterface[]>(`${this.baseApiUrl}api/v1/events`)
  }

}