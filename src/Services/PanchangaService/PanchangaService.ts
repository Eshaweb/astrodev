import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../Error/http.service';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { PanchangaResponse } from 'src/Models/Panchanga/PanchangaResponse';
import { PanchangaRequest } from 'src/Models/Panchanga/PanchangaRequest';

@Injectable()
export class PanchangaService {
    systemDate:string;
    panchangaRequest: PanchangaRequest;
    DateinDateFormat:Date;
    TimeinDateFormat:Date;
    panchangaResponse: PanchangaResponse;
    place: string;
    placeShort: string;
  timeZoneName: string;
    constructor(private httpService: HttpService, 
        handler: HttpBackend, public http: HttpClient) {
        this.http = new HttpClient(handler);
    }
    
    GetPanchanga(horoRequest):Observable<any> {
    var endPoint = "DayPanchanga/GetPanchanga";
    return this.httpService.Post(endPoint, horoRequest);
}
GetSputasOnSunRise(horoRequest):Observable<any> {
    var endPoint = "PanchaPakshi/GetSputasOnSunRise";
    return this.httpService.Post(endPoint, horoRequest);
}
getTimezone(lat, long) {
    var apiKey = 'AIzaSyD68pTd0CmqTXSqPHFpLrPWkiClqPBIpLQ'
    var url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + long + '&timestamp=1458000000&key=' + apiKey
    return this.http.get(url);
}
}