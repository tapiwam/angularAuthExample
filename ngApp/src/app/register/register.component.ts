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

  static validateUserData(userData: any): boolean{
    if(!userData){
      console.error('Invalid user object');
      return false;
    }

    if(!userData.email){
      console.error('No email provided.');
      alert('No email provided.');
      return false;
    }

    if(!userData.password){
      console.error('No password provided.');
      alert('No password provided.');
      return false;
    }

    return true;
  }

  registerUser(){
    console.log('Trying to register user. ' + JSON.stringify(this.userData));

    if(RegisterComponent.validateUserData(this.userData)){
      this._auth.registerUser(this.userData)
        .subscribe(
          res => console.log("SUCCESS" , res),
          err => console.log("ERROR" , err)
        );
    }
  }

}
