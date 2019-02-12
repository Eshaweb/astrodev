import { Injectable } from "@angular/core";
import { Party } from "../../Models/Party/Party";
import { Observable } from 'rxjs';
import { HttpService } from '../Error/http.service';



@Injectable()
export class OrderService {
    OrderId: string;
    
    constructor(public httpService: HttpService){

    }

    CreateOrder(orderModel):Observable<any> {
        var endPoint = "Order/CreateOrder";
        return this.httpService.Post(endPoint, orderModel);
    }

    UpdateAddressToOrder(orderAddress):Observable<any> {
        var endPoint = "Order/UpdateAddressToOrder";
        return this.httpService.Post(endPoint, orderAddress);
    }

    CreateBillPayModeToOrder(orderAddress):Observable<any> {
        var endPoint = "Order/CreateBillPayModeToOrder";
        return this.httpService.Post(endPoint, orderAddress);
    }

    PaymentComplete(payment):Observable<any> {
        var endPoint = "Order/PaymentComplete";
        return this.httpService.Post(endPoint, payment);
    }

    CheckForResult(OrderId):Observable<any> {
        var endPoint = "Order/CheckForResult?OrderId=" + OrderId;
        return this.httpService.Get(endPoint);
    }
}
