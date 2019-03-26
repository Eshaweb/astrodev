import { Component, ViewChildren, ElementRef, ViewChild, enableProdMode } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PayCode } from 'src/Models/Sales/PayCode';
import { ServtrDet } from 'src/Models/Sales/SalesModel';
import { SalesService } from 'src/Services/sales/sales.service';
import { UIService } from 'src/Services/UIService/ui.service';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { WalletService } from 'src/Services/Wallet/WalletService';
import { LoginService } from 'src/Services/login/login.service';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import ArrayStore from 'devextreme/data/array_store';
import { StorageService } from 'src/Services/StorageService/Storage_Service';

declare var Razorpay: any;


@Component({
  selector: 'app-deposit-wallet',
  templateUrl: './deposit-wallet.component.html',
  styleUrls: ['./deposit-wallet.component.css']
})
export class DepositWalletComponent {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  depositToWalletForm: FormGroup;
  showError: boolean = false;
  walletAmount: number;
  bonusAmount: number;
  amountMessage: string;
  paymentModes: any;
  paycode: PayCode[];
  servtrDets: ServtrDet[];
  paymentId: any;
  loading: boolean;
  errorMessage: any;
  walletBalanceAmount: any;
  message: string;
  paymentModedata: ArrayStore;
  paymentModedatavalue: any;
  PurchaseAmount: number;

  constructor(public loadingSwitchService:LoadingSwitchService,public loginService: LoginService, public walletService: WalletService, public horoScopeService: HoroScopeService, public route: ActivatedRoute, public router: Router, public salesService: SalesService,
    public uiService: UIService, public formbuilder: FormBuilder) {
    var endPoint = "Sales/GetPayCodes";
    this.depositToWalletForm = this.formbuilder.group({
      // amount: [null, [Validators.required, Validators.minLength(1),Validators.pattern("^[a-z0-9_-]{8,15}$"),Validators.min(50),Validators.max(20000)]],
      // Amount: [null, [Validators.required, Validators.pattern("[50<>20000]=?|="), Validators.min(50), Validators.max(20000)]],
      Amount: [null, [Validators.required, Validators.min(50), Validators.max(20000)]],
      BillPayMode: [null, []]
    });
    const AmountContrl = this.depositToWalletForm.get('Amount');
    AmountContrl.valueChanges.subscribe(value => this.setErrorMessage(AmountContrl));

    this.horoScopeService.GetPayCodes().subscribe((data) => {
      this.paymentModes = data;
      this.paymentModedata = new ArrayStore({
        data: this.paymentModes,
        key: "Id"
      });
      if (this.horoScopeService.horoRequest != null) {
        //this.paymentModedatavalue=this.paymentModes[0].Id;
      }
      else {
        //this.paymentModedatavalue=this.paymentModes[0].Id;
      }
    });
    this.loading=true;
    if (StorageService.GetItem('PartyMastId')!= undefined) {
      this.walletService.GetWalletBalance(StorageService.GetItem('PartyMastId')).subscribe((data) => {
        if (data.Errors == undefined) {
          //IsValid: true 
          this.walletBalanceAmount = data;
          this.loading=false;
        }
      });
    }
    else{
      this.walletBalanceAmount = 'Please Login to View';
    }
  }
  setErrorMessage(c: AbstractControl): void {
    let control = this.uiService.getControlName(c);//gives the control name property from particular service.
    document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
    if ((c.touched || c.dirty) && c.errors) {
      document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
    }
  }
  private validationMessages = {
    amount_required: 'Enter Amount',
    amount_pattern: 'Do not match with pattern',
    amount_min: "Minimum Amount is 50",
    amount_max: "Maximum Amount is 20000",

  };

  selecting = false;
  paymentModeSelection(event) {
    this.paymentModedatavalue=event.value;
    this.paycode = [{
      Code: event.value,
      Amount: this.depositToWalletForm.controls['Amount'].value
    }];
  }
  onAmount(value) {
    this.loading=true;
    if (value < 50 || value > 20000) {
      this.showError = true;
      this.walletAmount = null;
      this.bonusAmount = null;
      this.loading=false;
    }
    else {
      this.showError = false;
      var FreeWalletRequest = {
        PartyMastId: StorageService.GetItem('PartyMastId'),
        PurchaseAmount: value
      }
      this.walletService.GetFreeWallet(FreeWalletRequest).subscribe((data) => {
        if (data.Errors == undefined) {
          this.bonusAmount = data.Amount;
          this.loading=false;
        }
      });
    }

  }
  onClick() {
    this.loadingSwitchService.loading=true;
    var WalletPurchase = {
      PartyMastId: StorageService.GetItem('PartyMastId'),
      PurchaseAmount: this.depositToWalletForm.controls['Amount'].value,
      BillPayMode: this.depositToWalletForm.controls['BillPayMode'].value
    }
    this.PurchaseAmount=(+WalletPurchase.PurchaseAmount)+this.bonusAmount;
    this.walletService.PurchaseWallet(WalletPurchase).subscribe((data) => {
      if (data.IsValid == true && data.PayModes == "ON") {
        this.pay(data.ExtCode);
      }
      else if (data.IsValid == true && data.PayModes == "OFF") {
        this.loadingSwitchService.loading=false;
        this.router.navigate(['/offlinePayment']);
      }
      else if (data.IsValid == true) {
        this.loadingSwitchService.loading=false;
      }
    });
  }

  pay(ExtCode) {
    var options = {
      description: 'Credits towards AstroLite',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_fg8RMT6vcRs4DP',
      amount: this.depositToWalletForm.controls['Amount'].value * 100,
      name: StorageService.GetItem('Name'),
      "handler": (response) => {
        this.paymentId = response.razorpay_payment_id;
        var Payment = {
          PaymentId: this.paymentId
        }
        this.next(Payment);
        this.loadingSwitchService.loading=false;
      },
      prefill: {
        email: 'shailesh@eshaweb.com',
        contact: '9731927204',
        name: 'Shailesh'
      },
      notes: {
        order_id: ExtCode,
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
    var rzp1 = new Razorpay(options);
    rzp1.open();
  }

  next(Payment) {
    this.loadingSwitchService.loading=false;
    this.walletService.PaymentComplete(Payment).subscribe((data) => {
      this.loadingSwitchService.loading=false;
      if (data.Error == undefined) {
         this.loading = false;
        // this.router.navigate(['/purchase/walletPaymentSuccess'], { skipLocationChange: true });
        this.loadingSwitchService.loading=false;
        this.walletService.GetWalletBalance(StorageService.GetItem('PartyMastId')).subscribe((data) => {
          this.loadingSwitchService.loading=false;
          if (data.Errors == undefined) {
            //IsValid: true 
            this.walletBalanceAmount = data;
            this.message='PaymentCompleted and Balance Updated';
            this.loadingSwitchService.loading=false;
          }
        });
      }
      else {
        this.errorMessage = data.Error;
        this.loadingSwitchService.loading=false;
      }
    });
  }
  gotoServies(){
    this.router.navigate(["/services"]);
  }
}
