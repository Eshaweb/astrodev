import { Component, HostBinding } from '@angular/core';
import { ScreenService, AppInfoService, AuthenticationService } from './shared/services';
import { RegistrationService } from 'src/Services/registration/registration.service';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { ErrorService } from 'src/Services/Error/error.service';
import { Subscription, timer, interval } from 'rxjs';
import { ErrorData } from 'src/Services/Error/ErrorData';
import {
  Router,
  Event,
  NavigationExtras,
  NavigationEnd,
  NavigationStart,
  NavigationError,
  NavigationCancel
} from '@angular/router';
import { OrderService } from 'src/Services/OrderService/OrderService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { OrderHistoryResponse } from 'src/Models/OrderHistoryResponse';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { LoginService } from 'src/Services/LoginService/LoginService';
import { AuthService } from 'angularx-social-login';
import { PartyService } from 'src/Services/PartyService/PartyService';
import { VersionCheckService } from 'src/Services/version-check.service';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  subscription: Subscription;
  errorData: ErrorData;
  subscriptionforArray: Subscription;
  errorMessage: string;
  popupVisible: boolean;
  navigationInProgress: boolean;
  showAddButton: boolean;
  orderhistorypopupVisible: boolean;
  subscribe: Subscription;
  orderHistoryResponse: OrderHistoryResponse;
  sub: Subscription;
  buttonId: any;
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(public loginService: LoginService, public itemService: ItemService, public horoScopeService: HoroScopeService, public partyService:PartyService,
    public storageService: StorageService, public orderService: OrderService, public router: Router, private errorService: ErrorService,
    public loadingSwitchService: LoadingSwitchService, public registrationService: RegistrationService, public authenticationService: AuthenticationService,
    private screen: ScreenService, public appInfo: AppInfoService, public authService: AuthService, public versionCheckService:VersionCheckService) {
    
    this.subscription = this.errorService.loaderState
      .subscribe((errorData: ErrorData) => {
        if (errorData != undefined) {
          this.errorData = errorData;
          if (errorData.modelError != undefined) {
            this.loadingSwitchService.loading = false;
            for (var i = 0; i < errorData.modelError.length; i++) {
              document.getElementById('err_' + errorData.modelError[i].Property).innerHTML = errorData.modelError[i].Error;
            }
          }
          else if (errorData.errorMessage != undefined) {
            this.loadingSwitchService.loading = false;
            this.errorMessage = errorData.errorMessage;
            this.popupVisible = true;
            // this.dialog.message = errorData.errorMessage;
            // this.dialog.open();
          }
        }
      });
    this.subscriptionforArray = this.errorService.loaderStateForArray
      .subscribe((errorData: ErrorData[]) => {
        if (errorData != undefined) {
          if (errorData != undefined) {
            this.loadingSwitchService.loading = false;
            if (errorData.length == 1) {
              this.errorMessage = errorData[0].errorMessage;
              this.popupVisible = true;
              // this.dialog.message = errorMessage;
              // this.dialog.open();
            }
            else {
              this.loadingSwitchService.errorData = errorData;
            }
          }
        }
      });
    router.events.subscribe((routerEvent: Event) => {
      this.processRouterEvent(routerEvent);
    });
    // if(StorageService.GetItem('Token')!=undefined&&window.location.pathname != '/settings/orderHistory') {
    //   const source = timer(1000, 1000);
    //   this.subscribe =source.subscribe(val =>{
    //     if(val==3) {
    //       orderService.LastPendingTransaction(StorageService.GetItem('PartyMastId')).subscribe((data:any)=>{
    //         this.loginService.orderHistoryResponse = data;
    //         if(data.StatusCode=='AP'){
    //           this.loginService.proceedDeliveryAddress=true;
    //         }
    //         else if(data.StatusCode=='BP'||data.StatusCode=='PP'){
    //           this.loginService.proceedPayment=true;
    //         }
    //         this.loginService.orderhistorypopupVisible=true;
    //       });
    //       this.subscribe.unsubscribe();
    //     }
    //   });
    // }
  }

  onstatus_Click(item) {
    this.itemService.ItemAmount = item.Amount;
    this.orderService.orderResponse = {
      OrderId: item.OrderId,
      ItMastId: null,
      ItName: item.ItName
    };
    StorageService.SetItem('OrderId', item.OrderId)
    this.storageService.SetOrderResponse(JSON.stringify(this.orderService.orderResponse));
    if (item.StatusCode == 'AP') {
      if(item.ItName=="Windows Product"){
        this.loginService.orderhistorypopupVisible = false;
      }
      else{
        this.router.navigate(["/purchase/deliveryAddress", { 'OrderId': item.OrderId }]);
      }
    }
    else if (item.StatusCode == 'BP' || item.StatusCode == 'PP') {
      if(item.ItName=="Wallet"){
        this.itemService.walletAmount=this.itemService.ItemAmount;
        this.router.navigate(["/wallet/depoToWallet"]);
      }
      else{
        this.router.navigate(["/purchase/payment"]);
      }
    }
    this.loginService.orderhistorypopupVisible = false;
  }

  ondelete_Click(item) {
    this.loadingSwitchService.loading = true;
    var deleteOrder = {
      PartyMastId: StorageService.GetItem('PartyMastId'),
      OrderId: item.OrderId
    }
    this.orderService.DeleteOrder(deleteOrder).subscribe((data: any) => {
      if (data == true) {
        this.loadingSwitchService.loading = false;
      }
      else {
        this.loadingSwitchService.loading = false;
      }
      this.loginService.orderhistorypopupVisible = false;
    });
  }

ngOnInit(){
  this.versionCheckService.initVersionCheck(environment.versionCheckURL);
}

  ClosePopUp() {
    this.popupVisible = false;
    this.loginService.orderhistorypopupVisible = false;
    this.loginService.proceedDeliveryAddress = false;
    this.loginService.proceedPayment = false;
  }

  onContinue_Click() {

  }
  // ngOnDestroy(): void {
  //   this.authService.signOut().then(() => {
  //     window.location.assign('https://accounts.google.com/Logout');
  //   });
  // }

  onShown() {
    setTimeout(() => {
      this.loadingSwitchService.loading = false;
    }, 3000);
  }

  onHidden() {

  }

  // OnShareButtonOpened() {
  //   this.partyService.GetRefCode(StorageService.GetItem('PartyMastId')).subscribe((data: any) => {
  //       this.loginService.RefCode = 'Join me on Astrolite, a accurate app for Horoscope, Match Making, Muhurtha, Astamangala, Nithya Panchanga and many more astrology related services. Enter My Code'+data+'to get some amount to the wallet!..'+'https://testastroapi.azurewebsites.net/registration/'+data;
  //   });
  // }

  isAutorized() {
    return this.authenticationService.isLoggedIn;
  }

  private processRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.navigationInProgress = true;
      this.showAddButton = true;
      this.loadingSwitchService.loading = true;
      return;
    }
    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loadingSwitchService.loading = false;
      setTimeout(() => {
        this.navigationInProgress = false;
      });

      if (routerEvent instanceof NavigationError) {
        const navigationExtras: NavigationExtras = {
          queryParams: { error: 'App Component handled uncaught NavigationError', errorObject: routerEvent.error.message }
        };

        this.router.navigate(['/error'], navigationExtras);
      }
    }
  }

}
