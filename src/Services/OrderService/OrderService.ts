import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpService } from '../Error/http.service';
import { OrderResponse } from 'src/Models/OrderResponse';



@Injectable()
export class OrderService {
    OrderId: string;
    orderResponse: OrderResponse;
    
    constructor(public httpService: HttpService){

    }

    CreateOrder(orderModel):Observable<any> {
        var endPoint = "Order/CreateOrder";
        return this.httpService.Post(endPoint, orderModel);
    } 

    GetOrderIsDelivery(OrderId):Observable<any>{
        var endPoint = "Order/GetOrderIsDelivery?OrderId="+ OrderId;
        return this.httpService.Get(endPoint);
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

    OrderHistory(orderHistory):Observable<any>{
        var endPoint = "Order/OrderHistory";
        return this.httpService.Post(endPoint, orderHistory);
    }

    GetItemAmountByOrderId(OrderId):Observable<any>{
        var endPoint = "Order/GetItemAmountByOrderId?OrderId="+ OrderId;
        return this.httpService.Get(endPoint);
    }

    DeleteOrder(deleteOrder):Observable<any>{
        var endPoint = "Order/DeleteOrder";
        return this.httpService.Post(endPoint, deleteOrder);
    }

    LastPendingTransaction(PartyMastId):Observable<any>{
        var endPoint = "Order/LastPendingTransaction?PartyMastId="+ PartyMastId;
        return this.httpService.Get(endPoint);
    }

    OrderFreeReport(FreeReport):Observable<any>{
        var endPoint = "Order/OrderFreeReport";
        return this.httpService.Post(endPoint, FreeReport);
    }
}
