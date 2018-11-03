import { Component, OnInit } from '@angular/core';
import {EventService} from '../event.service';
import {Event} from '../model/event';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.scss']
})
export class SpecialEventsComponent implements OnInit {

  events: Event[];
  constructor(private eventService: EventService, private _router: Router) { }

  ngOnInit() {
    this.load();
  }

  load(){
    this.eventService.getSpecialEvents()
      .subscribe(
        data => { this.events = data },
        err => {
          if(err instanceof  HttpErrorResponse){
            if(err.status == 401){
              this._router.navigate(['login']);
            }
          }
        }
      )
  }

}
