import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {tap, delay} from 'rxjs/operators';

@Injectable()
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    // return of(true).delay(1000).do(val => this.isLoggedIn = true);
    this.isLoggedIn = true;
    return of(true);
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
