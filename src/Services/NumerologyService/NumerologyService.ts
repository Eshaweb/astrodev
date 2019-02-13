import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CaptionDbService } from '../CaptionService/captionDb.service';
import { HttpService } from '../Error/http.service';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { ErrorService } from '../Error/error.service';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { HoroResponse } from 'src/Models/HoroScope/HoroResponse';
import { PrashnaFreeModel } from 'src/Models/Astamangala/prashnaFreeModel';
import { NumerologyRequest } from 'src/Models/Numerology/numerologyRequest';
import { NumerologyResponse } from 'src/Models/Numerology/numerologyResponse';



@Injectable()
export class NumerologyService {
    systemDate:string;
    numerologyRequest: NumerologyRequest;
    DateinDateFormat:Date;
    TimeinDateFormat:Date;
    numerologyResponse: NumerologyResponse;
    place: string;
    placeShort: string;
  timeZoneName: string;
  birthDateinDateFormat: Date;
    constructor(private httpService: HttpService, 
        handler: HttpBackend, public http: HttpClient) {
        this.http = new HttpClient(handler);
    }

GetFreeData(numerologyRequest):Observable<any> {
    var endPoint = "Numerology/GetFreeData";
    return this.httpService.Post(endPoint, numerologyRequest);
}
}