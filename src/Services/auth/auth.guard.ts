import { Injectable, ViewChild } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { LoginService } from '../LoginService/LoginService';
import { StorageService } from '../StorageService/Storage_Service';

@Injectable()
 export class AuthGuard implements CanActivate,CanActivateChild {
constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService){}
// canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot):  boolean {
//       if(this.loginService.Token!=null){
//         return true;
//       }
//       this.router.navigate(["/pagenotfound"]);
//        return false;
//   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (StorageService.GetItem('refreshToken')!=undefined)
       {
           return true;
       }
    //    if (StorageService.GetItem('refreshToken')!=undefined&&StorageService.GetItem('isAdmin')=='true')
    //    {
    //        return true;
    //    }
    //    else if (StorageService.GetItem('refreshToken')!=undefined&&StorageService.GetItem('isAdmin')==undefined)
    //    {
    //        return true;
    //    }
       else {
        //this.router.navigate(['/login-form']);
        this.router.navigate(['/login-form', {'RedirectUrl':state.url}]);
          //window.location.href='https://www.google.com';
          //this.router.navigate(["/"]).then(result=>{window.location.href = 'https://www.google.com';});
          return false;
       }  
   }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
}
}
