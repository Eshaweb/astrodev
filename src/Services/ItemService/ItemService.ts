import { Injectable } from "@angular/core";
import { SalesResponse } from "../../Models/Sales/SalesResponse";
import { HttpService } from '../Error/http.service';
import { Observable } from 'rxjs';
import { BasePrice } from 'src/app/pages/admin/baseprice/baseprice.component';





@Injectable()
export class ItemService {
    ItActId:string;
    ItemAmount: any;
    constructor(public httpService: HttpService) {

    }
    GetPriceListByItActId(ItemMast):Observable<any> {
        var endPoint = "Item/GetPriceListByItActId";
        return this.httpService.Post(endPoint, ItemMast);
    }

    GetItemPrice(HardCopyPriceRequest):Observable<any> {
        var endPoint = "Item/GetItemPrice";
        return this.httpService.Post(endPoint, HardCopyPriceRequest);
    }

    GetBasePrice():Observable<BasePrice[]>{
        var endPoint = "Admin/GetBasePrice";
        return this.httpService.Get(endPoint);
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
}
