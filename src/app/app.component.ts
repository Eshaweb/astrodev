import { Component, HostBinding } from '@angular/core';
import { ScreenService, AppInfoService, AuthenticationService } from './shared/services';
import { RegistrationService } from 'src/Services/registration/registration.service';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { ErrorService } from 'src/Services/Error/error.service';
import { Subscription } from 'rxjs';
import { ErrorData } from 'src/Services/Error/ErrorData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  subscription: Subscription;
  errorData: ErrorData;
  subscriptionforArray: Subscription;
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(private errorService: ErrorService, public loadingSwitchService: LoadingSwitchService, public registrationService:RegistrationService,public authService: AuthenticationService, private screen: ScreenService, public appInfo: AppInfoService) { 
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
            var errorMessage = errorData[0].errorMessage;
            // this.dialog.message = errorMessage;
            // this.dialog.open();
          }
          else{
            this.loadingSwitchService.errorData=errorData;
          }
        }
      }
    });

  }

  isAutorized() {
    return this.authService.isLoggedIn;
  }
}
