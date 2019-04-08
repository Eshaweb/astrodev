import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable, ViewChild, Injector } from "@angular/core";
import { ActivatedRoute, Router } from "../../../node_modules/@angular/router";
import { Observable } from 'rxjs';
import { tap, catchError, switchMap, finalize, filter, take } from 'rxjs/internal/operators';
import { StorageService } from '../StorageService/Storage_Service';
import { LoginService } from '../LoginService/LoginService';
import { HttpService } from '../Error/http.service';
import {throwError as observableThrowError,  BehaviorSubject } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    refreshToken: any;
    body: any;
    method: string;
    url: string;
    isRefreshingToken: boolean;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private injector: Injector, private route: ActivatedRoute, public httpService: HttpService,
        private router: Router, private loginService: LoginService) {

    }
    
    addToken(req: HttpRequest<any>, token: any): HttpRequest<any> {
        return req.clone({ setHeaders: { Authorization: 'Bearer ' + token }})
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if (req.headers.get('No-Auth') == "True"){
        //     return next.handle(req.clone());
        // }

        //     if(req.url.indexOf("/token")>0){
        //     var headersforTokenAPI= new HttpHeaders({'Content-Type': 'application/x-www-urlencoded'})
        //     return next.handle(req);
        // }

        // if (StorageService.GetItem('Token') != null) {  
        // const clonedreq = req.clone({
        //         headers: req.headers.set("Authorization", "Bearer " + StorageService.GetItem('Token'))
        //     });
        //      return next.handle(clonedreq)
        //         .pipe(tap(
        //         succ => { },
        //         err => {
        //             if (err.status === 401)
        //             this.router.navigateByUrl('/login-form');
        //             }
        //         ));
        // }
        // else if(StorageService.GetItem('Token')== null){

        //     const clonedreq = req.clone({
        //         headers: req.headers.set("Authorization", "Bearer ")
        //     });
        //     return next.handle(clonedreq)
        //          .pipe(tap(
        //         succ => { },
        //         err => {
        //             if (err.status === 401)
        //             this.router.navigateByUrl('/login-form');
        //             }
        //         ));
        // } 
        // else {
        //      this.router.navigate(['login-form']);
        // }

        //If we use Token in Local/SessionStorage, above set of code is useful.
        //If we use only refreshToken in Local/SessionStorage, then below set of code is helpful.


        const authService = this.injector.get(LoginService);
            if (req.headers.get('No-Auth') == "True") {
                return next.handle(req.clone());
            }

            if (req.url.indexOf("/token") > 0) {
                var headersforTokenAPI = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded' })
                return next.handle(req);
            }
            if (this.loginService.AccessToken != null) {
                    return next.handle(this.addToken(req, authService.getAuthToken())).pipe(
                        catchError(error => {
                            if (error instanceof HttpErrorResponse) {
                                switch ((<HttpErrorResponse>error).status) {
                                    case 400:
                                        return this.handle400Error(error);
                                    case 401:
                                        return this.handle401Error(req, next);
                                    default:
                                        return observableThrowError(error);
                                }
                            } else {
                                return observableThrowError(error);
                            }
                        }));
                }
            //}
             else if (this.loginService.AccessToken == null) {//used while page refresh, without login

                this.refreshToken = StorageService.GetItem('refreshToken');
                return next.handle(this.addToken(req, authService.refreshToken().pipe(switchMap((newToken: any) => {return newToken.AccessToken;})))).pipe(
                    catchError(error => {
                        if (error instanceof HttpErrorResponse) {
                            switch ((<HttpErrorResponse>error).status) {
                                case 400:
                                    return this.handle400Error(error);
                                case 401:
                                    return this.handle401Error(req, next);
                                default:
                                    return observableThrowError(error);
                            }
                        } else {
                            return observableThrowError(error);
                        }
                    })); 
            }
           
        }

        handle400Error(error) {
            if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
                // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
                return this.logoutUser();
            }
    
            return observableThrowError(error);
        }
    
        handle401Error(req: HttpRequest<any>, next: HttpHandler) {
            if (!this.isRefreshingToken) {
                this.isRefreshingToken = true;
    
                // Reset here so that the following requests wait until the token
                // comes back from the refreshToken call.
                this.tokenSubject.next(null);
    
                const authService = this.injector.get(LoginService);
                
                return authService.refreshToken().pipe(
                    switchMap((data: any) => {
                        if (data.AccessToken) {
                            this.tokenSubject.next(data.AccessToken);
                            return next.handle(this.addToken(this.getNewRequest(req), data.AccessToken));
                        }
    
                        // If we don't get a new token, we are in trouble so logout.
                        return this.logoutUser();
                    }),
                    catchError(error => {
                        // If there is an exception calling 'refreshToken', bad news so logout.
                        return this.logoutUser();
                    }),
                    finalize(() => {
                        this.isRefreshingToken = false;
                    }),);
            } 
            else {
                return this.tokenSubject.pipe(
                    filter(token => token != null),
                    take(1),
                    switchMap(token => {
                        return next.handle(this.addToken(this.getNewRequest(req), token));
                    }),);
            }
        }
    
        getNewRequest(req: HttpRequest<any>): HttpRequest<any> {
            if (req.method == "GET") {
                return new HttpRequest('GET', req.url);
            }
            else if (req.method == "POST") {
                return new HttpRequest('POST', req.url, req.body);
            }
        }
    
        logoutUser() {
            // Route to the login page (implementation up to you)
            this.router.navigateByUrl('/login-form');
            return observableThrowError("");
        }
}