import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpService } from '../Error/http.service';
import { OrderResponse } from 'src/Models/OrderResponse';



@Injectable()
export class ProductService {
  ProductName: string;
    
    constructor(public httpService: HttpService){

    }

    GetAndroidPrice(AndroidPriceRequest):Observable<any> {
        var endPoint = "Product/GetAndroidPrice";
        return this.httpService.Post(endPoint, AndroidPriceRequest);
    }
    GetWindowsPrice(WindowsPriceRequest):Observable<any> {
        var endPoint = "Product/GetWindowsPrice";
        return this.httpService.Post(endPoint, WindowsPriceRequest);
    }
    GetWindowsYearlyPrice(WindowsYearlyPriceRequest):Observable<any> {
        var endPoint = "Product/GetWindowsYearlyPrice";
        return this.httpService.Post(endPoint, WindowsYearlyPriceRequest);
    }
    BuyAndroid(BuyAndroid):Observable<any> {
        var endPoint = "Product/BuyAndroid";
        return this.httpService.Post(endPoint, BuyAndroid);
    }
    BuyWindows(BuyWindows):Observable<any> {
        var endPoint = "Product/BuyWindows";
        return this.httpService.Post(endPoint, BuyWindows);
    }
    BuyWindowsYearly(BuyWindowsYearly):Observable<any> {
        var endPoint = "Product/BuyWindowsYearly";
        return this.httpService.Post(endPoint, BuyWindowsYearly);
    }
    // CheckForResult(OrderId):Observable<any> {
    //     var endPoint = "Order/CheckForResult?OrderId=" + OrderId;
    //     return this.httpService.Get(endPoint);
    // }
    
}
