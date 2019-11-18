import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, NavigationCancel } from '@angular/router';
import { Observable, timer, of } from 'rxjs';
import { AuthService } from './auth.service';
import { filter, tap, delay, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.router.events
        .pipe(
          tap(e => console.log(e)),
          filter(e => e instanceof NavigationCancel)
        )
        .subscribe(() => {
          alert('You do not have permission !!');
          timer(500).subscribe(v => this.router.navigate(['/home']));
        });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('canActivate');
      return this.authService.isLoggedIn$;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return of(this.authService.isLoggedIn$.value);
  }
}
