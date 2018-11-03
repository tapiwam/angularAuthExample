import { Component, OnInit } from '@angular/core';
import {EventService} from '../event.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.scss']
})
export class SpecialEventsComponent implements OnInit {

  events: Event[];
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.load();
  }

  load(){
    this.eventService.getSpecialEvents()
      .subscribe(
        data => { this.events = data },
        err => console.log('Error fetching events ' + err)
      )
  }

}
