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
    BuyAndroid(BuyAndroid):Observable<any> {
        var endPoint = "Product/BuyAndroid";
        return this.httpService.Post(endPoint, BuyAndroid);
    }
    // CheckForResult(OrderId):Observable<any> {
    //     var endPoint = "Order/CheckForResult?OrderId=" + OrderId;
    //     return this.httpService.Get(endPoint);
    // }
    
}
