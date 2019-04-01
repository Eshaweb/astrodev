import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CaptionDbService } from '../CaptionService/captionDb.service';
import { HttpService } from '../Error/http.service';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { ErrorService } from '../Error/error.service';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { PrashnaFreeModel } from 'src/Models/Astamangala/prashnaFreeModel';



@Injectable()
export class AstamangalaService {
    systemDate:string;
    horoRequest: HoroRequest;
    DateinDateFormat:Date;
    TimeinDateFormat:Date;
    horoResponse: PrashnaFreeModel;
    place: string;
    placeShort: string;
  timeZoneName: string;
    constructor(private captionDbService:CaptionDbService,private httpService: HttpService, 
        private errorService: ErrorService, handler: HttpBackend, public http: HttpClient) {
        this.http = new HttpClient(handler);
    }

GetFreeData(horoRequest):Observable<any> {
    var endPoint = "Horoscope/GetFreePrashnaData";
    return this.httpService.Post(endPoint, horoRequest);
}

getTimezone(lat, long) {
    var apiKey = 'AIzaSyD68pTd0CmqTXSqPHFpLrPWkiClqPBIpLQ'
    var url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + long + '&timestamp=1458000000&key=' + apiKey
    return this.http.get(url);
}
}