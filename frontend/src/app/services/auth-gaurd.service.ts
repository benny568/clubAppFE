import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGaurd implements CanActivate {

  constructor( private auth$: AuthService, private router: Router) { }

  canActivate()
  {
    if( this.auth$.isLoggedIn() ) return true;

    this.router.navigate(['/login']);
    return false;
  }
}
