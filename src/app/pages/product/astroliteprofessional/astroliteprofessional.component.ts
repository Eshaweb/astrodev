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
  constructor(public formbuilder: FormBuilder, public uiService: UIService, private loadingSwitchService: LoadingSwitchService,
    private itemService: ItemService, public productService: ProductService, public horoScopeService: HoroScopeService,
    public router: Router, public orderService: OrderService, public loginService: LoginService) {
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
    if(this.productService.ProductName == "Professional"){
      this.Astamangala_checkBoxValue = true;
      this.WindowsPriceRequest = {
        PartyMastId: StorageService.GetItem('PartyMastId'),
        Products: ['#PFH', '#PMM', '#PAM', '#PNM', '#PMU', '#PHV'],
        Language:['KAN','MAL','TAM','HIN'],
        Additional:this.AdditionalLisence_checkBoxValue
      }
    }
    // else if(this.productService.ProductName == "Silver"){
    //   this.Astamangala_checkBoxValue = false;
    //   this.AndroidPriceRequest = {
    //     PartyMastId: StorageService.GetItem('PartyMastId'),
    //     Products: ['#PHM', '#PMMM']
    //   }
    // }
    this.productService.GetWindowsPrice(this.WindowsPriceRequest).subscribe((data) => {
      this.payableAmount = data;
      this.loadingSwitchService.loading = false
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
  GetWindowsPrice(WindowsPriceRequest) {
    if (WindowsPriceRequest.Products.length != 0) {
      this.productService.GetWindowsPrice(WindowsPriceRequest).subscribe((data) => {
        this.payableAmount = data;
        this.loadingSwitchService.loading = false;
      });
    }
    else {
      this.payableAmount = 0;
      this.loadingSwitchService.loading = false;
    }
  }
  OnCouponCode(value) {
    if (value.length < 6) {  //checks for couponcode length
      this.discountAmount = 0;
    }
    else {
      this.disableButton = false;
    }
    this.errorMessage = '';
  }
  onApplyCouponCode_click() {
    this.loadingSwitchService.loading = true;
    this.disableButton = true;
    var Promo = {
      PromoText: this.CoupenCodeForm.controls['CouponCode'].value.replace(/\s/g, ""),
      Amount: this.payableAmount
    }
    this.itemService.OccupyPromoCode(Promo).subscribe((data) => {
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
      this.paycodes = [{ Code: 'D', Amount: this.discountAmount },
      { Code: this.paymentModedatavalue, Amount: this.payableAmount - this.discountAmount }];
    }
    else {
      this.paycodes = [{ Code: this.paymentModedatavalue, Amount: this.payableAmount - this.discountAmount }];
    }
    var BuyAndroid = {
      PartyMastId: StorageService.GetItem('PartyMastId'),
      Products: this.WindowsPriceRequest.Products,
      Amount: this.payableAmount - this.discountAmount,
      PromoText: this.CoupenCodeForm.controls['CouponCode'].value.replace(/\s/g, ""),
      PayCodes: this.paycodes
    }
    this.productService.BuyAndroid(BuyAndroid).subscribe((data) => {
      this.loadingSwitchService.loading = false;
      if (data.Error == undefined) {
        this.horoScopeService.ExtCode = data.ExtCode;
        for (var i = 0; i < data.PayModes.length; i++) {
          if (data.PayModes[i] == "ON") {
            this.loadingSwitchService.loading = true;
            this.pay();
            break;
          }
          else if (data.PayModes[i] == "OFF") {
            this.loadingSwitchService.loading = false;
            this.router.navigate(['/offlinePayment']);
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
      key: 'rzp_test_fg8RMT6vcRs4DP',
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
