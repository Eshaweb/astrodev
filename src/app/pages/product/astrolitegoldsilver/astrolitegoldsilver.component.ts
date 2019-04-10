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
declare var Razorpay: any;

@Component({
  selector: 'app-astrolitegoldsilver',
  templateUrl: './astrolitegoldsilver.component.html',
  styleUrls: ['./astrolitegoldsilver.component.scss']
})
export class AstrolitegoldsilverComponent implements OnInit {
  Astamangala_checkBoxValue: boolean;
  MatchMaking_checkBoxValue: boolean;
  Horoscope_checkBoxValue: boolean;
  CoupenCodeForm: FormGroup;
  payableAmount: any;
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
  constructor(public formbuilder: FormBuilder,public uiService: UIService,private loadingSwitchService:LoadingSwitchService,
              private itemService:ItemService, public productService: ProductService, public horoScopeService:HoroScopeService,
              public router: Router, public orderService:OrderService) { 
    this.paymentModeForm = this.formbuilder.group({
      paymentMode: ['', []],
    });
    this.CoupenCodeForm = this.formbuilder.group({
      CouponCode: ['', [Validators.required, Validators.minLength(6)]],
    });
    const CouponCodeContrl = this.CoupenCodeForm.get('CouponCode');
    CouponCodeContrl.valueChanges.subscribe(value => this.setErrorMessage(CouponCodeContrl));
    this.Horoscope_checkBoxValue=true;
    this.MatchMaking_checkBoxValue=true;
    this.Astamangala_checkBoxValue=true;
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
    this.loadingSwitchService.loading=true;
    this.AndroidPriceRequest={
        PartyMastId:StorageService.GetItem('PartyMastId'),
        Products:['#PHM','#PMMM','#PAMM']
    }
    this.productService.GetAndroidPrice(this.AndroidPriceRequest).subscribe((data) => {
           this.payableAmount=data;  
           this.loadingSwitchService.loading=false  
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
    this.loadingSwitchService.loading=true;
    if(event.value==true){
      this.Horoscope_checkBoxValue=true;
      this.AndroidPriceRequest.Products.push('#PHM');
    }
    else{
      this.Horoscope_checkBoxValue=false;
      this.AndroidPriceRequest.Products.splice(this.AndroidPriceRequest.Products.indexOf('#PHM'),1);
    }
    this.GetAndroidPrice(this.AndroidPriceRequest);
  }
  MatchMaking_Click(event, ProductId) {
    this.loadingSwitchService.loading=true;
    if(event.value==true){
      this.MatchMaking_checkBoxValue=true;
      this.AndroidPriceRequest.Products.push('#PMMM');
    }
    else{
      this.MatchMaking_checkBoxValue=false;
      this.AndroidPriceRequest.Products.splice(this.AndroidPriceRequest.Products.indexOf('#PMMM'),1);
    }
    this.GetAndroidPrice(this.AndroidPriceRequest);
  }
  Astamangala_Click(event, ProductId) {
    this.loadingSwitchService.loading=true;
    if(event.value==true){
      this.Astamangala_checkBoxValue=true;
      this.AndroidPriceRequest.Products.push('#PAMM');
    }
    else{
      this.Astamangala_checkBoxValue=false;
      this.AndroidPriceRequest.Products.splice(this.AndroidPriceRequest.Products.indexOf('#PAMM'),1);
    }
    this.GetAndroidPrice(this.AndroidPriceRequest);
  }
  GetAndroidPrice(AndroidPriceRequest){
    if(AndroidPriceRequest.Products.length!=0){
      this.productService.GetAndroidPrice(AndroidPriceRequest).subscribe((data) => {
        this.payableAmount=data;   
        this.loadingSwitchService.loading=false; 
       });
    }
    else{
      this.payableAmount=0; 
      this.loadingSwitchService.loading=false; 
    }
  }
  OnCouponCode(value){
    if (value.length < 6) {  //checks for couponcode length
      this.discountAmount = 0;
    }
    else{
      this.disableButton=false;
    }
    this.errorMessage='';
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
    this.loadingSwitchService.loading=true;
    if(this.discountAmount>0){
      this.paycodes = [{ Code: 'D', Amount: this.discountAmount },
        { Code: this.paymentModedatavalue, Amount: this.payableAmount-this.discountAmount }];
    }
    else{
      this.paycodes = [{ Code: this.paymentModedatavalue, Amount: this.payableAmount-this.discountAmount }];
    }
    var BuyAndroid = {
      PartyMastId:StorageService.GetItem('PartyMastId'),
      Products:this.AndroidPriceRequest.Products,
      Amount:this.payableAmount-this.discountAmount,
      PromoText:this.CoupenCodeForm.controls['CouponCode'].value.replace(/\s/g, ""),
      PayCodes:this.paycodes
    }
    this.productService.BuyAndroid(BuyAndroid).subscribe((data) => {
      this.loadingSwitchService.loading=false;
      if(data.Error==undefined){
        this.horoScopeService.ExtCode =data.ExtCode;
        for (var i = 0; i < data.PayModes.length; i++) {
          if (data.PayModes[i] == "ON") {
            this.loadingSwitchService.loading=true;
            this.pay();
            break;
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


  pay() {
    var options = {
      description: 'Credits towards AstroLite',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_fg8RMT6vcRs4DP',
      amount: (this.payableAmount-this.discountAmount) * 100,
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
        this.loadingSwitchService.loading=false;
        this.router.navigate(['/products/paymentsuccess'], { skipLocationChange: true });
        //this.router.navigate(['/purchase/paymentProcessing']);
      }
      else {
        this.errorMessage = data.Error;
      }
    });
  }
}
