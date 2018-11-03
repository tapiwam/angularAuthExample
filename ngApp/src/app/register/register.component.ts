import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userData = {};
  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  registerUser(){
    console.log('Trying to register user. ' + JSON.stringify(this.userData));

    if(AuthService.validateUserData(this.userData)){
      this._auth.registerUser(this.userData)
        .subscribe(
          res => console.log("SUCCESS" , res),
          err => console.log("ERROR" , err)
        );
    }
  }

}
