import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpBackend, HttpErrorResponse } from "@angular/common/http";
import { HoroRequest } from "src/Models/HoroScope/HoroRequest";
import { OrderResponse } from "src/Models/OrderResponse";
import { ResultResponse } from "src/Models/ResultResponse";
import { HttpService } from '../Error/http.service';
import { ErrorService } from '../Error/error.service';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
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
    orderResponse:OrderResponse;
    PaymentId: string;
    ExtCode: string;
    OrderId: string;
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
    data: any;
    ItActId = '#SH';
    birthplaceShort: string;
    constructor(private httpService: HttpService, private errorService: ErrorService, handler: HttpBackend, public http: HttpClient) {
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

    DownloadResult(AstroReportId, callback: (data) => void){
        var url = "https://astroliteapi.azurewebsites.net/api/Order/DownloadResult?AstroReportId=" + AstroReportId;
        this.http.get(url, { responseType: "blob" }).subscribe((data: any) => {
            this.existingAddress = data;
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });
    }
  
    GetSample(horoSample) {
        var url = "http://astroliteapi.azurewebsites.net/api/Result/GetSample";
        return this.http.post(url, horoSample, { responseType: "blob" });
    }
   
    CreateOrder(orderModel, callback: (data) => void) {
        var endPoint = "Order/CreateOrder";
        return this.httpService.Post(endPoint, orderModel);
    }
   
    GetAllAddress(PartyMastId, callback: (data) => void) {
       
        var endPoint = "Address/GetAllAddress?PartyMastId=" + PartyMastId;
        this.httpService.Get(endPoint);
    }
   
    GetDefaultAddress(PartyMastId, callback: (data) => void) {
        var endPoint = "Address/GetDefaultAddress?PartyMastId=" + PartyMastId;
        this.httpService.Get(endPoint);
    }
    
    GetPriceListByItActId(ItemMast, callback: (data) => void) {
        var endPoint = "Item/GetPriceListByItActId";
        this.httpService.Post(endPoint, ItemMast);
    }

    GetItemPrice(HardCopyPriceRequest, callback: (data) => void) {
        var endPoint = "Item/GetItemPrice";
        this.httpService.Post(endPoint, HardCopyPriceRequest);
    }

    CreateAddress(addessModel, callback: (data) => void) {
        var endPoint = "Address/CreateAddress";
        return this.httpService.Post(endPoint, addessModel);
    }

    DeleteAddress(addessModel, callback: (data) => void) {
        var endPoint = "Address/DeleteAddress";
        return this.httpService.Post(endPoint, addessModel);
    }

    CreateAndUpdateOrder(addessModel, callback: (data) => void) {
        var endPoint = "Address/CreateAndUpdateOrder";
        return this.httpService.Post(endPoint, addessModel);
    }

    UpdateAddressToOrder(orderAddress, callback: (data) => void) {
        var endPoint = "Order/UpdateAddressToOrder";
        return this.httpService.Post(endPoint, orderAddress);
    }
   
    GetPayCodes(callback: (data) => void) {
        var endPoint = "Sales/GetPayCodes";
        this.httpService.Get(endPoint);
    }

    OccupyPromoCode(Couponcode, callback: (data) => void) {
        var endPoint = "Promo/OccupyPromoCode?Promo=" + Couponcode;
        return this.httpService.Get(endPoint);
    }

    CreateBillPayModeToOrder(orderAddress, callback: (data) => void) {
        var endPoint = "Order/CreateBillPayModeToOrder";
        return this.httpService.Post(endPoint, orderAddress);
    }

    PaymentComplete(payment, callback: (data) => void) {
        var endPoint = "Order/PaymentComplete";
        return this.httpService.Post(endPoint, payment);
    }

    CheckForResult(OrderId, callback: (data) => void) {
        var endPoint = "Order/CheckForResult?OrderId=" + OrderId;
        this.httpService.Get(endPoint);
    }

    GetEMailAddress(PartyMastId) {
        var endPoint = "Party/GetEMailAddress?PartyMastId=" + PartyMastId;
        this.httpService.Get(endPoint);
    }
    getTimezone(lat, long) {
        var apiKey = 'AIzaSyD68pTd0CmqTXSqPHFpLrPWkiClqPBIpLQ'
        var url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + long + '&timestamp=1458000000&key=' + apiKey
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

    getInfo() {
        return payusing;
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

let payusing: PaymentInfo[] = [{
    "Title": "Astrolite Wallet"
}, {
    "Title": "Payment Gateway"
}];
