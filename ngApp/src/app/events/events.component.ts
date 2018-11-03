import { Component, OnInit } from '@angular/core';
import {EventService} from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: Event[];
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.load();
  }

  load(){
    this.eventService.getEvents()
      .subscribe(
        data => { this.events = data },
        err => console.log('Error fetching events ' + err)
      )
  }
}
