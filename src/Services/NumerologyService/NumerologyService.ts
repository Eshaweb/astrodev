import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CaptionDbService } from '../CaptionService/captionDb.service';
import { HttpService } from '../Error/http.service';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { ErrorService } from '../Error/error.service';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { HoroResponse } from 'src/Models/HoroScope/HoroResponse';
import { PrashnaFreeModel } from 'src/Models/Astamangala/prashnaFreeModel';



@Injectable()
export class NumerologyService {
    systemDate:string;
    horoRequest: HoroRequest;
    DateinDateFormat:Date;
    TimeinDateFormat:Date;
    horoResponse: PrashnaFreeModel;
    place: string;
    placeShort: string;
  timeZoneName: string;
    constructor(private httpService: HttpService, 
        handler: HttpBackend, public http: HttpClient) {
        this.http = new HttpClient(handler);
    }

GetFreeData(horoRequest):Observable<any> {
    var endPoint = "Horoscope/GetFreePrashnaData";
    return this.httpService.Post(endPoint, horoRequest);
}
}