import { Injectable } from '@angular/core';
import { HttpService } from '../Error/http.service';

@Injectable()
export class WalletService{
constructor(public httpService: HttpService){

}

GetWalletBalance(PartyMastId, callback: (data) => void) {
        var endPoint = "Wallet/GetWalletBalance?PartyMastId=" + PartyMastId;
        return this.httpService.Get(endPoint).subscribe((data: any) => {
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });
    }

    GetFreeWallet(FreeWalletRequest, callback: (data) => void) {
        var endPoint = "Wallet/GetFreeWallet";
        return this.httpService.Post(endPoint,FreeWalletRequest).subscribe((data: any) => {
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });
    }
    PurchaseWallet(WalletPurchase, callback: (data) => void) {
        var endPoint = "Wallet/PurchaseWallet";
        return this.httpService.Post(endPoint,WalletPurchase).subscribe((data: any) => {
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });
    }

    PaymentComplete(payment, callback: (data) => void) {
        var endPoint = "Wallet/PaymentComplete";
        return this.httpService.Post(endPoint,payment).subscribe((data: any) => {
            callback(data);
        }, (error) => {
            var errorMessage={
              Error:error
            }
            callback(errorMessage);
        });
    }
}