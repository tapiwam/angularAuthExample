import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl = "http://localhost:3000/api/";
  private _registerUrl = this.getUrl("register");
  private _loginUrl = this.getUrl("login");

  constructor(private http: HttpClient) { }

  private getUrl(path: string): string {
    return this._baseUrl + path;
  }

  login(user){
    return this.http.post(this._loginUrl, user);
  }

  registerUser(user){
    return this.http.post(this._registerUrl, user);
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

}
