import { Injectable, ViewChild } from '@angular/core';
import { LoadingSwitchService } from '../LoadingSwitchService/LoadingSwitchService';
import { StorageService } from '../StorageService/Storage_Service';
import { OrderService } from '../OrderService/OrderService';
import { HoroScopeService } from '../HoroScopeService/HoroScopeService';
import { Router } from '@angular/router';
import { PartyService } from '../PartyService/PartyService';
import { WalletService } from '../Wallet/WalletService';
import { DxLoadPanelComponent } from 'devextreme-angular';
import { LoginService } from '../LoginService/LoginService';
declare var Razorpay: any;


@Injectable()
export class RazorPayService {
  @ViewChild(DxLoadPanelComponent) public loadPanel: DxLoadPanelComponent;
    paymentId: any;
    partyMobileNo: any;
    partyEmail: any;
    constructor(public loadingSwitchService:LoadingSwitchService,public horoScopeService:HoroScopeService, public orderService:OrderService,
        public router:Router, public partyService:PartyService, public walletService:WalletService, public loginService:LoginService){
            this.partyService.GetContactDetails(StorageService.GetItem('PartyMastId')).subscribe((data: any) => {
                if (data.Errors == undefined) {
                  this.partyEmail = data.EMail;
                  this.partyMobileNo = data.Mobile;
                }
              });
    }
    pay(payableAmountthroughPaymentGateWay, category) {
      this.loadingSwitchService.loading = true;
        var options = {
          description: 'Credits towards AstroLite',
          image: 'https://i.ibb.co/dkhhhR1/icon-72x72.png',
          currency: 'INR',
          key: this.loginService.razorPayKey,
          amount: payableAmountthroughPaymentGateWay * 100,
          name: StorageService.GetItem('Name'),
          "handler": (response) => {
            this.loadingSwitchService.loading = false;
            this.paymentId = response.razorpay_payment_id;
            var Payment = {
              PaymentId: this.paymentId
            }
            if(category=="Service"||category=="Product"){
              this.ProductService_PaymentComplete(Payment, category);
            }
            else if(category=="Wallet"){
              this.WalletPaymentComplete(Payment);
            }
          },
          prefill: {
            //email: this.partyEmail,
            email: 'shailesh@gmail.com',
            contact: this.partyMobileNo
          },
          notes: {
            order_id: StorageService.GetItem('ExtCode'),
          },
          theme: {
            color: '#d05b19'
          },
          modal: {
            ondismiss: () => {
              //this.loadPanel.visible = false;
              this.loadingSwitchService.loading = false;
            }
          }
        };
    
        var rzp1 = new Razorpay(options, successCallback, cancelCallback);
        //rzp1.open();
        var successCallback = (payment_id) => {
          alert('payment_id: ' + payment_id);
        };
    
        var cancelCallback = (error) => {
          alert(error.description + ' (Error ' + error.code + ')');
        };
        rzp1.open(options, successCallback, cancelCallback);
      }

      ProductService_PaymentComplete(Payment, category) {
        //this.loading = true;
        //this.loadPanel.visible = true;
        this.loadingSwitchService.loading = false;
        this.orderService.PaymentComplete(Payment).subscribe((data) => {
          if (data.Error == undefined) {
            this.horoScopeService.resultResponse = data;
            if (data.AstroReportId.length != 0) {
              this.horoScopeService.AstroReportId = data.AstroReportId[0].split('_')[0];
            }
            //this.loading = false;
            this.loadingSwitchService.loading = false;
            //this.loadPanel.visible = false;
            if(category=="Service"){
              this.router.navigate(['/purchase/paymentProcessing'], { skipLocationChange: true });
            }
            else if(category=="Product"){
              this.loadingSwitchService.loading = false;
              this.router.navigate(['/products/paymentsuccess'], { skipLocationChange: true });
              return this.loadingSwitchService.loading;
            }
            //this.router.navigate(['/purchase/paymentProcessing']);
          }
          else {
            //this.errorMessage = data.Error;
            this.loadingSwitchService.loading = false;
          }
         
        });
      }

      WalletPaymentComplete(Payment) {
        this.loadingSwitchService.loading=true;
        this.walletService.PaymentComplete(Payment).subscribe((data) => {
          if (data.Error == undefined) {
            this.loadingSwitchService.loading=false;
            // this.router.navigate(['/purchase/walletPaymentSuccess'], { skipLocationChange: true });
            this.walletService.GetWalletBalance(StorageService.GetItem('PartyMastId')).subscribe((data) => {
              if (data.Errors == undefined) {
                this.walletService.walletBalanceAmount = data;
                this.walletService.message='PaymentCompleted and Balance Updated';
                this.loadingSwitchService.loading=false;
              }
            });
          }
          else {
            this.walletService.errorMessage = data.Error;
            this.loadingSwitchService.loading=false;
          }
        });
      }
}