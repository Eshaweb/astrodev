import { Component, ViewChildren, ElementRef, ViewChild, enableProdMode } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PayCode } from 'src/Models/Sales/PayCode';
import { ServtrDet } from 'src/Models/Sales/SalesModel';
import { SalesService } from 'src/Services/sales/sales.service';
import { UIService } from 'src/Services/UIService/ui.service';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { WalletService } from 'src/Services/Wallet/WalletService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import ArrayStore from 'devextreme/data/array_store';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { LoginService } from 'src/Services/LoginService/LoginService';
import { DxLoadPanelComponent } from 'devextreme-angular';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { RazorPayService } from 'src/Services/RazorPayService/RazorPayService';

declare var Razorpay: any;


@Component({
  selector: 'app-deposit-wallet',
  templateUrl: './deposit-wallet.component.html',
  styleUrls: ['./deposit-wallet.component.scss']
})
export class DepositWalletComponent {
  @ViewChild(DxLoadPanelComponent) public loadPanel: DxLoadPanelComponent;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  depositToWalletForm: FormGroup;
  paycode: PayCode[];
  servtrDets: ServtrDet[];
  paymentModedata: ArrayStore;
  paymentModedatavalue: string;
  showError: boolean = false;
  loading: boolean;

  message: string;
  amountMessage: string;
  walletAmount: number;
  bonusAmount: number;
  PurchaseAmount: number;
  minAmount: number;
  maxAmount: number;
  paymentModes: any;
  paymentId: any;
  errorMessage: any;
  walletBalanceAmount: any;
  bonusPercent: string='0%';
  showSuccess: boolean=false;
  
  

  constructor(public loadingSwitchService:LoadingSwitchService,public loginService: LoginService, 
    public walletService: WalletService, public horoScopeService: HoroScopeService, public razorPayService:RazorPayService,
    public route: ActivatedRoute, public router: Router, public salesService: SalesService,
    public uiService: UIService, public formbuilder: FormBuilder, public itemService:ItemService) {
    var endPoint = "Sales/GetPayCodes";
    this.loading=true;
    this.minAmount=50;
    this.maxAmount=20000;
    if(this.itemService.walletAmount!=undefined){
      this.depositToWalletForm = this.formbuilder.group({
        Amount: [this.itemService.walletAmount, [Validators.required, Validators.min(50), Validators.max(20000)]],
        BillPayMode: [null, []]
      });
      var FreeWalletRequest = {
        PartyMastId: StorageService.GetItem('PartyMastId'),
        PurchaseAmount: this.itemService.walletAmount
      }
      this.walletService.GetFreeWallet(FreeWalletRequest).subscribe((data) => {
        if (data.Errors == undefined) {
          this.bonusAmount = data.Amount;
          this.bonusPercent=data.Percent;
          this.loading=false;
        }
      });
    }
    else{
      this.depositToWalletForm = this.formbuilder.group({
        // amount: [null, [Validators.required, Validators.minLength(1),Validators.pattern("^[a-z0-9_-]{8,15}$"),Validators.min(50),Validators.max(20000)]],
        // Amount: [null, [Validators.required, Validators.pattern("[50<>20000]=?|="), Validators.min(50), Validators.max(20000)]],
        Amount: [null, [Validators.required, Validators.min(50), Validators.max(20000)]],
        BillPayMode: [null, []]
      });
    }
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
      this.bonusPercent='0%';
      this.loading=false;
      if(value==""){
        this.showError=false
      }
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
          this.bonusPercent=data.Percent;
          this.loading=false;
        }
      });
    }

  }
  onClick() {
    var WalletPurchase = {
      PartyMastId: StorageService.GetItem('PartyMastId'),
      PurchaseAmount: this.depositToWalletForm.controls['Amount'].value,
      BillPayMode: this.depositToWalletForm.controls['BillPayMode'].value
    }
    this.PurchaseAmount=(+WalletPurchase.PurchaseAmount)+this.bonusAmount;
    this.walletService.PurchaseWallet(WalletPurchase).subscribe((data) => {
      StorageService.SetItem('ExtCode',data.ExtCode);
      if (data.IsValid == true && data.PayModes == "ON") {
        this.pay(data.ExtCode);
        //this.razorPayService.pay(this.depositToWalletForm.controls['Amount'].value, "Wallet");
      }
      else if (data.IsValid == true && data.PayModes == "OFF") {
        this.loadPanel.visible=false;
        StorageService.SetItem('OrderId',data.OrderId);
        this.router.navigate(['/staticpages/offlinePayment']);
      }
      else if (data.IsValid == true) {
        this.loadPanel.visible=false;
      }
    });
  }

  pay(ExtCode) {
    this.showSuccess=true;
    var options = {
      description: 'Credits towards AstroLite',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_fg8RMT6vcRs4DP',
      //key: 'rzp_live_guacAtckljJGyQ',
      // callback_url:'https://www.google.com/'+this.paymentId,
      // redirect: "true",
      amount: +(this.depositToWalletForm.controls['Amount'].value * 100).toFixed(),
      name: StorageService.GetItem('Name'),
      "handler": (response) => {
        this.paymentId = response.razorpay_payment_id;
        var Payment = {
          PaymentId: this.paymentId
        }
        this.next(Payment);
      },
      prefill: {
        // email: 'shailesh@eshaweb.com',
        // contact: '9731927204',
        // name: 'Shailesh'
      },
      notes: {
        order_id: ExtCode,
      },
      theme: {
        color: '#F37254'
      },
      modal: {
        ondismiss: () => {
          this.loadPanel.visible=false;
          this.showSuccess=false;
        }
      }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  }

  next(Payment) {
    this.loadPanel.visible=true;
    this.loadPanel.position="{ of: '#wallet' }";
    //this.loading=true;
    this.walletService.PaymentComplete(Payment).subscribe((data) => {
      if (data.Error == undefined) {
         this.loading = false;
        // this.router.navigate(['/purchase/walletPaymentSuccess'], { skipLocationChange: true });
        this.walletService.GetWalletBalance(StorageService.GetItem('PartyMastId')).subscribe((data) => {
          if (data.Errors == undefined) {
            //IsValid: true 
            this.walletBalanceAmount = data;
            this.message='PaymentCompleted and Balance Updated';
            this.loadPanel.visible=false;
            //this.loading=false;
          }
        });
      }
      else {
        this.errorMessage = data.Error;
        this.loadPanel.visible=false;
      }
    });
  }
  gotoServies(){
    this.router.navigate(["/services"]);
  }
}
