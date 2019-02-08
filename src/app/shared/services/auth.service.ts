import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthenticationService {
  loggedIn = true;
  registered: boolean;

  constructor(private router: Router) {}

  logIn(login: string, passord: string) {
    this.loggedIn = true;
    this.router.navigate(['/']);
  }

  logOut() {
    this.loggedIn = false;
    this.router.navigate(['/login-form']);
  }
  register() {
    this.registered = false;
    this.loggedIn = false;
    this.router.navigate(['/registration-form']);
  }
  get isLoggedIn() {
    return this.loggedIn;
  }
}

@Injectable()
export class AuthGuardService {
    constructor(private router: Router, private authService: AuthenticationService) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
         const isLoggedIn = this.authService.isLoggedIn;
        // //const isRegistrationForm = route.routeConfig.path === 'registration-form';
         const isLoginForm = route.routeConfig.path === 'login-form';
        // if (isLoggedIn && isLoginForm) {
        //     this.router.navigate(['/']);
        //     return false;
        // }
        // if (!isLoggedIn && !isLoginForm) {
        //     this.router.navigate(['/login-form']);
        // }
        // return isLoggedIn || isLoginForm;
       
         return true;
    }
}
