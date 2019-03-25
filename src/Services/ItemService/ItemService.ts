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

    GetCategoryList():Observable<any>{
        var endPoint = "Admin/GetCategoryList";
        return this.httpService.Get(endPoint);
    }

    GetPriceListSource():Observable<any>{
        var endPoint = "Admin/GetPriceListSource";
        return this.httpService.Get(endPoint);
    }

    AssignPriceList(AssignPrice):Observable<any>{
        var endPoint = "Admin/AssignPriceList";
        return this.httpService.Post(endPoint, AssignPrice);
    }

    GetAssignedPriceList():Observable<any>{
        var endPoint = "Admin/GetAssignedPriceList";
        return this.httpService.Get(endPoint);
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

    GetPendingToDelvery(PartyMastId):Observable<any> {
        var endPoint = "Delivery/GetPendingToDelivery?PartyMastId=" + PartyMastId;
        return this.httpService.Get(endPoint);
    }

    UpdateDelivery(UpdateDelivery):Observable<any> {
        var endPoint = "Delivery/UpdateDelivery";
        return this.httpService.Post(endPoint, UpdateDelivery);
    }

    DeliveredList(DeliveredList):Observable<any> {
        var endPoint = "Delivery/DeliveredList";
        return this.httpService.Post(endPoint, DeliveredList);
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

    WalletStatement(WalletStatement):Observable<any> {
        var endPoint = "Wallet/WalletStatement";
        return this.httpService.Post(endPoint, WalletStatement);
    }
}
