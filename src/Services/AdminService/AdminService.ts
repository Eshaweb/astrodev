import { Injectable } from "@angular/core";
import { HttpService } from '../Error/http.service';
import { Observable } from 'rxjs';
import { BasePrice } from 'src/app/pages/admin/baseprice/baseprice.component';

@Injectable()
export class AdminService {
    constructor(public httpService: HttpService) {

    }

    GetBasePrice(Type):Observable<BasePrice[]>{
        var endPoint = "Admin/GetBasePrice";
        return this.httpService.Post(endPoint, Type);
    }

    UpdateBasePrice(item):Observable<any>{
        var endPoint = "Admin/UpdateBasePrice";
        return this.httpService.Post(endPoint, item);
    }
    GeneratePriceList(item):Observable<any>{
        var endPoint = "Admin/GeneratePriceList";
        return this.httpService.Post(endPoint, item);
    }
    CreatePriceList(item):Observable<any>{
        var endPoint = "Admin/CreatePriceList";
        return this.httpService.Post(endPoint, item);
    }

    GetPriceList():Observable<any>{
        var endPoint = "Admin/GetPriceList";
        return this.httpService.Get(endPoint);
    }

    GetRate(Rate):Observable<any>{
        var endPoint = "Admin/GetRate";
        return this.httpService.Post(endPoint, Rate);
    }

    DeletePriceList(Rate):Observable<any>{
        var endPoint = "Admin/DeletePriceList";
        return this.httpService.Post(endPoint, Rate);
    }

    GetCategoryList():Observable<any>{
        var endPoint = "Admin/GetCategoryList";
        return this.httpService.Get(endPoint);
    }

    GetPriceListSource(PriceListRequest):Observable<any>{
        var endPoint = "Admin/GetPriceListSource";
        return this.httpService.Post(endPoint,PriceListRequest);
    }

    AssignPriceList(AssignPrice):Observable<any>{
        var endPoint = "Admin/AssignPriceList";
        return this.httpService.Post(endPoint, AssignPrice);
    }

    GetAssignedPriceList():Observable<any>{
        var endPoint = "Admin/GetAssignedPriceList";
        return this.httpService.Get(endPoint);
    }

    GetParty(FindParty):Observable<any>{
        var endPoint = "Admin/GetParty";
        return this.httpService.Post(endPoint,FindParty);
    }

    UpdateCustomerCategory(CustomerCategory):Observable<any>{
        var endPoint = "Admin/UpdateCustomerCategory";
        return this.httpService.Post(endPoint,CustomerCategory);
    }

    DeleteAssignedPriceList(List):Observable<any>{
        var endPoint = "Admin/DeleteAssignedPriceList";
        return this.httpService.Post(endPoint, List);
    }

    GetGiftAmount():Observable<any>{
        var endPoint = "Admin/GetGiftAmount";
        return this.httpService.Get(endPoint);
    }

    UpdateGiftAmount(WO):Observable<any>{
        var endPoint = "Admin/UpdateGiftAmount";
        return this.httpService.Post(endPoint, WO);
    }

    OfflinePaymentList():Observable<any> {
        var endPoint = "Admin/OfflinePaymentList";
        return this.httpService.Get(endPoint);
    }

    AuthorizePayment(AuthorizePayment):Observable<any> {
        var endPoint = "Admin/AuthorizePayment";
        return this.httpService.Post(endPoint, AuthorizePayment);
    }

    AuthorizedPaymentList(AuthorizedPaymentList):Observable<any> {
        var endPoint = "Admin/AuthorizedPaymentList";
        return this.httpService.Post(endPoint, AuthorizedPaymentList);
    }

}
