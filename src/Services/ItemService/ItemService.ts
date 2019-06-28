import { Injectable } from "@angular/core";
import { HttpService } from '../Error/http.service';
import { Observable } from 'rxjs';
import { BasePrice } from 'src/app/pages/admin/baseprice/baseprice.component';

@Injectable()
export class ItemService {
    ItActId:string;
    ItemAmount: any;
    BuyNowVisible: boolean;
    ItemName: string;
  walletAmount: any;
  AmounttoPay_Offline: any;
  DownloadButtonVisible: boolean;
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

    GetUnUsedPromoCodes():Observable<any>{
        var endPoint = "Promo/GetUnUsedPromoCodes";
        return this.httpService.Get(endPoint);
    }

    GetUsedPromoCodes():Observable<any>{
        var endPoint = "Promo/GetUsedPromoCodes";
        return this.httpService.Get(endPoint);
    }

    CreatePromoCode(PromoModel):Observable<any>{
        var endPoint = "Promo/CreatePromoCode";
        return this.httpService.Post(endPoint, PromoModel);
    }

    SendPromoCode(SendPromo):Observable<any>{
        var endPoint = "Promo/SendPromoCode";
        return this.httpService.Post(endPoint, SendPromo);
    }

    DeletePromoCode(Id):Observable<any> {
        var endPoint = "Promo/DeletePromoCode?Id=" + Id;
        return this.httpService.Get(endPoint);
    }

    OccupyPromoCode(Couponcode):Observable<any> {
        var endPoint = "Promo/OccupyPromoCode";
        return this.httpService.Post(endPoint, Couponcode);
    }

    GetPendingToDelvery(PendingToDelveryRequest):Observable<any> {
        var endPoint = "Delivery/GetPendingToDelivery";
        return this.httpService.Post(endPoint, PendingToDelveryRequest);
    }

    UpdateDelivery(UpdateDelivery):Observable<any> {
        var endPoint = "Delivery/UpdateDelivery";
        return this.httpService.Post(endPoint, UpdateDelivery);
    }

    DeliveredList(DeliveredList):Observable<any> {
        var endPoint = "Delivery/DeliveredList";
        return this.httpService.Post(endPoint, DeliveredList);
    }

    DownloadSample(horoSample) {
        var endPoint = "Item/DownloadSample";
        return this.httpService.Post_PDF(endPoint, horoSample);
    }
}
