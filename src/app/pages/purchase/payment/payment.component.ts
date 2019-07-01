import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
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
import { LoginService } from 'src/Services/LoginService/LoginService';
import { PartyService } from 'src/Services/PartyService/PartyService';
import { DxLoadPanelComponent } from 'devextreme-angular';
import { RazorPayService } from 'src/Services/RazorPayService/RazorPayService';

declare var Razorpay: any;


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  @ViewChild(DxLoadPanelComponent) public loadPanel: DxLoadPanelComponent;
  //WalletCheckBoxValueWalletCheckBoxValue: boolean = false;
  paymentModeForm: FormGroup;
  ItemOrdered: ServiceInfo;
  CoupenCodeForm: FormGroup;
  paycodes: PayCode[] = [];
  paymentModedata: ArrayStore;
  paymentModedatavalue: string;
  loading: boolean = false;
  checkClicked: boolean = false;
  disableButton: boolean;
  firstClick: boolean;
  alterationDisabled: boolean;
  paymentmodeSelected: boolean = false;
  selectboxdisabled: boolean = false;
  paymentModevalue: string;
  selectMeMessage: string;
  ShowMessage: string;
  couponcodeMessage: string;
  discountAmount: number;
  paymentModes: any;
  walletbalance: any;
  payableAmount: any;
  differenceAmount: any;
  OrderId: any;
  paymentId: any;
  errorMessage: any;
  payableAmountthroughPaymentGateWay: any;
  paymentModeId: any;
  remainingAmount: any;
  partyEmail: any;
  partyMobileNo: any;
  Mobile: any;
  EMail: any;


  constructor(public storageService: StorageService, private itemService: ItemService, private orderService: OrderService,
    private loadingSwitchService: LoadingSwitchService, public walletService: WalletService, public _location: Location,
    public formBuilder: FormBuilder, public platform: Platform, public formbuilder: FormBuilder,
    public loginService: LoginService, public horoScopeService: HoroScopeService, public route: ActivatedRoute,
    public uiService: UIService, public router: Router, public partyService: PartyService, public razorPayService:RazorPayService) {
    this.discountAmount = 0;

    //this.OrderId = this.orderService.orderResponse.OrderId;
    this.OrderId = StorageService.GetItem('OrderId');
    // if (this.horoScopeService.itemOrdered != undefined) {
    //   this.ItemOrdered = this.horoScopeService.itemOrdered;
    // }
    if (this.storageService.GetItemOrdered() != undefined) {
      this.ItemOrdered = this.storageService.GetItemOrdered();
    }
   
    this.paymentModeForm = this.formbuilder.group({
      paymentMode: ['', []],
    });
    this.CoupenCodeForm = this.formbuilder.group({
      CouponCode: ['', [Validators.required, Validators.minLength(6)]],
    });
    const CouponCodeContrl = this.CoupenCodeForm.get('CouponCode');
    CouponCodeContrl.valueChanges.subscribe(value => this.setErrorMessage(CouponCodeContrl));
  }
  paymentModeSelection(event) {
    this.paymentModedatavalue = event.value;
    if (this.checkClicked == true && this.differenceAmount > 0) {
      this.paycodes = [];
      if (this.discountAmount > 0) {
        this.paycodes.push({
          Code: event.value,
          Amount: this.differenceAmount - this.discountAmount
        });
        this.payableAmountthroughPaymentGateWay = this.differenceAmount - this.discountAmount;
      }
      else {
        this.paycodes.push({
          Code: event.value,
          Amount: this.differenceAmount
        });
        this.payableAmountthroughPaymentGateWay = this.differenceAmount;
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
  setErrorMessage(c: AbstractControl): void {
    let control = this.uiService.getControlName(c);
    document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
    this.errorMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
    }
  }
  private validationMessages = {
    CouponCode_required: 'Enter Coupon Code if you have',
    CouponCode_minlength: 'Minimum length should be 6'
  };
  ngOnInit(): void {
    //this.paymentModevalue = this.paymentModes[0].Text;
    this.loadingSwitchService.loading=true;
    this.orderService.GetItemAmountByOrderId(this.OrderId).subscribe((data: any) => {
      this.payableAmount = data.Amount;
    });
    //this.payableAmount=this.itemService.ItemAmount;
    this.horoScopeService.GetPayCodes().subscribe((data) => {
      if (data.Error == undefined) {
        this.paymentModes = data;
        this.paymentModedata = new ArrayStore({
          data: this.paymentModes,
          key: "Id"
        });
        this.walletService.GetWalletBalance(StorageService.GetItem('PartyMastId')).subscribe((data) => {
          if (data.Errors == undefined) {
            //IsValid: true 
            this.walletbalance = data;
            if (data == 0) {
              this.alterationDisabled = true;
            }
          }
          else {
            this.errorMessage = data.Error;
          }
        });
      }
      else {
        this.errorMessage = data.Error;
      }
    });
    this.partyService.GetContactDetails(StorageService.GetItem('PartyMastId')).subscribe((data: any) => {
      if (data.Errors == undefined) {
        this.partyEmail = data.EMail;
        this.partyMobileNo = data.Mobile;
      }
      this.loadingSwitchService.loading=false;
    });
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {

  }
  backClicked() {
    this._location.back();
  }

  OnCouponCode(value) {
    if (value.length < 6) {  //checks for couponcode length
      this.discountAmount = 0;
    }
    else {
      this.disableButton = false;
    }
  }

  onApply() {
    //this.loading=true;
    //this.loadPanel.visible = true;
    this.loadingSwitchService.loading = true;
    this.disableButton = true;
    var Promo = {
      PromoText: this.CoupenCodeForm.controls['CouponCode'].value,
      Amount: this.payableAmount
    }
    this.itemService.OccupyPromoCode(Promo).subscribe((data) => {
      //if (data.Errors == undefined) {
      //this.loading=false;
      //this.loadPanel.visible = false;
      this.loadingSwitchService.loading = false;
      if (data.IsValid == true) {
        this.discountAmount = data.Amount;
      }
      else if (data.IsValid == false) {
        this.discountAmount = 0;
        this.errorMessage = data.Error;
      }
      else {
        this.errorMessage = data.Error;
      }
      if (this.checkClicked == true && this.firstClick == true) {
        this.payableAmount = this.payableAmount - this.discountAmount;
        this.differenceAmount = this.differenceAmount - this.discountAmount;
        this.remainingAmount = (this.differenceAmount - this.discountAmount).toFixed(2);
        this.firstClick = !this.firstClick;
      }
      // if (this.checkClicked ==true) {
      //   this.payableAmount=this.payableAmount-this.discountAmount;
      //   this.differenceAmount=this.differenceAmount-this.discountAmount;
      //   this.remainingAmount=(this.differenceAmount-this.discountAmount).toFixed(2);
      // }
    });
  }

  checkBox_valueChanged(event) {
    this.checkClicked = !this.checkClicked;
    if (this.checkClicked == false) {
      this.selectboxdisabled = false;
      this.differenceAmount = '0';
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
        if (this.discountAmount > this.differenceAmount) {
          this.selectboxdisabled = true;
        }
        else {
          this.remainingAmount = +(this.differenceAmount - this.discountAmount).toFixed(2);
        }
        this.selectMeMessage = '';
      }
    }
    else if (this.walletbalance > this.payableAmount && this.checkClicked == true) {
      this.selectboxdisabled = true;
      this.selectMeMessage = '';
    }
    else {
      //this.differenceAmount = 0;
      this.selectboxdisabled = false;
    }
  }

  onContinue() {
    //this.loadPanel.visible = true;
    this.loadingSwitchService.loading = true;
    if (this.checkClicked == true) {
      //this.loading = true;
      //this.loadPanel.visible = true;
      this.loadingSwitchService.loading = true;
      if (this.differenceAmount > 0 && this.paymentmodeSelected == true && this.discountAmount > 0) {
        this.paycodes = [{
          Code: this.paymentModeForm.get('paymentMode').value,
          Amount: (this.differenceAmount - this.discountAmount).toFixed(2)
        }, {
          Code: "W",
          Amount: this.walletbalance
        }, {
          Code: "D",
          Amount: this.discountAmount
        }];
        this.payableAmountthroughPaymentGateWay = (this.differenceAmount - this.discountAmount).toFixed(2);
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
        //this.loadPanel.visible = false;
        this.loadingSwitchService.loading = false;
      }
      else if (this.discountAmount > 0) {
        //this.loading = true;
        //this.loadPanel.visible = true;
        this.loadingSwitchService.loading = true;
        this.payableAmount = this.payableAmount;
        this.paycodes = [{
          Code: "W",
          Amount: this.payableAmount - this.discountAmount
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
    else if (this.discountAmount > 0) {
      //this.loading = true;
      //this.loadPanel.visible = true;
      this.loadingSwitchService.loading = true;
      if (this.paymentmodeSelected == true) {
        this.payableAmountthroughPaymentGateWay = this.payableAmount - this.discountAmount;
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
      //this.loadPanel.visible = false;
      this.loadingSwitchService.loading = false;
    }
    else {
      //this.loading = true;
      //this.loadPanel.visible = true;
      this.loadingSwitchService.loading = true;
      if (this.paymentmodeSelected == true) {
        this.payableAmountthroughPaymentGateWay = this.payableAmount;
        this.CreateBillPayModeToOrder();
      }
      else {
        this.selectMeMessage = "Please select any Payment modes";
        //loading.dismiss();
      }
      //this.loading = false;
      //this.loadPanel.visible = false;
      //this.loadingSwitchService.loading = false;
    }
  }

  CreateBillPayModeToOrder() {
    //this.loadPanel.visible = true;
    this.loadingSwitchService.loading = true;
    this.alterationDisabled = true;
    this.selectboxdisabled = true;
    var OrderBillPayMode = {
      CouponCode: this.CoupenCodeForm.controls['CouponCode'].value,
      PartyMastId: StorageService.GetItem('PartyMastId'),
      OrderId: this.OrderId,
      PayCodes: this.paycodes
    }
    this.orderService.CreateBillPayModeToOrder(OrderBillPayMode).subscribe((data) => {
      //this.loadingSwitchService.loading = false;
      //this.loadPanel.visible = false;
      if (data.Error == undefined) {
        this.horoScopeService.ExtCode = data.ExtCode;
        for (var i = 0; i < data.PayModes.length; i++) {
          if (this.discountAmount == 0) {
            if (this.differenceAmount > 0) {
              this.payableAmountthroughPaymentGateWay = this.differenceAmount;
            }
            else {
              this.payableAmountthroughPaymentGateWay = this.payableAmount;
            }
          }
          else {
            this.payableAmountthroughPaymentGateWay = this.payableAmountthroughPaymentGateWay;
          }
          if (data.PayModes[i] == "ON") {
            //this.loadPanel.visible = true;
            this.loadingSwitchService.loading = true;
            this.pay();
           // this.razorPayService.pay(this.payableAmountthroughPaymentGateWay, "Service");
            break;
          }
          else if (data.PayModes[i] == "W" && (data.Status == "C" || data.Status == "P")) {
            //this.loadPanel.visible = false;
            this.loadingSwitchService.loading = false;
            this.router.navigate(['/purchase/paymentProcessing']);
          }
          else if (data.PayModes[i] == "OFF") {
            //this.loadPanel.visible = false;
            this.loadingSwitchService.loading = false;
            StorageService.SetItem('AmounttoPay_Offline',this.payableAmountthroughPaymentGateWay);
            this.router.navigate(['/staticpages/offlinePayment']);
            break;
          }
        }
      }
      else {
        this.errorMessage = data.Error;
        //this.loadPanel.visible = false;
        this.loadingSwitchService.loading = false;
      }
    });
  }

  pay() {
    this.partyService.GetProfile(StorageService.GetItem('PartyMastId')).subscribe((data: any) => {
      this.Mobile=data.Mobile;
      this.EMail = data.EMail;
      var options = {
        description: 'Credits towards AstroLite',
        image: 'https://i.ibb.co/dkhhhR1/icon-72x72.png',
        currency: 'INR',
        key: this.loginService.razorPayKey,
        amount: +(this.payableAmountthroughPaymentGateWay * 100).toFixed(),
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
          email: this.EMail,
          contact: this.Mobile
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
    });
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
        this.loading = false;
        //this.loadingSwitchService.loading = false;
        //this.loadPanel.visible = false;
        this.router.navigate(['/purchase/paymentProcessing'], { skipLocationChange: true });
        //this.router.navigate(['/purchase/paymentProcessing']);
      }
      else {
        this.errorMessage = data.Error;
        this.loadingSwitchService.loading = false;
      }
    });
  }

}

