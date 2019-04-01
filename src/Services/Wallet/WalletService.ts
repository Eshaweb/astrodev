import { Injectable } from '@angular/core';
import { HttpService } from '../Error/http.service';
import { Observable } from 'rxjs';

@Injectable()
export class WalletService{
constructor(public httpService: HttpService){

}

GetWalletBalance(PartyMastId):Observable<any> {
        var endPoint = "Wallet/GetWalletBalance?PartyMastId=" + PartyMastId;
        return this.httpService.Get(endPoint);
    }

    GetFreeWallet(FreeWalletRequest):Observable<any> {
        var endPoint = "Wallet/GetFreeWallet";
        return this.httpService.Post(endPoint,FreeWalletRequest);
    }
    PurchaseWallet(WalletPurchase):Observable<any>{
        var endPoint = "Wallet/PurchaseWallet";
        return this.httpService.Post(endPoint,WalletPurchase);
    }

    PaymentComplete(payment):Observable<any> {
        var endPoint = "Wallet/PaymentComplete";
        return this.httpService.Post(endPoint,payment);
    }

    WalletStatement(WalletStatement):Observable<any> {
        var endPoint = "Wallet/WalletStatement";
        return this.httpService.Post(endPoint, WalletStatement);
    }
}