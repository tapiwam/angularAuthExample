import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _eventsUrl = "http://localhost:3000/api/events";
  private _specialEventsUrl = "http://localhost:3000/api/special";

  constructor(private http: HttpClient ) { }

  getEvents(){
    return this.http.get<Event[]>(this._eventsUrl);
  }

  getSpecialEvents(){
    return this.http.get<Event[]>(this._specialEventsUrl);
  }

}
