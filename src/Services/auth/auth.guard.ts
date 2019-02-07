import { Injectable, ViewChild } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { LoginService } from '../login/login.service';

@Injectable()
 export class AuthGuard implements CanActivate {
constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService){}
canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot):  boolean {
      if(this.loginService.Token!=null){
        return true;
      }

      this.router.navigate(["/pagenotfound"]);
       return false;
  }
}
