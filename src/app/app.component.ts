import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationError, RouterOutlet, NavigationCancel } from '@angular/router';

import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  status$: Observable<boolean>;
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.loading = true;
    router.events.subscribe((routerEvent: RouterEvent) => {
      console.log(routerEvent);
      if (routerEvent instanceof NavigationStart) {
        console.log('NavigationStart');
        this.loading = true;
      }

      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
          console.log('NavigationEnd');
          this.loading = false;
      }
    });
  }

  ngOnInit(): void {
    this.status$ = this.authService.isLoggedIn$;
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  logout() {
    this.authService.logout();
  }
}
