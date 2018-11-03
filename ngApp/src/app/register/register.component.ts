import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userData = {};
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  registerUser(){
    console.log('Trying to register user. ' + JSON.stringify(this.userData));

    if(AuthService.validateUserData(this.userData)){
      this._auth.registerUser(this.userData)
        .subscribe(
          res => {
            console.log("SUCCESS" , res)
            localStorage.setItem('token', res.token);

            console.log("token: " , localStorage.getItem('token'));
            this._router.navigate(['special']);
          },
          err => console.log("ERROR" , err)
        );
    }
  }

}
