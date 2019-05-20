import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ErrorService } from './error.service';
import { isObject } from 'util';
import { of, Subscription } from 'rxjs';
import { ModelError, ErrorContainer, ErrorData } from './ErrorData';
import { shareReplay } from 'rxjs/operators';
import { LoginService } from '../LoginService/LoginService';
import { StorageService } from '../StorageService/Storage_Service';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}

export function applicationHttpClientCreator(http: HttpClient, errorService: ErrorService) {
  return new HttpService(http, errorService);
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
   private api = 'https://astroliteapi.azurewebsites.net/api/';
  //private api = 'https://mahadevaapi.azurewebsites.net/api/';
  private errorData: ErrorData;
  url: string;
  params: Object;
  method: string;
  RefreshToken: { RefreshToken: any; };
  urlnew: string;
  AccessToken: any;
   constructor(public http: HttpClient, private errorService: ErrorService) {
    // If you don't want to use the extended versions in some cases you can access the public property and use the original one.
    // for ex. this.httpClient.http.get(...)
    this.errorData = {
      errorContainer: null,
    };
    // this.url='Party/GetAccessToken';
    // this.RefreshToken={
    //   RefreshToken:StorageService.GetItem('refreshToken')
    // }
  }

  /**
  * GET request
  * @param {string} endPoint it doesn't need / in front of the end point
  * @param {IRequestOptions} options options of the request like headers, body, etc.
  * @returns {Observable<T>}
  */
  public Get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    let subscription = this.http.get<T>(this.api + endPoint, options).pipe(shareReplay());
    this.errorSuscription(subscription);
    return subscription;
  }

  /**
   * POST request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Post<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
    // if(endPoint!='Party/GetAccessToken'){
    //   this.urlnew=endPoint;
    //   this.params=params;
    // }
    let subscription = this.http.post<T>(this.api + endPoint, params, options).pipe(shareReplay());
    this.errorSuscription(subscription);
    return subscription;
  }

  private errorSuscription(subscription: Observable<any>) {
    subscription.subscribe((data: any) => {
      if (data.Errors != undefined) {
        for (var i = 0; i < data.Errors.length; i++) {
         var errorMessageObject={errorMessage:data.Errors[i].ErrorString};
         if(i==0) {
          var errorData = [{
            errorMessage: data.Errors[i].ErrorString
          }];
         }
          if(i>0){
            errorData.push(errorMessageObject);
          }
        }
        this.errorService.myErrorArraySubscription(errorData);
      }
      // else if (data[0].ErrorName != undefined) {
      //   this.errorData = {
      //     errorContainer: data,
      //   };
      //   this.errorService.myErrorSubscription(this.errorData);
      // }

      // if (data[0].ErrorName != undefined) {
      //   this.errorData = {
      //     errorContainer: data,
      //   };
      //   this.errorService.myErrorSubscription(this.errorData);
      // }
    }, err => this.handleError(err, this.errorService));
  }

  errors: ModelError[];
  error: ModelError;
  handleError(err: HttpErrorResponse, errorService: ErrorService) {
    if (err.status == 400) {
      if (isObject(err.error)) {
        this.errors = [];
        let validationErrorDictionary = err.error.errors;
        for (var fieldName in validationErrorDictionary) {
          if (validationErrorDictionary.hasOwnProperty(fieldName)) {
            this.error = {
              Property: fieldName,
              Error: validationErrorDictionary[fieldName][0]
            };
            this.errors.push(this.error);
          }
        }
        this.errorData = {
          modelError: this.errors,
        };
      }
      else {
        this.errorData = {
          errorMessage: err.error,
        };
      }
      
    }
    else if (err.status == 401) {
      this.errorData = {
        errorMessage: err.statusText,
      };
      // this.Post(this.url, this.RefreshToken).subscribe((data: any) => {
      //   this.AccessToken=data.AccessToken;
      //   this.Post(this.urlnew, this.params);
      //   // errorService.myErrorSubscription(this.errorData);
      //   // return of(null);
      // });
     
    }
    else if (err.status == 405) {
      this.errorData = {
        errorMessage: err.statusText,
      };
      
    }
    errorService.myErrorSubscription(this.errorData);
    return of(null);
  }
}
