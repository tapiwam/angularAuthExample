import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  userData = {};
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  login(){
    console.log('Trying to login user. ' + JSON.stringify(this.userData));

    if(AuthService.validateUserData(this.userData)){
      this._auth.loginUser(this.userData)
        .subscribe(
          res => {
            console.log("SUCCESS" , res)
            localStorage.setItem('token', res.token);

            console.log("token: " , localStorage.getItem('token'));
            this._router.navigate(['special']);
          }
          ,
          err => {
            console.log("ERROR" , err)
          }
        );
    }
  }

}
