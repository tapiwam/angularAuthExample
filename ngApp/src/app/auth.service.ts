import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl = "http://localhost:3000/api/";
  private _registerUrl = this.getUrl("register");
  private _loginUrl = this.getUrl("login");

  constructor(private http: HttpClient, private _router: Router) { }

  private getUrl(path: string): string {
    return this._baseUrl + path;
  }

  loginUser(user){
    return this.http.post<any>(this._loginUrl, user);
  }

  registerUser(user){
    return this.http.post<any>(this._registerUrl, user);
  }

  loggedIn(): boolean{
    return !!(localStorage.getItem('token'));
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['events']);
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
