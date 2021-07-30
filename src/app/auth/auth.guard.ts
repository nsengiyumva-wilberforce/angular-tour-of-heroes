import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot,
         RouterStateSnapshot, Router, NavigationExtras, CanLoad, Route, UrlTree } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true|UrlTree {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): true | UrlTree{
      return this.canActivate(next, state);
    }

  checkLogin(url: string): true|UrlTree {
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // create a dummy sessionId
    const sessionId = 123456789;

    // set our navigation xtras object
    // that contains our global query params and fragments
    const navigationExtras: NavigationExtras = {
      queryParams: { session_Id : sessionId },
      fragment : 'anchor'
      };

    // Redirect to the login page
    return this.router.createUrlTree(['/login'], navigationExtras);
  }
  canLoad(route: Route): any{
    const url = `/${route.path}`;

    return this.checkLogin(url);
  }
}
