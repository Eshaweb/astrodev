import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { CaptionDbService } from '../CaptionService/captionDb.service';
import { HttpService } from '../Error/http.service';
import { ErrorService } from '../Error/error.service';
import { Observable } from 'rxjs';
import { Caption } from 'src/Models/Caption';
import { PanchaPakshiRequest } from 'src/Models/PanchaPakshi/PanchaPakshiRequest';


@Injectable()
export class PanchaPakshiService {
  panchaPakshiRequest: PanchaPakshiRequest;
  birthDateinDateFormat: Date;
  birthTimeinDateFormat: Date;
  fromDateinDateFormat: Date;
  toDateinDateFormat: Date;
  timeZoneName: string;
  birthplace: any;
  birthplaceShort: string;
  systemDate: string;
  panchapakshiResponse: any;
  presentPlace: string;
  presentPlaceShort: string;
  PresentPlace_timeZoneName: string;
  BirthPlace_timeZoneName: string;
    
  constructor(private captionDbService:CaptionDbService,private httpService: HttpService, private errorService: ErrorService, 
    handler: HttpBackend, public http: HttpClient) {
    this.http = new HttpClient(handler);
}
GetSputasOnSunRise(panchapakshiRequest):Observable<any> {
    var endPoint = "PanchaPakshi/GetSputasOnSunRise";
    return this.httpService.Post(endPoint, panchapakshiRequest);
}
    GetFreeData(horoRequest):Observable<any> {
        var endPoint = "HoroScope/GetFreeDataPanchaPakshi";
        return this.httpService.Post(endPoint, horoRequest);
    }
    GetCaption(langCode:string,caption:Caption)
    {
     this.captionDbService.GetCaption(langCode,caption);
    }
   
    getTimezone(lat, long) {
        var apiKey = 'AIzaSyCvfK_tYN-xiSpc0leO9N-ffswKm4G49VI';
        var url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + long + '&timestamp=1458000000&key=' + apiKey
        return this.http.get(url);
    }
}