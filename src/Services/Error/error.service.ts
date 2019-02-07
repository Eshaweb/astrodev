import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ErrorData } from './ErrorData';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private loaderSubject = new Subject<ErrorData>();
  private loaderSubjectForArray = new Subject<ErrorData[]>();
  loaderState = this.loaderSubject.asObservable();
  loaderStateForArray = this.loaderSubjectForArray.asObservable();

  constructor() 
  { 


  }

  myErrorSubscription(errorData : ErrorData)
  {
    this.loaderSubject.next(<ErrorData>(errorData));
  }
  myErrorArraySubscription(errorData : ErrorData[])
  {
    this.loaderSubjectForArray.next(<ErrorData[]>(errorData));
  }
}
