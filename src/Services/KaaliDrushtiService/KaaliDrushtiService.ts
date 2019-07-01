import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../Error/http.service';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { LoginService } from '../LoginService/LoginService';
import { PrathamartavaRequest } from '../../Models/Prathamartava/PrathamartavaRequest';
import { KaaliDrushtiRequest } from 'src/Models/KaaliDrushti/KaaliDrushtiRequest';

@Injectable()
export class KaaliDrushtiService {
    systemDate: string;
    kaaliDrushtiRequest: KaaliDrushtiRequest;
    DateinDateFormat: Date;
    TimeinDateFormat: Date;
    place: string;
    placeShort: string;
    timeZoneName: string;
    babyNamingResponse: any;
    constructor(private httpService: HttpService, handler: HttpBackend, public http: HttpClient) {
        this.http = new HttpClient(handler);
    }

    GetBabyNames(babyNameRequest): Observable<any> {
        var endPoint = "BabyNaming/GetBabyNames";
        return this.httpService.Post(endPoint, babyNameRequest);
    }
    
    getTimezone(lat, long) {
        var apiKey = LoginService.GoogleAPIKey
        var url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + long + '&timestamp=1458000000&key=' + apiKey
        return this.http.get(url);
    }
}