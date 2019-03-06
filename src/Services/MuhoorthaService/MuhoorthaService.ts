import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../Error/http.service';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { PanchangaResponse } from 'src/Models/Panchanga/PanchangaResponse';
import { PanchangaRequest } from 'src/Models/Panchanga/PanchangaRequest';

export class Star {
    Id: string;
    Text: string;
    RashiId: string;
}
// let stars: Star[] = [
//     { "Id": "1", "Text": "Ashwini", "RashiId":"1" },
//     { "Id": "2", "Text": "Bharani", "RashiId":"1" },
//     { "Id": "3", "Text": "Krittika", "RashiId":"1" },
//     { "Id": "3", "Text": "Krittika", "RashiId":"2" },
//     { "Id": "4", "Text": "Rohini", "RashiId":"2" },
//     { "Id": "5", "Text": "Mrigashira", "RashiId":"2" },
//     { "Id": "5", "Text": "Mrigashira", "RashiId":"3" },
//     { "Id": "6", "Text": "Ardra", "RashiId":"3" },
//     { "Id": "7", "Text": "Punarvasu", "RashiId":"3" },
//     { "Id": "7", "Text": "Punarvasu", "RashiId":"4" },
//     { "Id": "8", "Text": "Pushya", "RashiId":"4" },
//     { "Id": "9", "Text": "Ashlesha", "RashiId":"4" },
//     { "Id": "10", "Text": "Magha", "RashiId":"5" },
//     { "Id": "11", "Text": "Poorva(Hubba)", "RashiId":"5" },
//     { "Id": "12", "Text": "Uttara", "RashiId":"5" },
//     { "Id": "12", "Text": "Uttara", "RashiId":"6" },
//     { "Id": "13", "Text": "Hasta", "RashiId":"6" },
//     { "Id": "14", "Text": "Chithra", "RashiId":"6" },
//     { "Id": "14", "Text": "Chithra", "RashiId":"7" },
//     { "Id": "15", "Text": "Swathi", "RashiId":"7" },
//     { "Id": "16", "Text": "Vishakha", "RashiId":"7" },
//     { "Id": "16", "Text": "Vishakha", "RashiId":"8" },
//     { "Id": "17", "Text": "Anuradha", "RashiId":"8" },
//     { "Id": "18", "Text": "Jyeshta", "RashiId":"8" },
//     { "Id": "19", "Text": "Moola", "RashiId":"9" },
//     { "Id": "20", "Text": "Poorvashada", "RashiId":"9" },
//     { "Id": "21", "Text": "Uttarashada", "RashiId":"9" },
//     { "Id": "21", "Text": "Uttarashada", "RashiId":"10" },
//     { "Id": "22", "Text": "Shravana", "RashiId":"10" },
//     { "Id": "23", "Text": "Dhanishta", "RashiId":"10" },
//     { "Id": "23", "Text": "Dhanishta", "RashiId":"11" },
//     { "Id": "24", "Text": "Shatabhisha", "RashiId":"11" },
//     { "Id": "25", "Text": "Poorvabhadra", "RashiId":"11" },
//     { "Id": "25", "Text": "Poorvabhadra", "RashiId":"12" },
//     { "Id": "26", "Text": "Uttarabhadra", "RashiId":"12" },
//     { "Id": "27", "Text": "Revathi", "RashiId":"12" },
//   ];
@Injectable()
export class MuhurthaService {
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
   
    GetMuhurthaList():Observable<any> {
    var endPoint = "Muhurtha/GetMuhurthaList";
    return this.httpService.Get(endPoint);
}

getTimezone(lat, long) {
    var apiKey = 'AIzaSyD68pTd0CmqTXSqPHFpLrPWkiClqPBIpLQ'
    var url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + long + '&timestamp=1458000000&key=' + apiKey
    return this.http.get(url);
}
}