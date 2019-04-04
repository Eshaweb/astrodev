import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "../../../node_modules/@angular/router";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators';
import { StorageService } from '../StorageService/Storage_Service';
import { LoginService } from '../LoginService/LoginService';
import { HttpService } from '../Error/http.service';
import { EMPTY } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    refreshToken: any;
    body: any;
    method: string;
    url: string;

    constructor(private route: ActivatedRoute, public httpService: HttpService,
        private router: Router, private loginService: LoginService) {

    }
    sendToken(token: string) {
        this.loginService.SetToken(token);
        //this.tokenService.SetToken(token);
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') == "True"){
            return next.handle(req.clone());
        }

            if(req.url.indexOf("/token")>0){
            var headersforTokenAPI= new HttpHeaders({'Content-Type': 'application/x-www-urlencoded'})
            return next.handle(req);
        }

        if (StorageService.GetItem('Token') != null) {  
        const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + StorageService.GetItem('Token'))
            });
             return next.handle(clonedreq)
                .pipe(tap(
                succ => { },
                err => {
                    if (err.status === 401)
                    this.router.navigateByUrl('/login-form');
                    }
                ));
        }
        else if(StorageService.GetItem('Token')== null){

            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer ")
            });
            return next.handle(clonedreq)
                 .pipe(tap(
                succ => { },
                err => {
                    if (err.status === 401)
                    this.router.navigateByUrl('/login-form');
                    }
                ));
        } 
        else {
             this.router.navigate(['login-form']);
        }

        //     if (req.headers.get('No-Auth') == "True") {
        //         return next.handle(req.clone());
        //     }

        //     if (req.url.indexOf("/token") > 0) {
        //         var headersforTokenAPI = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded' })
        //         return next.handle(req);
        //     }
        //     if (this.loginService.AccessToken != null) {
        //         if (this.loginService.refreshTokenNeeded == true) {
        //     // if (this.tokenService.AccessToken != null) {
        //     //     if (this.tokenService.refreshTokenNeeded == true) {
        //             const clonedreq = req.clone({
        //                 setHeaders: { Authorization: 'Bearer ' }
        //             });
        //             return next.handle(clonedreq)
        //             .pipe(tap(
        //                     succ => { },
        //                     err => {
        //                         if (err.status === 401) {

        //                         }
        //                     }
        //                 ));
        //         }
        //         else {
        //             const clonedreq = req.clone({
        //                 setHeaders: { Authorization: 'Bearer ' + this.loginService.AccessToken }
        //                 //setHeaders: { Authorization: 'Bearer ' + this.tokenService.AccessToken }
        //             });
        //             return next.handle(clonedreq)
        //             .pipe(tap(
        //                     succ => { },
        //                     err => {
        //                         if (err.status === 401) {
        //                             // this.refreshToken = localStorage.getItem('refreshToken');
        //                             // this.registerService.GetToken(this.refreshToken).subscribe((data: any) => {
        //                             //     this.sendToken(data.AccessToken);
        //                             //     this.refreshToken = data.RefreshToken;
        //                             //     localStorage.setItem('refreshToken', this.refreshToken);
        //                             // });  
        //                         }
        //                     }
        //                 ));
        //         }
        //     }
        //      else if (this.loginService.AccessToken == null) {//used while page refresh, without login
        //     //else if (this.tokenService.AccessToken == null) {

        //         this.refreshToken = StorageService.GetItem('refreshToken');
        //         if (this.refreshToken == null) {
        //             const clonedreq = req.clone({
        //                 setHeaders: { Authorization: 'Bearer ' }
        //             });
        //             return next.handle(clonedreq)
        //             .pipe(tap(
        //                     succ => { },
        //                     err => {
        //                         if (err.status === 401) {

        //                         }
        //                     }
        //                 ));
        //         }
        //         else if (this.loginService.RefreshToken != null) {
        //         //else if (this.tokenService.RefreshToken != null) {
        //             const clonedreq = req.clone({
        //                 setHeaders: { Authorization: 'Bearer ' }
        //             });
        //             return next.handle(clonedreq)
        //                 // .pipe(tap((data: any) => {

        //                 // }, error => {
        //                 //     console.error('NICE ERROR', error);
        //                 // })
        //                 .pipe(tap(
        //                     succ => { },
        //                     err => {
        //                         if (err.status === 401) {
        //                             this.refreshToken = StorageService.GetItem('refreshToken');
        //                             this.loginService.GetToken(this.refreshToken, (data) => {
        //                                 this.sendToken(data.AccessToken);
        //                                 this.refreshToken = data.RefreshToken;
        //                                 StorageService.SetItem('refreshToken', this.refreshToken);
        //                                 if(this.method=="Get"){
        //                                      this.httpService.Get(this.url);
        //                                 }
        //                                 else if(this.method=="POST"){
        //                                     this.httpService.Post(this.url,this.body);
        //                                 }
        //                             });
        //                         }
        //                     }
        //                 ));
        //         }
        //         else if (this.refreshToken != null && this.loginService.AccessToken == null) {
        //             this.body=req.body;
        //             this.method=req.method;
        //             this.url=req.url;
        //             this.loginService.GetToken(this.refreshToken, (data) => {
        //                 this.sendToken(data.AccessToken);
        //                this.refreshToken = data.RefreshToken;
        //                 StorageService.SetItem('refreshToken', this.refreshToken);
        //                       //localStorage.setItem('refreshToken', this.refreshToken);
        //                 // const clonedreq = req.clone({
        //                 //     setHeaders: { Authorization: 'Bearer ' + data.RefreshToken }
        //                 // });
        //                 // return next.handle(clonedreq)
        //                 // .pipe(tap(
        //                 //         succ => { 
        //                 //             if(this.method=='Get'){
        //                 //                 return this.httpService.Get(this.url);
        //                 //             }
        //                 //             else if(this.method=='Post'){
        //                 //                return this.httpService.Post(this.url,this.body);
        //                 //             }
        //                 //         },
        //                 //         err => {
        //                 //             if (err.status === 401)
        //                 //                 //this.event.publish('UNAUTHORIZED');
        //                 //                 //this.refreshToken = localStorage.getItem('refreshToken');
        //                 //                 this.refreshToken = StorageService.GetItem('refreshToken');
        //                 //             this.loginService.GetToken(this.refreshToken, (data) => {
        //                 //             //this.tokenService.GetToken(this.refreshToken).subscribe((data: any) => {
        //                 //                 this.sendToken(data.AccessToken);
        //                 //                 this.refreshToken = data.RefreshToken;
        //                 //                 //localStorage.setItem('refreshToken', this.refreshToken);
        //                 //                 StorageService.SetItem('refreshToken', this.refreshToken);

        //                 //             });
        //                 //         }
        //                 //     ));
        //            });
        //         }
        //         else if (this.refreshToken != null && this.loginService.AccessToken != null) {

        //         const clonedreq = req.clone({
        //                 setHeaders: { Authorization: 'Bearer ' + this.loginService.AccessToken }
        //             });
        //             return next.handle(clonedreq)
        //             .pipe(tap(
        //                     succ => { },
        //                     err => {
        //                         if (err.status === 401) {

        //                         }
        //                     }
        //                 ));
        //         }
        //         else {
        //             const clonedreq = req.clone({
        //                 setHeaders: { Authorization: 'Bearer ' }
        //             });
        //             return next.handle(clonedreq)
        //             .pipe(tap(
        //                     succ => { },
        //                     err => {
        //                         if (err.status === 401) {

        //                         }
        //                     }
        //                 ));
        //         }
        //     }
        //     else {
        //         //this.router.navigateByUrl('/login');
        //         // this.navCtrl.push(LoginPage); 
        //     }
        //     // const clonedreq = req.clone({
        //     //     setHeaders: { Authorization: 'Bearer ' }
        //     // });
        //     // return next.handle(clonedreq)
        //     // //return next.handle(this.addToken(req, this.currentToken))
        //     //     .pipe(tap(error => {
        //     //         if (error instanceof HttpErrorResponse) {
        //     //             // switch ((<HttpErrorResponse>error).status) {
        //     //             //     case 400:
        //     //             //         return this.handle400Error(error);
        //     //             //     case 401:
        //     //             //         return this.handle401Error(req, next);
        //     //             // }
        //     //         } else {
        //     //             return Observable.throw(error);
        //     //         }
        //     //     }));
        //     //return next.handle(null).catch(error=>{return Observable.throw(error);});
        // }



    //     if (req.headers.get('No-Auth') == "True") {
    //         return next.handle(req.clone());
    //     }

    //     if (req.url.indexOf("/token") > 0) {
    //         var headersforTokenAPI = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded' })
    //         return next.handle(req);
    //     }
    //     // if (this.httpService.AccessToken != undefined) {
    //     //     var clonedreq = req.clone({
    //     //         setHeaders: { Authorization: 'Bearer ' + this.httpService.AccessToken }
    //     //     });
    //     // }
    //     // else {
    //     //     var clonedreq = req.clone({
    //     //         setHeaders: { Authorization: 'Bearer ' + this.loginService.AccessToken }
    //     //     });
    //     // }
    //     var clonedreq = req.clone({
    //         setHeaders: { Authorization: 'Bearer ' + this.loginService.AccessToken }
    //     });
    //     return next.handle(clonedreq)
    //         .pipe(tap(
    //             succ => { },
    //             err => {
    //                 if (err.status === 401) {
    //                   return EMPTY; 
    //                 }
    //             }
    //         ));
    // }
    }
}