import { Component, OnInit } from '@angular/core';
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
import { ProductPrice } from 'src/Models/ProductPrice';
import { WalletService } from 'src/Services/Wallet/WalletService';
import { RazorPayService } from 'src/Services/RazorPayService/RazorPayService';
declare var Razorpay: any;

@Component({
  selector: 'app-astroliteprofessional',
  templateUrl: './astroliteprofessional.component.html',
  styleUrls: ['./astroliteprofessional.component.scss']
})
export class AstroliteProfessionalComponent implements OnInit {
  Astamangala_checkBoxValue: boolean;
  MatchMaking_checkBoxValue: boolean;
  Horoscope_checkBoxValue: boolean;
  CoupenCodeForm: FormGroup;
  payableAmount: any;
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
  Numerology_checkBoxValue: boolean;
  Muhurtha_checkBoxValue: boolean;
  Horoview_checkBoxValue: boolean;
  WindowsPriceRequest: any;
  Kannada_checkBoxValue: boolean;
  Malayalam_checkBoxValue: boolean;
  Tamilu_checkBoxValue: boolean;
  Hindi_checkBoxValue: boolean;
  AdditionalLisence_checkBoxValue: boolean;
  ProductName: any;
  WindowsYearlyPriceRequest: any;
  yearvalue: any;
  professional: boolean;
  professionalyearly: boolean;
  years: any[] = [
    { Id: 1, Text: "1 Year" },
    { Id: 2, Text: "2 Year" },
    { Id: 3, Text: "3 Year" },
    { Id: 4, Text: "4 Year" },
    { Id: 5, Text: "5 Year" }];
  yearsdata: ArrayStore;
  disableBuyNow: boolean;
  productPrice: ProductPrice;
  walletdiscountAmount: any;
  walletdiscountPercentage: any;
  Promo: any;
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
    this.Astamangala_checkBoxValue = true;
    this.Numerology_checkBoxValue = true;
    this.Muhurtha_checkBoxValue = true;
    this.Horoview_checkBoxValue = true;
    this.Kannada_checkBoxValue = true;
    this.Malayalam_checkBoxValue = true;
    this.Tamilu_checkBoxValue = true;
    this.Hindi_checkBoxValue = true;
    this.AdditionalLisence_checkBoxValue=false;
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
    CouponCode_required: 'Enter Coupon Code if you have',
    CouponCode_minlength: 'Minimum length should be 6'
  };
  ngOnInit() {
    // this.chekboxes=[{Text:"Horoscope",Value:true},
    // {Text:"Match Making",Value:true},
    // {Text:"Astamangala",Value:true}];
    this.loadingSwitchService.loading = true;
    this.discountAmount = 0;
    this.ProductName=StorageService.GetItem('ProductName');
    if(StorageService.GetItem('ProductName') == "Professional"){
      this.professional=true;
      this.professionalyearly=false;
      this.Astamangala_checkBoxValue = true;
      this.WindowsPriceRequest = {
        PartyMastId: StorageService.GetItem('PartyMastId'),
        Products: ['#PFH', '#PMM', '#PAM', '#PNM', '#PMU', '#PHV'],
        Language:['KAN','MAL','TAM','HIN'],
        Additional:this.AdditionalLisence_checkBoxValue
      }
      this.productService.GetWindowsPrice(this.WindowsPriceRequest).subscribe((data) => {
        this.productPrice=data;
        this.GetProductPurchaseWalletBenefit(this.productPrice.ActualPrice);
      });
    }
    else if(StorageService.GetItem('ProductName') == "Professional Full Package"){
      this.professional=false;
      this.professionalyearly=true;
      this.yearvalue=2;
      this.yearsdata = new ArrayStore({
        data: this.years,
        key: "Id"
      });
      this.WindowsYearlyPriceRequest = {
        PartyMastId: StorageService.GetItem('PartyMastId'),
        Years: this.yearvalue
      }
      this.productService.GetWindowsYearlyPrice(this.WindowsYearlyPriceRequest).subscribe((data) => {
        this.payableAmount=data;
        this.GetProductPurchaseWalletBenefit(this.payableAmount);
      });
    }
    

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
      this.WindowsPriceRequest.Products.push('#PFH');
    }
    else {
      this.Horoscope_checkBoxValue = false;
      this.WindowsPriceRequest.Products.splice(this.WindowsPriceRequest.Products.indexOf('#PFH'), 1);
    }
    this.GetWindowsPrice(this.WindowsPriceRequest);
  }
  MatchMaking_Click(event) {
    this.loadingSwitchService.loading = true;
    if (event.value == true) {
      this.MatchMaking_checkBoxValue = true;
      this.WindowsPriceRequest.Products.push('#PMM');
    }
    else {
      this.MatchMaking_checkBoxValue = false;
      this.WindowsPriceRequest.Products.splice(this.WindowsPriceRequest.Products.indexOf('#PMM'), 1);
    }
    this.GetWindowsPrice(this.WindowsPriceRequest);
  }
  Astamangala_Click(event) {
    this.loadingSwitchService.loading = true;
    if (event.value == true) {
      this.Astamangala_checkBoxValue = true;
      this.WindowsPriceRequest.Products.push('#PAM');
    }
    else {
      this.Astamangala_checkBoxValue = false;
      this.WindowsPriceRequest.Products.splice(this.WindowsPriceRequest.Products.indexOf('#PAM'), 1);
    }
    this.GetWindowsPrice(this.WindowsPriceRequest);
  }
  Numerology_Click(event) {
    this.loadingSwitchService.loading = true;
    if (event.value == true) {
      this.Numerology_checkBoxValue = true;
      this.WindowsPriceRequest.Products.push('#PNM');
    }
    else {
      this.Numerology_checkBoxValue = false;
      this.WindowsPriceRequest.Products.splice(this.WindowsPriceRequest.Products.indexOf('#PNM'), 1);
    }
    this.GetWindowsPrice(this.WindowsPriceRequest);
  }
  Muhurtha_Click(event) {
    this.loadingSwitchService.loading = true;
    if (event.value == true) {
      this.Muhurtha_checkBoxValue = true;
      this.WindowsPriceRequest.Products.push('#PMU');
    }
    else {
      this.Muhurtha_checkBoxValue = false;
      this.WindowsPriceRequest.Products.splice(this.WindowsPriceRequest.Products.indexOf('#PMU'), 1);
    }
    this.GetWindowsPrice(this.WindowsPriceRequest);
  }
  Horoview_Click(event) {
    this.loadingSwitchService.loading = true;
    if (event.value == true) {
      this.Horoview_checkBoxValue = true;
      this.WindowsPriceRequest.Products.push('#PHV');
    }
    else {
      this.Horoview_checkBoxValue = false;
      this.WindowsPriceRequest.Products.splice(this.WindowsPriceRequest.Products.indexOf('#PHV'), 1);
    }
    this.GetWindowsPrice(this.WindowsPriceRequest);
  }

  Kannada_Click(event) {
    this.loadingSwitchService.loading = true;
    if (event.value == true) {
      this.Kannada_checkBoxValue = true;
      this.WindowsPriceRequest.Language.push('KAN');
    }
    else {
      this.Kannada_checkBoxValue = false;
      this.WindowsPriceRequest.Language.splice(this.WindowsPriceRequest.Language.indexOf('KAN'), 1);
    //if(this.WindowsPriceRequest.Language.length==0&&this.WindowsPriceRequest.Products.length==1&&this.WindowsPriceRequest.Products[0]=='KAN'){
      if(this.WindowsPriceRequest.Language.length==0){

    this.Kannada_checkBoxValue = true;
      this.WindowsPriceRequest.Language.push('KAN');
    }
    }
    this.GetWindowsPrice(this.WindowsPriceRequest);
  }
  Malayalam_Click(event) {
    this.loadingSwitchService.loading = true;
    if (event.value == true) {
      this.Malayalam_checkBoxValue = true;
      this.WindowsPriceRequest.Language.push('MAL');
    }
    else {
      this.Malayalam_checkBoxValue = false;
      this.WindowsPriceRequest.Language.splice(this.WindowsPriceRequest.Language.indexOf('MAL'), 1);
    }
    this.GetWindowsPrice(this.WindowsPriceRequest);
  }
  Tamilu_Click(event) {
    this.loadingSwitchService.loading = true;
    if (event.value == true) {
      this.Tamilu_checkBoxValue = true;
      this.WindowsPriceRequest.Language.push('TAM');
    }
    else {
      this.Tamilu_checkBoxValue = false;
      this.WindowsPriceRequest.Language.splice(this.WindowsPriceRequest.Language.indexOf('TAM'), 1);
    }
    this.GetWindowsPrice(this.WindowsPriceRequest);
  }
  Hindi_Click(event) {
    this.loadingSwitchService.loading = true;
    if (event.value == true) {
      this.Hindi_checkBoxValue = true;
      this.WindowsPriceRequest.Language.push('HIN');
    }
    else {
      this.Hindi_checkBoxValue = false;
      this.WindowsPriceRequest.Language.splice(this.WindowsPriceRequest.Language.indexOf('HIN'), 1);
    }
    this.GetWindowsPrice(this.WindowsPriceRequest);
  }

  AdditionalLisence_Click(event){
    this.loadingSwitchService.loading = true;
    if (event.value == true) {
      this.AdditionalLisence_checkBoxValue = true;
      this.WindowsPriceRequest.Additional=true;
    }
    else {
      this.AdditionalLisence_checkBoxValue = false;
      this.WindowsPriceRequest.Additional=false;
    }
    this.GetWindowsPrice(this.WindowsPriceRequest);
  }

  yearSelection(event) {
    this.yearvalue = event.value;
    this.loadingSwitchService.loading = true;
    this.WindowsYearlyPriceRequest = {
      PartyMastId: StorageService.GetItem('PartyMastId'),
      Years: this.yearvalue
    }
    this.productService.GetWindowsYearlyPrice(this.WindowsYearlyPriceRequest).subscribe((data) => {
      this.payableAmount=data;
      this.GetProductPurchaseWalletBenefit(this.payableAmount);
    });
  }
  
  GetWindowsPrice(WindowsPriceRequest) {
    if (WindowsPriceRequest.Products.length != 0) {
      this.productService.GetWindowsPrice(WindowsPriceRequest).subscribe((data) => {
        this.productPrice=data;
        if(this.CoupenCodeForm.controls['CouponCode'].value!=undefined){
          this.onApplyCouponCode_click();
        }
        this.GetProductPurchaseWalletBenefit(this.productPrice.ActualPrice);
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
      this.disableBuyNow = true;
      if (value.length==0){
        this.disableBuyNow = false;
      }
    }
    else {
      this.disableButton = false;
    }
    this.errorMessage = '';
  }
  onApplyCouponCode_click() {
    this.loadingSwitchService.loading = true;
    this.disableButton = true;
    if(this.payableAmount!=undefined){
      this.Promo = {
        PromoText: this.CoupenCodeForm.controls['CouponCode'].value.replace(/\s/g, ""),
        Amount: this.payableAmount
      }
    }
    else{
      this.Promo = {
        PromoText: this.CoupenCodeForm.controls['CouponCode'].value.replace(/\s/g, ""),
        Amount: this.productPrice.ActualPrice
      }
    }
    
    this.itemService.OccupyPromoCode(this.Promo).subscribe((data) => {
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
      if(this.payableAmount!=undefined){
        this.GetProductPurchaseWalletBenefit(this.payableAmount);
      }
      else{
        this.GetProductPurchaseWalletBenefit(this.productPrice.ActualPrice);
      }
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
  onPay_click() {
    this.loadingSwitchService.loading = true;
    if (this.discountAmount > 0) {
      if(this.payableAmount!=undefined){
        this.paycodes = [{ Code: 'D', Amount: this.discountAmount },
        { Code: this.paymentModedatavalue, Amount: this.payableAmount - this.discountAmount }];
      }
      else{
        this.paycodes = [{ Code: 'D', Amount: this.discountAmount },
        { Code: this.paymentModedatavalue, Amount: this.productPrice.ActualPrice - this.discountAmount }];
      }
    }
    else {
      if(this.payableAmount!=undefined){
        this.paycodes = [{ Code: this.paymentModedatavalue, Amount: this.payableAmount - this.discountAmount }];
      }
      else{
        this.paycodes = [{ Code: this.paymentModedatavalue, Amount: this.productPrice.ActualPrice - this.discountAmount }];
      }
    }
    if (StorageService.GetItem('ProductName') == "Professional") {
      var BuyWindows = {
        PartyMastId: StorageService.GetItem('PartyMastId'),
        Products: this.WindowsPriceRequest.Products,
        Additional: this.AdditionalLisence_checkBoxValue,
        Language: this.WindowsPriceRequest.Language,
        Amount: this.productPrice.ActualPrice - this.discountAmount,
        PromoText: this.CoupenCodeForm.controls['CouponCode'].value.replace(/\s/g, ""),
        PayCodes: this.paycodes
      }
      this.productService.BuyWindows(BuyWindows).subscribe((data) => {
        this.loadingSwitchService.loading = false;
        if (data.Error == undefined) {
          this.horoScopeService.ExtCode = data.ExtCode;
          for (var i = 0; i < data.PayModes.length; i++) {
            if (data.PayModes[i] == "ON") {
              this.loadingSwitchService.loading = true;
              this.pay();
              // if (this.payableAmount != undefined) {
              //   this.razorPayService.pay((this.payableAmount - this.discountAmount), "Product");
              // }
              // else if (this.payableAmount != undefined) {
              //   this.razorPayService.pay((this.productPrice.ActualPrice - this.discountAmount), "Product");
              // }
              break;
            }
            else if (data.PayModes[i] == "OFF") {
              this.loadingSwitchService.loading = false;
              StorageService.SetItem('OrderId', data.OrderId);
              this.router.navigate(['/staticpages/offlinePayment']);
              break;
            }
          }
        }
        else {
          this.errorMessage = data.Error;
          this.CoupenCodeForm.controls['CouponCode'].setValue('');
          document.getElementById('err_CouponCode').innerHTML = '';
          this.loadingSwitchService.loading = false;
        }
      });
    }
    else if (StorageService.GetItem('ProductName') == "Professional Full Package") {
      var BuyWindowsYearly = {
        PartyMastId: StorageService.GetItem('PartyMastId'),
        Years: this.yearvalue,
        Amount: this.payableAmount - this.discountAmount,
        PromoText: this.CoupenCodeForm.controls['CouponCode'].value.replace(/\s/g, ""),
        PayCodes: this.paycodes
      }
      this.productService.BuyWindowsYearly(BuyWindowsYearly).subscribe((data) => {
        this.loadingSwitchService.loading = false;
        if (data.Errors == undefined) {
          this.horoScopeService.ExtCode = data.ExtCode;
          for (var i = 0; i < data.PayModes.length; i++) {
            if (data.PayModes[i] == "ON") {
              this.loadingSwitchService.loading = true;
              this.pay();
              // if (this.payableAmount != undefined) {
              //   this.razorPayService.pay((this.payableAmount - this.discountAmount), "Product");
              // }
              // else if (this.payableAmount != undefined) {
              //   this.razorPayService.pay((this.productPrice.ActualPrice - this.discountAmount), "Product");
              // }
              break;
            }
            else if (data.PayModes[i] == "OFF") {
              this.loadingSwitchService.loading = false;
              StorageService.SetItem('OrderId', data.OrderId);
              this.router.navigate(['/staticpages/offlinePayment']);
              break;
            }
          }
        }
        else {
          this.errorMessage = data.Error;
          this.CoupenCodeForm.controls['CouponCode'].setValue('');
          document.getElementById('err_CouponCode').innerHTML = '';
          this.loadingSwitchService.loading = false;
        }
      });
    }
  }


  pay() {
    if(this.payableAmount!=undefined){
      var options = {
        description: 'Credits towards AstroLite',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        //key: 'rzp_test_fg8RMT6vcRs4DP',
        key: 'rzp_live_guacAtckljJGyQ',
        amount: (this.payableAmount - this.discountAmount) * 100,
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
            this.loadingSwitchService.loading = false;
          }
        }
      };
    }
    else{
      var options = {
        description: 'Credits towards AstroLite',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: 'rzp_test_fg8RMT6vcRs4DP',
        amount: (this.productPrice.ActualPrice - this.discountAmount) * 100,
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
            this.loadingSwitchService.loading = false;
          }
        }
      };
    }
    
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
    this.loadingSwitchService.loading = true;
    this.orderService.PaymentComplete(Payment).subscribe((data) => {
      if (data.Error == undefined) {
        this.horoScopeService.resultResponse = data;
        if (data.AstroReportId.length != 0) {
          this.horoScopeService.AstroReportId = data.AstroReportId[0].split('_')[0];
        }
        this.loadingSwitchService.loading = false;
        this.router.navigate(['/products/paymentsuccess'], { skipLocationChange: true });
        //this.router.navigate(['/purchase/paymentProcessing']);
      }
      else {
        this.errorMessage = data.Error;
      }
    });
  }
}
