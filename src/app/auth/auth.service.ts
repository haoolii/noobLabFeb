import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  noobUser = {
    username: 'noob',
    password: 'noob'
  };

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  login({username, password}: {username: string, password: string}) {
    const isNoob =
      username === this.noobUser.username &&
      password === this.noobUser.password;

    this.isLoggedIn$.next(isNoob);

    return of(isNoob);
  }

  logout() {
    this.isLoggedIn$.next(false);
  }
}
