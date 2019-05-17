import { Injectable } from '@angular/core';
import { LoadingSwitchService } from '../LoadingSwitchService/LoadingSwitchService';
import { StorageService } from '../StorageService/Storage_Service';
import { OrderService } from '../OrderService/OrderService';
import { HoroScopeService } from '../HoroScopeService/HoroScopeService';
import { Router } from '@angular/router';
import { PartyService } from '../PartyService/PartyService';
declare var Razorpay: any;


@Injectable()
export class RazorPayService {
    paymentId: any;
    partyMobileNo: any;
    partyEmail: any;
    constructor(public loadingSwitchService:LoadingSwitchService,public horoScopeService:HoroScopeService, public orderService:OrderService,
        public router:Router, public partyService:PartyService){
            this.partyService.GetContactDetails(StorageService.GetItem('PartyMastId')).subscribe((data: any) => {
                if (data.Errors == undefined) {
                  this.partyEmail = data.EMail;
                  this.partyMobileNo = data.Mobile;
                }
              });
    }
    pay(payableAmountthroughPaymentGateWay) {
        var options = {
          description: 'Credits towards AstroLite',
          image: 'https://i.ibb.co/dkhhhR1/icon-72x72.png',
          currency: 'INR',
          key: 'rzp_test_fg8RMT6vcRs4DP',
          amount: payableAmountthroughPaymentGateWay * 100,
          name: StorageService.GetItem('Name'),
          "handler": (response) => {
            this.paymentId = response.razorpay_payment_id;
            var Payment = {
              PaymentId: this.paymentId
            }
            this.PaymentComplete(Payment);
          },
          prefill: {
            //email: this.partyEmail,
            email: 'shailesh@gmail.com',
            contact: this.partyMobileNo
          },
          notes: {
            order_id: this.horoScopeService.ExtCode,
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

      PaymentComplete(Payment) {
        //this.loading = true;
        //this.loadPanel.visible = true;
        this.loadingSwitchService.loading = true;
        this.orderService.PaymentComplete(Payment).subscribe((data) => {
          if (data.Error == undefined) {
            this.horoScopeService.resultResponse = data;
            if (data.AstroReportId.length != 0) {
              this.horoScopeService.AstroReportId = data.AstroReportId[0].split('_')[0];
            }
            //this.loading = false;
            this.loadingSwitchService.loading = false;
            //this.loadPanel.visible = false;
            this.router.navigate(['/purchase/paymentProcessing'], { skipLocationChange: true });
            //this.router.navigate(['/purchase/paymentProcessing']);
          }
          else {
            //this.errorMessage = data.Error;
            this.loadingSwitchService.loading = false;
          }
        });
      }
}