import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { DxTextBoxModule } from 'devextreme-angular';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxValidationGroupModule } from 'devextreme-angular/ui/validation-group';
import { NgModule, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, ViewChild, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { SocialUser, AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { OrderModel } from 'src/Models/HoroScope/OrderModel';
import { UIService } from 'src/Services/UIService/ui.service';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { RegistrationService } from 'src/Services/registration/registration.service';
import { AstamangalaService } from 'src/Services/AstamanglaService/AstamanglaService';
import { MatchMakingService } from 'src/Services/MatchMakingService/MatchMakingService';
import { NumerologyService } from 'src/Services/NumerologyService/NumerologyService';
import { DxPopupModule, DxLoadPanelModule, DxLoadIndicatorModule } from 'devextreme-angular';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { MuhurthaService } from 'src/Services/MuhoorthaService/MuhoorthaService';
import { HeaderComponent } from '../header/header.component';
import { navigationAfterLogin, navigationAfterLoginForSystem, serviceMenusAfterLogin, serviceListAfterLogin } from 'src/app/app-navigation';
import { timer, Subscription } from 'rxjs';
import { OrderService } from 'src/Services/OrderService/OrderService';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';
import { LoginService } from 'src/Services/LoginService/LoginService';
import { PartyService } from 'src/Services/PartyService/PartyService';
import { DxiButtonModule } from 'devextreme-angular/ui/nested/button-dxi';
import { HttpService } from '../../../../Services/Error/http.service';
//import { EventsService } from 'angular4-events';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  needtoEnterOTP: boolean;
  uservalidateForm: FormGroup;
  loginForm: FormGroup;

  popUpVisible: boolean;
  OTPValidated: string;
  title: string;
  message: string;
  mobilenoMessage: string;
  PasswordMessage: string;
  isMobileNoEntered: boolean;
  showerrortext: boolean;
  isOTPRequested: boolean = false;
  isLoginByOTP: boolean;
  OTPRefNo: any;
  subscribe: Subscription;
  disableResendOTP: boolean = false;
  private user: SocialUser;
  private loggedIn: boolean;
  oTPRef: any;
  orderModel: OrderModel;
  Name: any;
  horoInfo: any;
  loading: boolean;
  ShowPassword_checkBoxValue: boolean;
  textboxMode: string = "password";
  redirectUrl: any;
  passwordMode: string;
  passwordButton: any;
  showResendOTP: boolean;

  constructor(public orderService: OrderService, public storageService: StorageService,public uiService: UIService, public formbuilder: FormBuilder,
    public registrationService: RegistrationService, public loadingSwitchService: LoadingSwitchService, public toastrService: ToastrManager,
    public _location: Location, public route: ActivatedRoute, public router: Router, public http: HttpClient, public partyService: PartyService,
    public authService: AuthService, public horoScopeService: HoroScopeService, public loginService: LoginService, public httpService:HttpService) {

    this.route.params.subscribe(params => {
        //this.id = +params['OrderId']; // (+) converts string 'id' to a number
        this.redirectUrl = params['RedirectUrl'];
        // In a real app: dispatch action to load the details here.
    });
    if (environment.production) {
      this.loginForm = this.formbuilder.group({
        UserName: [null, [Validators.required, Validators.minLength(8)]],
        Password: ['', [Validators.required, Validators.minLength(4)]]
      });
    }
    else {
      this.loginForm = this.formbuilder.group({
        UserName: [8277033170, [Validators.required, Validators.minLength(8)]],
        Password: ['1234', [Validators.required, Validators.minLength(4)]]
      });
    }
    // this.loginForm = this.formbuilder.group({
    //   UserName: [8277033170, [Validators.required, Validators.minLength(8)]],
    //   Password: ['1234', [Validators.required, Validators.minLength(4)]]
    // });

    const UserNameContrl = this.loginForm.get('UserName');
    UserNameContrl.valueChanges.subscribe(value => this.setErrorMessage(UserNameContrl));

    const PasswordControl = this.loginForm.get('Password');
    PasswordControl.valueChanges.subscribe(value => {
      this.setErrorMessage(PasswordControl);
      //this.disableResendOTP=true;
    });

    this.uservalidateForm = this.formbuilder.group({
      OTP: ['', [Validators.required]]
    });
    const OTPControl = this.uservalidateForm.get('OTP');
    OTPControl.valueChanges.subscribe(value => this.setErrorMessage(OTPControl));
  }

  setErrorMessage(c: AbstractControl): void {
    let control = this.uiService.getControlName(c);
    document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
    document.getElementById('err_MobileNo').innerHTML = '';
    document.getElementById('err_OTP').innerHTML = '';
    if ((c.touched || c.dirty) && c.errors) {
      document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
    }
  }

  private validationMessages = {
    UserName_required: 'Enter UserName',
    UserName_minlength: 'Minimum length should be 8',

    Password_required: 'Enter Password/OTP',
    Password_minlength: 'Minimum length should be 4',
  };

  ngOnInit() {
    //this.events.publish('REFRESH_DIGIPARTYNAME');
    this.passwordMode = 'password';
    this.passwordButton = {
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7klEQVRYw+2YP0tcQRTFz65xFVJZpBBS2O2qVSrRUkwqYfUDpBbWQu3ELt/HLRQ/Q8RCGxVJrRDEwj9sTATxZ/Hugo4zL/NmV1xhD9xi59177pl9986fVwLUSyi/tYC+oL6gbuNDYtyUpLqkaUmfJY3a+G9JZ5J2JW1J2ivMDBSxeWCfeBxYTHSOWMcRYLOAEBebxtEVQWPASQdi2jgxro4E1YDTQIJjYM18hszGbew4EHNq/kmCvgDnHtI7YBko58SWgSXg1hN/btyFBM0AlwExczG1YDZrMS4uLUeUoDmgFfjLGwXEtG05wNXyTc4NXgzMCOAIGHD8q0ATuDZrempkwGJ9+AfUQ4K+A/eEseqZ/UbgdUw4fqs5vPeW+5mgBvBAPkLd8cPju+341P7D/WAaJGCdOFQI14kr6o/zvBKZYz11L5Okv5KGA89Kzu9K0b0s5ZXt5PjuOL6TRV5ZalFP4F+rrnhZ1Cs5vN6ijmn7Q162/ThZq9+YNW3MbfvDAOed5cxdGL+RFaUPKQtjI8DVAr66/u9i6+jJzTXm+HFEVqxVYBD4SNZNKzk109HxoycPaG0bIeugVDTp4hH2qdXJDu6xOAAWiuQoQdLHhvY1aEZSVdInG7+Q9EvSz9RrUKqgV0PP3Vz7gvqCOsUj+CxC9LB1Dc8AAAASdEVYdEVYSUY6T3JpZW50YXRpb24AMYRY7O8AAAAASUVORK5CYII=",
        type: "default",
        onClick: () => {
            this.passwordMode = this.passwordMode === "text" ? "password" : "text";
        }
    };
    this.ShowPassword_checkBoxValue = false;
  }

  ngAfterViewInit(): void {
    if (this.registrationService.UserName != undefined) {
      this.loginForm.controls['UserName'].setValue(this.registrationService.UserName);
    }
  }

  // ShowPassword_Click(event) {
  //   if (event.value == true) {
  //     this.ShowPassword_checkBoxValue = true;
  //     this.textboxMode = "text";
  //   }
  //   else {
  //     this.ShowPassword_checkBoxValue = false;
  //     this.textboxMode = "password";
  //   }
  // }

  public signIn(event) {
    event.dialog.close();
  }
  
  onValueChanged(event) {
    if (event.value == "") {
      this.disableResendOTP = false;
    }
    else {
      this.disableResendOTP = true;
    }
    this.getisDisabled();
  }

  getisDisabled() {
    if (this.disableResendOTP == true) {
      return 'isDisabled';
    }
    else {
      return 'notDisabled';
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      //this.loggedIn = (user != null);
      if (user != null&&this.loginService.userProfileVisible==false) {
        var ExternalLogin = {
          Provider: user.provider,
          Token: user.authToken
        }
        if (user.provider == "GOOGLE") {
          this.loadingSwitchService.loading = true;
          this.partyService.ExternalLogin(ExternalLogin).subscribe((data) => {
            if (data.Errors == undefined) {
              this.registrationService.registered = false;
              this.loadingSwitchService.loading = false;
              this.AfterLogin(data);
            }
            this.IsAdmin();
          });
        }
      }
    });
  }

  signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      //this.loggedIn = (user != null);
      if (user != null&&this.loginService.userProfileVisible==false) {
        var ExternalLogin = {
          Provider: user.provider,
          Token: user.authToken
        }
        if (user.provider == "FACEBOOK") {
          this.loadingSwitchService.loading = true;
          this.partyService.ExternalLogin(ExternalLogin).subscribe((data) => {
            if (data.Errors == undefined) {
              this.registrationService.registered = false;
              this.loadingSwitchService.loading = false;
              this.authService.signOut();
              this.AfterLogin(data);
            }
            this.IsAdmin();
          });
        }
      }
    });
  }
  
  goToRegistration() {
    this.registrationService.registered = true;
    this.router.navigate(["/registration/id"]);
  }

  countDown;
  counter = 20;
  tick = 1000;
  onRequestOTP() {
    if (this.loginForm.get('UserName').value == '' || this.loginForm.get('UserName').value == null) {
      document.getElementById('err_UserName').innerHTML = 'Please Enter Mobile Number'
    }
    else {
      this.loadingSwitchService.loading = true;
      this.disableResendOTP = true;
      var GetOTP = {
        MobileNo: this.loginForm.get('UserName').value
      }
      this.loginService.GetOTP(GetOTP).subscribe((data: any) => {
        if (data.Errors == undefined) {
          this.isOTPRequested = true;
          this.loginService.oTPRef = data;

          //this.title='Note';
          this.message = 'You Received an OTP with Reference No. ' + this.loginService.oTPRef + '. Please enter it';
          //this.message = 'You will get an OTP. Please enter it';
          this.loginForm.controls['Password'].setValue('');
        }
        this.disableResendOTP = false;
        this.loadingSwitchService.loading = false;

        this.loading = true;
        this.countDown = timer(0, this.tick).pipe(
          take(this.counter),
          map(() =>
            --this.counter
            // if(this.counter==0){
            //   this.loading=false;
            // }
          ));
      }, (error) => {
        this.isOTPRequested = false;
        this.disableResendOTP = false;
        this.loadingSwitchService.loading = false;
      });
    }
  }

  Login_Click() {
    this.loadingSwitchService.loading = true;
    if (this.isOTPRequested == false) {
      const loginModel = {
        UserName: this.loginForm.get('UserName').value,
        Password: this.loginForm.get('Password').value
      }
      this.Login(loginModel);
    }
    else {
      this.oTPRef = this.loginService.oTPRef;
      const oTPModel = {
        MobileNo: this.loginForm.get('UserName').value,
        OTPRef: this.oTPRef,
        OTP: this.loginForm.get('Password').value
      }
      this.loadingSwitchService.loading = true;
      this.loginService.ValidateOTP(oTPModel).subscribe((data: any) => {
        this.loginService.PartyMastId = data.PartyMastId;
        if (data.Token != undefined && data.PartyMastId != undefined) {
          this.loginService.Token = data.Token;
          this.httpService.AccessToken = data.Token;
          StorageService.SetItem('refreshToken', data.RefreshToken);
          this.loginService.Name = data.Name;
          StorageService.SetItem('PartyMastId', data.PartyMastId);
          StorageService.SetItem('Name', data.Name);
          // this.partyService.GetRefCode(data.PartyMastId).subscribe((data: any) => {
          //   this.loginService.shareButtonDescription='Join me on Astrolite, a accurate app for Horoscope, Match Making, Muhurtha, Astamangala, Nithya Panchanga and many more astrology related services. Enter My Code'+data+'to get some amount to the wallet!..';
          //   this.loginService.RefCode = 'https://testastroapi.azurewebsites.net/registration/' + data;
          // });
          this.loginService.userProfileVisible = true;
          if (window.innerWidth < 900) {
            this.loginService.menuItems = navigationAfterLogin;
          }
          else {
            this.loginService.menuItems = navigationAfterLoginForSystem;
            this.loginService.serviceMenus = serviceMenusAfterLogin;
            this.loginService.serviceList = serviceListAfterLogin;
          }
          if (this.redirectUrl != undefined) {
            this.router.navigate([this.redirectUrl]);
          }
          // if (this.storageService.GetHoroResponse('#SH') != undefined || this.storageService.GetHoroResponse('#SA') != undefined || this.storageService.GetHoroResponse('#SM') != undefined || this.storageService.GetHoroResponse('#NM') != undefined|| this.storageService.GetHoroResponse('#MU') != undefined) {
          //   this.router.navigate(["/purchase/paidServices"], { skipLocationChange: true });
          // }
          else {
            this.loadingSwitchService.loading = false;
              this.router.navigate(["/services"]);
          }
          this.loadingSwitchService.loading = false;
        }
        else {
          const loginModel = {
            UserName: this.loginForm.get('UserName').value,
            Password: this.loginForm.get('Password').value
          }
          this.Login(loginModel);
        }
      });
    }
  }

  backClicked() {
    this._location.back();
  }

  goToLoginByOTP() {
    this.isLoginByOTP = true;
  }

  Login(loginModel) {
    this.loginService.Login(loginModel).subscribe((data) => {
      if (data.Errors == undefined) {
        this.registrationService.registered = false;
        this.loadingSwitchService.loading = false;
        if (data.IsActivated == false) {
          this.needtoEnterOTP = true;
          //this.showResendOTP=true;
          this.title = 'Alert';
          this.message = 'Please Enter OTP(since you loginnig for the first time)';
          this.ResendOTP_click();
        }
        else if (data.IsActivated == true) {
          this.AfterLogin(data);
        }
      }
      else {
        this.loadingSwitchService.loading = false;
        this.loginForm.controls['UserName'].setValue('');
        this.loginForm.controls['Password'].setValue('');
        document.getElementById('err_UserName').innerHTML = '';
        document.getElementById('err_Password').innerHTML = '';
      }
      this.IsAdmin();
    });
  }

  IsAdmin() {
    this.partyService.IsAdmin().subscribe((data) => {
      if (data == true) {
        this.loginService.isAdmin = true;
        StorageService.SetItem('isAdmin', data);
      }
    });
  }

  AfterLogin(data) {
    this.loginService.PartyMastId = data.PartyMastId;
    if (data.Token != undefined && data.PartyMastId != undefined) {
      this.loginService.Token = data.Token;
      this.httpService.AccessToken = data.Token;
      StorageService.SetItem('refreshToken', data.RefreshToken);
      this.loginService.Name = data.Name;
      StorageService.SetItem('PartyMastId', data.PartyMastId);
      StorageService.SetItem('Name', data.Name);
      // this.partyService.GetRefCode(data.PartyMastId).subscribe((data: any) => {
      //   this.loginService.shareButtonDescription='Join me on Astrolite, a accurate app for Horoscope, Match Making, Muhurtha, Astamangala, Nithya Panchanga and many more astrology related services. Enter My Code'+data+'to get some amount to the wallet!..';
      //  // this.loginService.RefCode = 'http://localhost:4200/registration/' + data;
      //  this.loginService.RefCode = 'https://testastroapi.azurewebsites.net/registration/' + data;
      // });
      this.loginService.userProfileVisible = true;
      if (window.innerWidth < 900) {
        this.loginService.menuItems = navigationAfterLogin;
      }
      else {
        this.loginService.menuItems = navigationAfterLoginForSystem;
        this.loginService.serviceMenus = serviceMenusAfterLogin;
        this.loginService.serviceList = serviceListAfterLogin;
      }
      if (this.redirectUrl != undefined) {
        // this.router.navigate(["/purchase/paidServices"], { skipLocationChange: true });
        //this.router.navigate(["/purchase/paidServices"]);
        this.router.navigate([this.redirectUrl]);
      }
      else {
        this.loadingSwitchService.loading = false;6362414885
        this.router.navigate(["/services"]);
        if (StorageService.GetItem('refreshToken') != undefined && window.location.pathname != '/settings/orderHistory') {
          const source = timer(1000, 1000);
          this.subscribe = source.subscribe(val => {
            if (val == 3) {
              this.orderService.LastPendingTransaction(StorageService.GetItem('PartyMastId')).subscribe((data: any) => {
                if (data != null) {
                  this.loginService.orderHistoryResponse = data;
                  if (data.StatusCode == 'AP') {
                    if(data.ItName=="Windows Product"){
                      this.loginService.continueProductPayment = true;
                    }
                    else{
                      this.loginService.proceedDeliveryAddress = true;
                      this.loginService.proceedPayment = false;
                      this.loginService.orderhistorypopupVisible = true;
                    }
                  }
                  else if (data.StatusCode == 'BP' || data.StatusCode == 'PP') {
                    this.loginService.orderhistorypopupVisible = true;
                      this.loginService.proceedPayment = true;
                      this.loginService.proceedDeliveryAddress = false;
                  }
                  else if (data.StatusCode == 'RD' && data.ItName == 'Wallet' ) {
                    this.loginService.orderhistorypopupVisible = false;
                  }
                  else{
                    this.loginService.orderhistorypopupVisible = true;
                  }
                  
                }
              });
              this.subscribe.unsubscribe();
            }
          });
        }
      }
    }
  }

  ValidateUserByOTP() {
    var UserOTP = {
      UserName: this.loginForm.get('UserName').value,
      OTP: this.uservalidateForm.get('OTP').value
    }
    this.registrationService.ValidateUserByOTP(UserOTP).subscribe((data: any) => {
      if (data.Errors == undefined) {
        //this.popUpVisible = true;
        // this.title= 'Thank you';
        // this.message = 'OTP Validated Successfully. Please Login';
        const loginModel = {
          UserName: this.loginForm.get('UserName').value,
          Password: this.loginForm.get('Password').value
        }
        this.Login(loginModel);
        this.needtoEnterOTP = false;
      }
    });
  }
  ResendGetOTP_click() {
    //this.showResendOTP=false;
    this.counter = 20;
    this.loadingSwitchService.loading = true;
    var GetOTP = {
      MobileNo: this.loginForm.get('UserName').value
    }
    this.loginService.GetOTP(GetOTP).subscribe((data: any) => {
      if (data.Errors == undefined) {
        this.loginService.oTPRef = data;
        this.title = 'Message';
        this.message = 'Please enter OTP with Reference No. ' + this.loginService.oTPRef+ ' and click on Login';
      }
      this.disableResendOTP = false;
      this.countDown = timer(0, this.tick).pipe(
        take(this.counter),
        map(() =>
          --this.counter
          // if(this.counter==0){
          //   this.loading=false;
          // }
        ));
      this.loadingSwitchService.loading = false;
    });
  }
  ResendOTP_click() {
    this.counter = 20;
    this.loadingSwitchService.loading = true;
    var UserName = {
      UserName: this.loginForm.get('UserName').value
    }
    this.registrationService.ResendUserOTP(UserName).subscribe((data: any) => {
      if (data.Errors == undefined) {
        this.title = 'Message';
        this.message = 'Please enter the OTP and click on Login';
      }
      this.disableResendOTP = false;
      this.countDown = timer(0, this.tick).pipe(
        take(this.counter),
        map(() =>
          --this.counter
          // if(this.counter==0){
          //   this.loading=false;
          // }
        ));
      this.loadingSwitchService.loading = false;
    });
  }

  onBackClick() {
    this.isOTPRequested = false;
    document.getElementById('err_UserName').innerHTML = '';
    this.message = '';
    this.loginForm.controls['Password'].setValue('');
  }
}

const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  //imports: [RouterModule.forChild(routesnew)],
  exports: [RouterModule]
})
export class LoginFormRoutingModule { }
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxValidationGroupModule, DxiButtonModule,
    DxPopupModule, DxLoadIndicatorModule,
    ReactiveFormsModule, LoginFormRoutingModule,
    FormsModule, DxLoadPanelModule
  ],
  providers: [AuthService],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent]
})
export class LoginFormModule { }
