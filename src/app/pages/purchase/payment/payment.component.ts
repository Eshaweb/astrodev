import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { LoginService } from 'src/Services/login/login.service';
import { UIService } from 'src/Services/UIService/ui.service';
import { HoroScopeService, ServiceInfo } from 'src/Services/HoroScopeService/HoroScopeService';
import { Platform } from '@angular/cdk/platform';
import { PayCode } from 'src/Models/Sales/PayCode';
import { WalletService } from 'src/Services/Wallet/WalletService';
import ArrayStore from 'devextreme/data/array_store';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { OrderService } from 'src/Services/OrderService/OrderService';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';

declare var Razorpay: any;


@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    //WalletCheckBoxValueWalletCheckBoxValue: boolean = false;

    loading: boolean = false;
    paymentModes: any;
    walletbalance: any;
    ItemOrdered: ServiceInfo;
    CoupenCodeForm: FormGroup;
    couponcodeMessage: string;
    discountAmount: number;
    payableAmount: any;
    paycodes: PayCode[] = [];
    differenceAmount: any;
    selectMeMessage: string;
    paymentmodeSelected: boolean = false;
    ShowMessage: string;
    selectboxdisabled: boolean = false;
    OrderId: any;
    paymentId: any;
  errorMessage: any;
  checkClicked: boolean= false;
  payableAmountthroughPaymentGateWay: any;
  disableButton: boolean;
  firstClick: boolean;
  paymentModeForm: FormGroup;
  paymentModevalue: any;
  paymentModeId: any;
  paymentModedata: ArrayStore;
  paymentModedatavalue: any;
  alterationDisabled: boolean;
  
    constructor(public storageService:StorageService,private itemService:ItemService,private orderService:OrderService,private loadingSwitchService:LoadingSwitchService, public walletService:WalletService, public _location: Location, public route: ActivatedRoute, public router: Router,
      public formBuilder: FormBuilder, public platform: Platform, public formbuilder: FormBuilder,
      public loginService: LoginService, public horoScopeService: HoroScopeService,
      public uiService: UIService) {
      this.discountAmount = 0;
      
      //this.OrderId = this.orderService.orderResponse.OrderId;
      this.OrderId = StorageService.GetItem('OrderId');
      // if (this.horoScopeService.itemOrdered != undefined) {
      //   this.ItemOrdered = this.horoScopeService.itemOrdered;
      // }
      if (this.storageService.GetItemOrdered() != undefined) {
        this.ItemOrdered = this.storageService.GetItemOrdered();
      }
      this.orderService.GetItemAmountByOrderId(this.OrderId).subscribe((data: any) => {
        this.payableAmount=data.Amount;
      });
      //this.payableAmount=this.itemService.ItemAmount;
      this.horoScopeService.GetPayCodes().subscribe((data) => {
      if(data.Error==undefined){
        this.paymentModes = data;
        this.paymentModedata = new ArrayStore({
          data: this.paymentModes,
          key: "Id"
        });
        this.GetWalletBalance();
      }
      else{
        this.errorMessage=data.Error;
      }
      });
      this.paymentModeForm = this.formbuilder.group({
        paymentMode: ['', []],
      });
      this.CoupenCodeForm = this.formbuilder.group({
        CouponCode: ['', [Validators.required, Validators.minLength(6)]],
      });
      const CouponCodeContrl = this.CoupenCodeForm.get('CouponCode');
      CouponCodeContrl.valueChanges.subscribe(value => this.setErrorMessage(CouponCodeContrl));
    }
    paymentModeSelection(event){
      this.paymentModedatavalue=event.value;
      if (this.checkClicked == true && this.differenceAmount > 0) {
        this.paycodes=[];
        if(this.discountAmount>0){
          this.paycodes.push({
            Code: event.value,
            Amount: this.differenceAmount-this.discountAmount
          });
          this.payableAmountthroughPaymentGateWay=this.differenceAmount-this.discountAmount;
        }
        else{
          this.paycodes.push({
            Code: event.value,
            Amount: this.differenceAmount
          });
          this.payableAmountthroughPaymentGateWay=this.differenceAmount;
        }
        this.paymentmodeSelected = true;
        this.selectMeMessage = '';
      }
  
      else {
        this.paycodes = [{ Code: event.value, Amount: this.payableAmount }];
        this.paymentmodeSelected = true;
        this.selectMeMessage = '';
      }
    }
    ngOnInit(): void {
      //this.paymentModevalue = this.paymentModes[0].Text;
    }
  
    ngAfterViewInit(): void {
    }
  
    ngOnDestroy(): void {
  
    }
    backClicked() {
      this._location.back();
    }
  
    setErrorMessage(c: AbstractControl): void {
      let control = this.uiService.getControlName(c);
      document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
      if ((c.touched || c.dirty) && c.errors) {
        document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
      }
    }
    private validationMessages = {
      CouponCode_required: 'Enter Coupon Code if you have',
      CouponCode_minlength: 'Minimum length should be 6'
    };
    GetWalletBalance() {
      this.walletService.GetWalletBalance(StorageService.GetItem('PartyMastId')).subscribe((data) => {
        if (data.Errors == undefined) {
          //IsValid: true 
          this.walletbalance = data;
        }
        else{
          this.errorMessage=data.Error;
        }
      });
    }
    OnCouponCode(value){
      if (value.length < 6) {  //checks for couponcode length
        this.discountAmount = 0;
      }
      else{
        this.disableButton=false;
      }
    }
    onApply() {
      //this.loading=true;
      this.loadingSwitchService.loading=true;
      this.disableButton=true;
      var Promo={
        PromoText:this.CoupenCodeForm.controls['CouponCode'].value,
        Amount:this.payableAmount
      }
      this.itemService.OccupyPromoCode(Promo).subscribe((data) => {
        //if (data.Errors == undefined) {
          //this.loading=false;
          this.loadingSwitchService.loading=false;
          if (data.IsValid == true) {
          this.discountAmount = data.Amount ;
        }
        else if (data.IsValid == false) {
          this.discountAmount = 0;
          this.errorMessage=data.Error;
        }
        else{
          this.errorMessage=data.Error;
        }
        if (this.checkClicked ==true&&this.firstClick==true) {
          this.payableAmount=this.payableAmount-this.discountAmount;
          this.differenceAmount=this.differenceAmount-this.discountAmount;
          this.firstClick=!this.firstClick;
        }
      });
    }
    checkBox_valueChanged(event) {
      this.checkClicked = !this.checkClicked;
      if (this.checkClicked ==false) {
        this.selectboxdisabled = false;
        this.differenceAmount= '0';
      }
      // if(this.discountAmount!=undefined||this.discountAmount!=0){
      //   this.payableAmountthroughPaymentModes=this.payableAmount-this.discountAmount;
      // }
      if (this.walletbalance < this.payableAmount && this.checkClicked == true) {
        if (this.walletbalance == 0) {
  
        }
        else {
          this.differenceAmount = (this.payableAmount - this.walletbalance).toFixed(2);
          this.differenceAmount = +this.differenceAmount;
          if (this.discountAmount>this.differenceAmount) {
            this.selectboxdisabled = true;
          }
          this.selectMeMessage = '';
        }
      }
      else if (this.walletbalance > this.payableAmount && this.checkClicked  == true) {
        this.selectboxdisabled = true;
        this.selectMeMessage = '';
      }
      else {
        //this.differenceAmount = 0;
        this.selectboxdisabled = false;
      }
    }
  
    onContinue() {
      this.loadingSwitchService.loading=true;
      if (this.checkClicked == true) {
        //this.loading = true;
        this.loadingSwitchService.loading=true;
        if (this.differenceAmount > 0 && this.paymentmodeSelected == true && this.discountAmount>0) {
          this.paycodes = [{
            Code: this.paymentModeForm.get('paymentMode').value,
            Amount: this.differenceAmount-this.discountAmount
          }, {
            Code: "W",
            Amount: this.walletbalance
          },{
            Code: "D",
            Amount: this.discountAmount
          }];
          this.payableAmountthroughPaymentGateWay=this.differenceAmount-this.discountAmount;
          this.CreateBillPayModeToOrder();
        }
        else if (this.differenceAmount > 0 && this.paymentmodeSelected == true) {
          this.paycodes = [{
            Code: this.paymentModeForm.get('paymentMode').value,
            Amount: this.differenceAmount
          }, {
            Code: "W",
            Amount: this.walletbalance
          }];
          this.CreateBillPayModeToOrder();
        }
        else if (this.differenceAmount > 0 && this.paymentmodeSelected == false) {
          this.selectMeMessage = "Please select any Payment modes for Remaining Amount";
          //loading.dismiss();
        }
        else if(this.discountAmount>0){
          //this.loading = true;
          this.loadingSwitchService.loading=true;
          this.payableAmount=this.payableAmount;
          this.paycodes = [{
            Code: "W",
            Amount: this.payableAmount-this.discountAmount
          }, {
            Code: "D",
            Amount: this.discountAmount
          }];
          this.CreateBillPayModeToOrder();
        }
        else {
          this.loading = true;
         // this.loadingSwitchService.loading=true;
          this.paycodes = [{
            Code: "W",
            Amount: this.payableAmount
          }];
          this.CreateBillPayModeToOrder();
        }
        //this.loading = false;
      }
      else if (this.discountAmount >0){
        //this.loading = true;
        this.loadingSwitchService.loading=true;
        if (this.paymentmodeSelected == true) {
          this.payableAmountthroughPaymentGateWay=this.payableAmount-this.discountAmount;        
          this.paycodes = [{
          Code: this.paymentModeForm.get('paymentMode').value,
          Amount: this.payableAmountthroughPaymentGateWay
        }, {
          Code: "D",
          Amount: this.discountAmount
        }];
          this.CreateBillPayModeToOrder();
        }
        else {
          this.selectMeMessage = "Please select any Payment modes";
          //loading.dismiss();
        }
        //this.loading = false;
        this.loadingSwitchService.loading=false;
      }
      else {
        //this.loading = true;
        this.loadingSwitchService.loading=true;
        if (this.paymentmodeSelected == true) {
          this.payableAmountthroughPaymentGateWay=this.payableAmount;
          this.CreateBillPayModeToOrder();
        }
        else {
          this.selectMeMessage = "Please select any Payment modes";
          //loading.dismiss();
        }
        //this.loading = false;
        this.loadingSwitchService.loading=false;
      }
    }

    CreateBillPayModeToOrder(){
      this.loadingSwitchService.loading=true;
      this.alterationDisabled=true;
      this.selectboxdisabled=true;
      var OrderBillPayMode = {
        CouponCode: this.CoupenCodeForm.controls['CouponCode'].value,
        PartyMastId: StorageService.GetItem('PartyMastId'),
        OrderId: this.OrderId,
        PayCodes: this.paycodes
      }
      this.orderService.CreateBillPayModeToOrder(OrderBillPayMode).subscribe((data) => {
        if(data.Error==undefined){
          this.horoScopeService.ExtCode =data.ExtCode;
          for (var i = 0; i < data.PayModes.length; i++) {
            if (data.PayModes[i] == "ON") {
              if(this.discountAmount==0){
                if(this.differenceAmount>0){
                  this.payableAmountthroughPaymentGateWay=this.differenceAmount;
                }
                else{
                  this.payableAmountthroughPaymentGateWay=this.payableAmount;
                }
              }
              else{
                this.payableAmountthroughPaymentGateWay=this.payableAmountthroughPaymentGateWay;
              }
              this.loadingSwitchService.loading=true;
              this.pay();
              break;
            }
            else if(data.PayModes[i] == "W" && (data.Status == "C"||data.Status == "P")) {
              this.loadingSwitchService.loading=false;
              this.router.navigate(['/purchase/paymentProcessing']);
            }
            else if(data.PayModes[i]=="OFF"){
              this.loadingSwitchService.loading=false;
              this.router.navigate(['/offlinePayment']);
              break;
            }
          }
        }
        else{
          this.errorMessage=data.Error;
          this.loadingSwitchService.loading=false;
        }
        });
    }
   
    public onpaymentModeSelection(eventArgs) {
      var paymentModeId=eventArgs.newSelection.value;
      this.paymentModevalue = this.paymentModes.find(function (obj) { return obj.Id === paymentModeId }).Text;
    
      if (this.checkClicked == true && this.differenceAmount > 0) {
        this.paycodes=[];
        if(this.discountAmount>0){
          this.paycodes.push({
            Code: eventArgs.newSelection.value,
            Amount: this.differenceAmount-this.discountAmount
          });
          this.payableAmountthroughPaymentGateWay=this.differenceAmount-this.discountAmount;
        }
        else{
          this.paycodes.push({
            Code: eventArgs.newSelection.value,
            Amount: this.differenceAmount
          });
          this.payableAmountthroughPaymentGateWay=this.differenceAmount;
        }
        this.paymentmodeSelected = true;
        this.selectMeMessage = '';
      }
  
      else {
        this.paycodes = [{ Code: eventArgs.newSelection.value, Amount: this.payableAmount }];
        this.paymentmodeSelected = true;
        this.selectMeMessage = '';
      }
    }
    pay() {
      var options = {
        description: 'Credits towards AstroLite',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: 'rzp_test_fg8RMT6vcRs4DP',
        amount: this.payableAmountthroughPaymentGateWay * 100,
        name: StorageService.GetItem('Name'),
        "handler": (response) => {
          this.paymentId = response.razorpay_payment_id;
          var Payment = {
            PaymentId: this.paymentId
          }
          this.next(Payment);
        },
        prefill: {
          email: 'shailesh@eshaweb.com',
          contact: '9731927204'
        },
        notes: {
          order_id: this.horoScopeService.ExtCode,
        },
        theme: {
          color: '#F37254'
        },
        modal: {
          ondismiss: () => {
            //alert('dismissed');
          }
        }
      };
      var rzp1 = new Razorpay(options, successCallback, cancelCallback);
      rzp1.open();
      var successCallback = (payment_id) => {
        alert('payment_id: ' + payment_id);
      };
  
      var cancelCallback = (error) => {
        alert(error.description + ' (Error ' + error.code + ')');
      };
      //  RazorpayCheckout.open(options, successCallback, cancelCallback);
    }
  
    next(Payment) {
      //this.loading = true;
      this.loadingSwitchService.loading=true;
      this.orderService.PaymentComplete(Payment).subscribe((data) => {
      if(data.Error==undefined){
      this.horoScopeService.resultResponse=data;
      if(data.AstroReportId.length != 0){
        this.horoScopeService.AstroReportId = data.AstroReportId[0].split('_')[0];
      }
      //this.loading = false;
      //this.loadingSwitchService.loading=false;
      this.router.navigate(['/purchase/paymentProcessing'], { skipLocationChange: true });
      //this.router.navigate(['/purchase/paymentProcessing']);
    }
    else{
      this.errorMessage=data.Error;
    }
    });
    }

}

