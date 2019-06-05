import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UIService } from 'src/Services/UIService/ui.service';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { ProductService } from 'src/Services/ProductService/ProductService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import ArrayStore from 'devextreme/data/array_store';
import { PayCode } from 'src/Models/Sales/PayCode';
import { Router } from '@angular/router';
import { OrderService } from 'src/Services/OrderService/OrderService';
import { LoginService } from 'src/Services/LoginService/LoginService';
import { WalletService } from 'src/Services/Wallet/WalletService';
import { ProductPrice } from 'src/Models/ProductPrice';
import { DxLoadPanelComponent } from 'devextreme-angular';
import { RazorPayService } from 'src/Services/RazorPayService/RazorPayService';
declare var Razorpay: any;

@Component({
  selector: 'app-astrolitegoldsilver',
  templateUrl: './astrolitegoldsilver.component.html',
  styleUrls: ['./astrolitegoldsilver.component.scss']
})
export class AstrolitegoldsilverComponent implements OnInit {
  @ViewChild(DxLoadPanelComponent) public loadPanel: DxLoadPanelComponent;
  Astamangala_checkBoxValue: boolean;
  MatchMaking_checkBoxValue: boolean;
  Horoscope_checkBoxValue: boolean;
  CoupenCodeForm: FormGroup;
  AndroidPriceRequest: { PartyMastId: any; Products: string[]; };
  chekboxes: { Text: string; Value: any; }[];
  disableButton: boolean;
  discountAmount: number;
  errorMessage: any;
  paymentModes: any;
  paymentModedata: ArrayStore;
  paymentModeForm: FormGroup;
  paymentModedatavalue: any;
  paycodes: PayCode[] = [];
  paymentId: any;
  ProductName: any;
  productPrice: ProductPrice;
  walletdiscountPercentage: any;
  walletdiscountAmount: any;
  imgsrc: string;
  constructor(public walletService:WalletService, public formbuilder: FormBuilder, public uiService: UIService, private loadingSwitchService: LoadingSwitchService,
    private itemService: ItemService, public productService: ProductService, public horoScopeService: HoroScopeService,
    public router: Router, public orderService: OrderService, public loginService: LoginService, public razorPayService:RazorPayService) {
    this.loginService.path = undefined;
    this.paymentModeForm = this.formbuilder.group({
      paymentMode: ['', []],
    });
    this.CoupenCodeForm = this.formbuilder.group({
      CouponCode: ['', [Validators.required, Validators.minLength(6)]],
    });
    const CouponCodeContrl = this.CoupenCodeForm.get('CouponCode');
    CouponCodeContrl.valueChanges.subscribe(value => this.setErrorMessage(CouponCodeContrl));
    this.Horoscope_checkBoxValue = true;
    this.MatchMaking_checkBoxValue = true;
  }
  setErrorMessage(c: AbstractControl): void {
    let control = this.uiService.getControlName(c);
    document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
    this.errorMessage='';
    if ((c.touched || c.dirty) && c.errors) {
      document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
    }
  }
  private validationMessages = {
    //CouponCode_required: 'Enter Coupon Code if you have',
    CouponCode_minlength: 'Minimum length should be 6'
  };
  ngOnInit() {
    // this.chekboxes=[{Text:"Horoscope",Value:true},
    // {Text:"Match Making",Value:true},
    // {Text:"Astamangala",Value:true}];
    this.loadingSwitchService.loading = true;
    this.discountAmount = 0;
    this.ProductName=StorageService.GetItem('ProductName');
    if(StorageService.GetItem('ProductName') == "Gold"){
      this.imgsrc='assets/images/gold.png';
      this.Astamangala_checkBoxValue = true;
      this.AndroidPriceRequest = {
        PartyMastId: StorageService.GetItem('PartyMastId'),
        Products: ['#PHM', '#PMMM', '#PAMM']
      }
    }
    else if(StorageService.GetItem('ProductName') == "Silver"){
      this.imgsrc='assets/images/astrolite-silver.png';
      this.Astamangala_checkBoxValue = false;
      this.AndroidPriceRequest = {
        PartyMastId: StorageService.GetItem('PartyMastId'),
        Products: ['#PHM', '#PMMM']
      }
    }
    this.productService.GetAndroidPrice(this.AndroidPriceRequest).subscribe((data) => {
      this.productPrice=data;
      this.GetProductPurchaseWalletBenefit(this.productPrice.ActualPrice);
    });

    this.horoScopeService.GetPayCodes().subscribe(data => {
      if (data.Error == undefined) {
        this.paymentModes = data;
        this.paymentModedata = new ArrayStore({
          data: this.paymentModes,
          key: "Id"
        });
      }
    });
  }
  Horoscope_Click(event) {
    this.loadingSwitchService.loading = true;
    if (event.value == true) {
      this.Horoscope_checkBoxValue = true;
      this.AndroidPriceRequest.Products.push('#PHM');
    }
    else {
      this.Horoscope_checkBoxValue = false;
      this.AndroidPriceRequest.Products.splice(this.AndroidPriceRequest.Products.indexOf('#PHM'), 1);
    }
    this.GetAndroidPrice(this.AndroidPriceRequest);
  }
  MatchMaking_Click(event) {
    this.loadingSwitchService.loading = true;
    if (event.value == true) {
      this.MatchMaking_checkBoxValue = true;
      this.AndroidPriceRequest.Products.push('#PMMM');
    }
    else {
      this.MatchMaking_checkBoxValue = false;
      this.AndroidPriceRequest.Products.splice(this.AndroidPriceRequest.Products.indexOf('#PMMM'), 1);
    }
    this.GetAndroidPrice(this.AndroidPriceRequest);
  }
  Astamangala_Click(event) {
    this.loadingSwitchService.loading = true;
    if (event.value == true) {
      this.Astamangala_checkBoxValue = true;
      this.productService.ProductName="Gold";
      this.AndroidPriceRequest.Products.push('#PAMM');
    }
    else {
      this.Astamangala_checkBoxValue = false;
      this.productService.ProductName="Silver";
      this.AndroidPriceRequest.Products.splice(this.AndroidPriceRequest.Products.indexOf('#PAMM'), 1);
    }
    this.GetAndroidPrice(this.AndroidPriceRequest);
  }
  GetAndroidPrice(AndroidPriceRequest) {
    if (AndroidPriceRequest.Products.length != 0) {
      this.productService.GetAndroidPrice(AndroidPriceRequest).subscribe((data) => {
        this.productPrice=data;
        if(this.CoupenCodeForm.controls['CouponCode'].value!=undefined){
          this.onApplyCouponCode_click();
        }
        this.GetProductPurchaseWalletBenefit(this.productPrice.ActualPrice-this.discountAmount);
        this.loadingSwitchService.loading = false;
      });
    }
    else {
      this.productPrice.ActualPrice=0;
      this.productPrice.BasePrice=0;
      this.productPrice.Discount=0;
      this.productPrice.DiscountRate=0;
      this.walletdiscountAmount=0;
      this.walletdiscountPercentage=0;
      if(this.CoupenCodeForm.controls['CouponCode'].value!=undefined){
        this.discountAmount = 0;
      }
      this.loadingSwitchService.loading = false;
    }
  }

  GetProductPurchaseWalletBenefit(ActualPrice){
    this.walletService.GetProductPurchaseWalletBenefit(ActualPrice).subscribe((data) => {
     this.walletdiscountAmount=data.Amount;
     this.walletdiscountPercentage=data.Percent;
      this.loadingSwitchService.loading = false;
    });
  }
  OnCouponCode(value) {
    if (value.length < 6) {  //checks for couponcode length
      this.discountAmount = 0;
    }
    else {
      this.disableButton = false;
    }
    this.errorMessage = '';
    if(this.productPrice.ActualPrice!=undefined){
      this.GetProductPurchaseWalletBenefit(this.productPrice.ActualPrice-this.discountAmount);
    }
  }
  onApplyCouponCode_click() {
    this.loadingSwitchService.loading = true;
    this.disableButton = true;
    var Promo = {
      PromoText: this.CoupenCodeForm.controls['CouponCode'].value.replace(/\s/g, ""),
      Amount: this.productPrice.ActualPrice
    }
    this.itemService.OccupyPromoCode(Promo).subscribe((data) => {
      this.loadingSwitchService.loading = false;
      if (data.IsValid == true) {
        this.discountAmount = data.Amount;
      }
      else if (data.IsValid == false) {
        this.discountAmount = 0;
        this.CoupenCodeForm.controls['CouponCode'].setValue('');
        this.errorMessage = data.Error;
      }
      else {
        this.errorMessage = data.Error;
      }
      this.GetProductPurchaseWalletBenefit(this.productPrice.ActualPrice-this.discountAmount);
      // if (this.checkClicked == true && this.firstClick == true) {
      //   this.payableAmount = this.payableAmount - this.discountAmount;
      //   this.differenceAmount = this.differenceAmount - this.discountAmount;
      //   this.firstClick = !this.firstClick;
      // }
    });
  }
  paymentModeSelection(event) {
    this.paymentModedatavalue = event.value;
  }

  onBuyNow_click() {
    this.loadingSwitchService.loading=true;
    if (this.discountAmount > 0) {
      this.paycodes = [{ Code: 'D', Amount: this.discountAmount },
      { Code: this.paymentModedatavalue, Amount: this.productPrice.ActualPrice - this.discountAmount }];
    }
    else {
      this.paycodes = [{ Code: this.paymentModedatavalue, Amount: this.productPrice.ActualPrice - this.discountAmount }];

    }
    var BuyAndroid = {
      PartyMastId: StorageService.GetItem('PartyMastId'),
      Products: this.AndroidPriceRequest.Products,
      Amount: this.productPrice.ActualPrice - this.discountAmount,
      PromoText: this.CoupenCodeForm.controls['CouponCode'].value.replace(/\s/g, ""),
      PayCodes: this.paycodes
    }
    this.productService.BuyAndroid(BuyAndroid).subscribe((data) => {
      if (data.Error == undefined) {
        this.horoScopeService.ExtCode = data.ExtCode;
        StorageService.SetItem('ExtCode',data.ExtCode);
        for (var i = 0; i < data.PayModes.length; i++) {
          if (data.PayModes[i] == "ON") {
            this.loadingSwitchService.loading=false;
            this.pay();
            //this.razorPayService.pay((this.productPrice.ActualPrice - this.discountAmount), "Product");
            break;
          }
          else if (data.PayModes[i] == "OFF") {
            this.loadingSwitchService.loading = false;
            StorageService.SetItem('OrderId',data.OrderId);
            this.router.navigate(['/staticpages/offlinePayment']);
            break;
          }
        }
      }
      else {
        this.errorMessage = data.Error;
        this.loadingSwitchService.loading = false;
      }
    });
  }

  pay() {
    var options = {
      description: 'Credits towards AstroLite',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: this.loginService.razorPayKey,
      amount: +((this.productPrice.ActualPrice - this.discountAmount) * 100).toFixed(),
      name: StorageService.GetItem('Name'),
      "handler": (response) => {
        this.paymentId = response.razorpay_payment_id;
        var Payment = {
          PaymentId: this.paymentId
        }
        this.PaymentComplete(Payment);
      },
      prefill: {
        // email: 'shailesh@eshaweb.com',
        // contact: '9731927204'
      },
      notes: {
        order_id: this.horoScopeService.ExtCode,
      },
      theme: {
        color: '#F37254'
      },
      modal: {
        ondismiss: () => {
          this.loadPanel.visible=false;
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

  PaymentComplete(Payment) {
    this.loadPanel.visible=true;
    //this.loadingSwitchService.loading = true;
    this.orderService.PaymentComplete(Payment).subscribe((data) => {
      if (data.Error == undefined) {
        this.horoScopeService.resultResponse = data;
        if (data.AstroReportId.length != 0) {
          this.horoScopeService.AstroReportId = data.AstroReportId[0].split('_')[0];
        }
        //this.loadingSwitchService.loading = false;
        this.loadPanel.visible=false;
        this.router.navigate(['/products/paymentsuccess'], { skipLocationChange: true });
        //this.router.navigate(['/purchase/paymentProcessing']);
      }
      else {
        this.errorMessage = data.Error;
      }
    });
  }
}
