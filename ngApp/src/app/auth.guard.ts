import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService, private _router: Router){ }

  canActivate():Observable<boolean>|Promise<boolean>|boolean{

    if(!this._auth.loggedIn()){
      this._router.navigate(['login']);
      return false;
    }

    return true;
  }

/*
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
*/
}
