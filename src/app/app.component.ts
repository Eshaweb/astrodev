import { Component, HostBinding } from '@angular/core';
import { ScreenService, AppInfoService, AuthenticationService } from './shared/services';
import { RegistrationService } from 'src/Services/registration/registration.service';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { ErrorService } from 'src/Services/Error/error.service';
import { Subscription } from 'rxjs';
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
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  subscription: Subscription;
  errorData: ErrorData;
  subscriptionforArray: Subscription;
  errorMessage: string;
  popupVisible: boolean;
  navigationInProgress: boolean;
  showAddButton: boolean;
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(public router: Router, private errorService: ErrorService, public loadingSwitchService: LoadingSwitchService, public registrationService:RegistrationService,public authService: AuthenticationService, private screen: ScreenService, public appInfo: AppInfoService) { 
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
          this.errorMessage =errorData.errorMessage;
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
          if(errorData.length==1){
            this.errorMessage = errorData[0].errorMessage;
            this.popupVisible = true;
            // this.dialog.message = errorMessage;
            // this.dialog.open();
          }
          else{
            this.loadingSwitchService.errorData=errorData;
          }
        }
      }
    });
    router.events.subscribe((routerEvent: Event) => {
      this.processRouterEvent(routerEvent);
    });
  }
  ClosePopUp(){
    this.popupVisible = false;
  }
  onShown() {
    setTimeout(() => {
        this.loadingSwitchService.loading = false;
    }, 3000);
}

onHidden() {
    
}
  isAutorized() {
    return this.authService.isLoggedIn;
  }
  private processRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.navigationInProgress = true;
      this.showAddButton = true;
      
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
