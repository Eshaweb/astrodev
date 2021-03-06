import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpBackend, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { HoroRequest } from "src/Models/HoroScope/HoroRequest";
import { ResultResponse } from "src/Models/ResultResponse";
import { HttpService } from '../Error/http.service';
import { ErrorService } from '../Error/error.service';
import { CaptionDbService } from '../CaptionService/captionDb.service';
import { HoroResponse } from 'src/Models/HoroScope/HoroResponse';
import { Caption } from 'src/Models/Caption';
import { LoginService } from '../LoginService/LoginService';
export class SelectBoxModelNew{
    Id: number;
    Text: string;
}
let products: SelectBoxModelNew[] = [{
    "Id": 1,
    "Text": "HD Video Player"
}, {
    "Id": 2,
    "Text": "SuperHD Player"
}];


@Injectable()
export class HoroScopeService {
    systemDate:string;
    resultResponse:ResultResponse;
    //orderResponse:OrderResponse;
    PaymentId: string;
    ExtCode: string;
    //OrderId: string;
    Fathername: string;
    Mothername: string;
    birthplace: string;
    IsDeliverable: boolean;
    Shloka1: string;
    Shloka2: string;
    JanmaNakshatra: string;
    existingAddress: any;
    defaultAddress: any;
    paymentModes: any;
    horoRequest: HoroRequest;
    birthDateinDateFormat:Date;
    birthTimeinDateFormat:Date;
    AstroReportId:string;
    itemOrdered: ServiceInfo;
    horoResponse: HoroResponse;
    birthplaceShort: string;
  timeZoneName: string;
    constructor(private captionDbService:CaptionDbService,private httpService: HttpService, private errorService: ErrorService, handler: HttpBackend, public http: HttpClient) {
        this.http = new HttpClient(handler);
    }
    getProducts(): SelectBoxModelNew[] {
        return products;
    }

    //:Observable<SalesResponse>
    GetFreeData(horoRequest):Observable<any> {
        var endPoint = "HoroScope/GetFreeData";
        return this.httpService.Post(endPoint, horoRequest);
    }
    GetCaption(langCode:string,caption:Caption)
    {
     this.captionDbService.GetCaption(langCode,caption);
    }
    // DownloadResult(AstroReportId, callback: (data) => void){
    //     var url = "https://astroliteapi.azurewebsites.net/api/Order/DownloadResult?AstroReportId=" + AstroReportId;
    //     //var url = "https://mahadevapi.azurewebsites.net/api/Order/DownloadResult?AstroReportId=" + AstroReportId;
    //     let headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer'+this.loginService.AccessToken });
    //     this.http.get(url, { responseType: "blob", headers:headers }).subscribe((data: any) => {
    //         this.existingAddress = data;
    //         callback(data);
    //     }, (error) => {
    //         var errorMessage={
    //           Error:error
    //         }
    //         callback(errorMessage);
    //     });
    // }
  
    // DownloadSample(horoSample) {
    //     var url = "https://astroliteapi.azurewebsites.net/api/Item/DownloadSample";
    //     //var url = "https://mahadevapi.azurewebsites.net/api/Item/DownloadSample";
    //     let headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer'+this.loginService.AccessToken });
    //     return this.http.post(url, horoSample, { responseType: "blob", headers:headers  });
    // }
   
    DownloadResult(AstroReportId){
        var endPoint = "Order/DownloadResult?AstroReportId=" + AstroReportId;
        return this.httpService.Get_PDF(endPoint);
    }
  
    DownloadSample(horoSample) {
        var endPoint = "Item/DownloadSample";
        return this.httpService.Post_PDF(endPoint, horoSample);
    }

    GetAllAddress(PartyMastId):Observable<any> {
        var endPoint = "Address/GetAllAddress?PartyMastId=" + PartyMastId;
        return this.httpService.Get(endPoint);
    }
   
    GetDefaultAddress(PartyMastId):Observable<any> {
        var endPoint = "Address/GetDefaultAddress?PartyMastId=" + PartyMastId;
        return this.httpService.Get(endPoint);
    }

    CreateAddress(addessModel):Observable<any> {
        var endPoint = "Address/CreateAddress";
        return this.httpService.Post(endPoint, addessModel);
    }

    DeleteAddress(addessModel) :Observable<any>{
        var endPoint = "Address/DeleteAddress";
        return this.httpService.Post(endPoint, addessModel);
    }

    CreateAndUpdateOrder(addessModel):Observable<any> {
        var endPoint = "Address/CreateAndUpdateOrder";
        return this.httpService.Post(endPoint, addessModel);
    }
   
    GetPayCodes():Observable<any> {
        var endPoint = "Sales/GetPayCodes";
        return this.httpService.Get(endPoint);
    }
    
    GetEMailAddress(PartyMastId):Observable<any> {
        var endPoint = "Party/GetEMailAddress?PartyMastId=" + PartyMastId;
        return this.httpService.Get(endPoint);
    }
    getTimezone(lat, long) {
        var apiKey = LoginService.GoogleAPIKey;
        var url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + long + '&timestamp=1458000000&key=' + apiKey
        //var url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + long + '&timestamp='+timestamp+'&key=' + apiKey
        return this.http.get(url);
    }
    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = null;
        if (err.status == 401) {
            errorMessage = 401;
        }
        else if (err.status == 0) {
            errorMessage = 'Internal Server Error';
            console.clear();
        }
        else if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error}`;
        }
        else if (err == null || err == undefined) {
            errorMessage = 'Network Error';
        }
        else {
            if (err.error != null) {
                if (typeof err.error === 'string') {
                    errorMessage = err.error;
                }
                else if (err.error.Errors != undefined) {
                    for (var i = 0; i < err.error.Errors.length; i++) {
                        errorMessage = err.error.Errors[i].ErrorString;
                    }
                }
                else {
                    errorMessage = err.error;
                }
            }
            else {
                errorMessage = 'Network Error';
            }
        }

        console.log(errorMessage);
        // if (errorMessage != '') {
        if (errorMessage != null) {
            return Observable.throw(errorMessage);
        } else {
            return Observable.throw(err);
        }
    }
}
export class ServiceInformation {
    ItMastId: string;
    Name: string;
    Description: string;
    MRP: number;
    Amount: number;
    PrintMRP: number;
    PrintAmount: number;
}
export class ServiceInfo {
    ItMastId: string;
    Name: string;
    Description: string;
    MRP: number;
    Amount: number;
    PrintMRP: number;
    PrintAmount: number;
    IsHardCopy?: boolean;
}
export class PaymentInfo {
    Title: string;
}
