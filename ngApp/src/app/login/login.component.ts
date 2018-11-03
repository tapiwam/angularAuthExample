import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  userData = {};
  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  login(){
    console.log('Trying to login user. ' + JSON.stringify(this.userData));

    if(AuthService.validateUserData(this.userData)){
      this._auth.loginUser(this.userData)
        .subscribe(
          res => console.log("SUCCESS" , res),
          err => console.log("ERROR" , err)
        );
    }
  }

}
