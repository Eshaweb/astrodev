import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
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
import { DxPopupModule, DxLoadPanelModule } from 'devextreme-angular';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { MuhurthaService } from 'src/Services/MuhoorthaService/MuhoorthaService';
import { HeaderComponent } from '../header/header.component';
import { navigationAfterLogin, navigationAfterLoginForSystem, serviceMenusAfterLogin, serviceListAfterLogin } from 'src/app/app-navigation';
import { timer, Subscription } from 'rxjs';
import { OrderService } from 'src/Services/OrderService/OrderService';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';
import { LoginService } from 'src/Services/LoginService/LoginService';
//import { EventsService } from 'angular4-events';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Output() close: EventEmitter<any> = new EventEmitter();
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

  constructor(public orderService: OrderService, public storageService: StorageService, private muhurthaService: MuhurthaService, private numerologyService: NumerologyService, private matchMakingService: MatchMakingService,
    private astamangalaService: AstamangalaService, public registrationService: RegistrationService, public loadingSwitchService: LoadingSwitchService, public toastrService: ToastrManager,
    public _location: Location, public route: ActivatedRoute, public router: Router, public http: HttpClient,
    public authService: AuthService, public horoScopeService: HoroScopeService, public loginService: LoginService,
    public uiService: UIService, public formbuilder: FormBuilder) {

    // this.route.params.subscribe(params => {
    //     //this.id = +params['OrderId']; // (+) converts string 'id' to a number
    //     this.orderModel = params['orderModel'];
    //     this.horoInfo = params['HoroInfo'];
    //     // In a real app: dispatch action to load the details here.
    // });
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
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      // alert(user.authToken);
    });
  }
  ngAfterViewInit(): void {

  }

  public signIn(event) {
    event.dialog.close();
  }
  ngOnDestroy(): void {

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

  }
  signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);

  }
  signOut(): void {
    this.authService.signOut();
  }

  goToRegistration() {
    this.registrationService.registered = true;
    this.router.navigate(["/registration-form"]);
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
          //this.popUpVisible=true;
          //this.title='Note';
          //this.message='You Received an OTP with Reference No.'+this.loginService.oTPRef;
          this.message = 'You will get an OTP. Please enter it';
          this.loginForm.controls['Password'].setValue('');
        }
        this.disableResendOTP = false;
        this.loadingSwitchService.loading = false;
        //this.loading=true;
        this.countDown = timer(0, this.tick).pipe(
          take(this.counter),
          map(() => {
            --this.counter;
            // if(this.counter==0){
            //   this.loading=false;
            // }
          })); //To count down the time.

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
      // this.loginService.Login(loginModel).subscribe((data) => {
      //   if (data.Errors == undefined) {
      //     this.registrationService.registered = false;
      //     this.loadingSwitchService.loading = false;
      //     if (data.IsActivated == false) {
      //       this.needtoEnterOTP = true;
      //       this.title='Alert';
      //       this.message= 'Please Enter OTP(since you loginnig for the first time)';
      //     }
      //     else if (data.IsActivated == true) {
      //       this.loginService.PartyMastId = data.PartyMastId;
      //       if(data.Token!=undefined&&data.PartyMastId!=undefined){
      //         this.loginService.Token = data.Token;
      //         this.loginService.Name = data.Name;
      //         StorageService.SetItem('Token',data.Token);
      //         StorageService.SetItem('PartyMastId',data.PartyMastId);
      //         StorageService.SetItem('Name',data.Name);
      //         this.loginService.userProfileVisible = true;
      //         if (window.innerWidth < 768) {
      //           this.loginService.menuItems = navigationAfterLogin;
      //         }
      //         else{
      //           this.loginService.menuItems = navigationAfterLoginForSystem;
      //           this.loginService.serviceMenus= serviceMenusAfterLogin;
      //           this.loginService.serviceList= serviceListAfterLogin;
      //         }
      //        // this.loginService.navBarData = menusAfterLogin;
      //         this.close.emit("hi");
      //         // if (this.horoScopeService.horoRequest != null || this.astamangalaService.horoRequest != null || this.matchMakingService.matchRequest != null || this.numerologyService.numerologyRequest != null|| this.muhurthaService.muhurthaRequest != null) {
      //         //   this.router.navigate(["/purchase/paidServices"], { skipLocationChange: true });
      //         // }
      //         if (this.storageService.GetHoroResponse('#SH') != undefined || this.storageService.GetHoroResponse('#SA') != undefined || this.storageService.GetHoroResponse('#SM') != undefined || this.storageService.GetHoroResponse('#NM') != undefined|| this.storageService.GetHoroResponse('#MU') != undefined) {
      //           // this.router.navigate(["/purchase/paidServices"], { skipLocationChange: true });
      //           this.router.navigate(["/purchase/paidServices"]);
      //         }
      //         else {
      //           this.loadingSwitchService.loading = false;
      //           if (this.loginService.path != undefined) {
      //             this.router.navigate([this.loginService.path]);
      //           }
      //           else{
      //             this.router.navigate(["/services"]);
      //           } 
      //         }
      //       }
      //     }
      //   }
      //   else {
      //     this.loadingSwitchService.loading = false;
      //     this.loginForm.controls['UserName'].setValue('');
      //     this.loginForm.controls['Password'].setValue('');
      //     document.getElementById('err_UserName').innerHTML='';
      //     document.getElementById('err_Password').innerHTML='';
      //   }
      // });
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
          StorageService.SetItem('Token', data.Token);
          StorageService.SetItem('PartyMastId', data.PartyMastId);
          StorageService.SetItem('Name', data.Name);
          this.loginService.userProfileVisible = true;
          if (window.innerWidth < 768) {
            this.loginService.menuItems = navigationAfterLogin;
          }
          else {
            this.loginService.menuItems = navigationAfterLoginForSystem;
            this.loginService.serviceMenus = serviceMenusAfterLogin;
            this.loginService.serviceList = serviceListAfterLogin;
          }
          if (this.horoScopeService.horoRequest != null || this.astamangalaService.horoRequest != null || this.matchMakingService.matchRequest != null || this.numerologyService.numerologyRequest != null || this.muhurthaService.muhurthaRequest != null) {
            this.router.navigate(["/purchase/paidServices"]);
          }
          // if (this.storageService.GetHoroResponse('#SH') != undefined || this.storageService.GetHoroResponse('#SA') != undefined || this.storageService.GetHoroResponse('#SM') != undefined || this.storageService.GetHoroResponse('#NM') != undefined|| this.storageService.GetHoroResponse('#MU') != undefined) {
          //   this.router.navigate(["/purchase/paidServices"], { skipLocationChange: true });
          // }
          else {
            this.loadingSwitchService.loading = false;
            if (this.loginService.path != undefined) {
              this.router.navigate([this.loginService.path]);
            }
            else {
              this.router.navigate(["/services"]);
            }
          }
        }
        this.loadingSwitchService.loading = false;
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
          this.title = 'Alert';
          this.message = 'Please Enter OTP(since you loginnig for the first time)';
        }
        else if (data.IsActivated == true) {
          this.loginService.PartyMastId = data.PartyMastId;
          if (data.Token != undefined && data.PartyMastId != undefined) {
            this.loginService.Token = data.Token;
            this.loginService.Name = data.Name;
            StorageService.SetItem('Token', data.Token);
            StorageService.SetItem('PartyMastId', data.PartyMastId);
            StorageService.SetItem('Name', data.Name);
            this.loginService.userProfileVisible = true;
            if (window.innerWidth < 768) {
              this.loginService.menuItems = navigationAfterLogin;
            }
            else {
              this.loginService.menuItems = navigationAfterLoginForSystem;
              this.loginService.serviceMenus = serviceMenusAfterLogin;
              this.loginService.serviceList = serviceListAfterLogin;
            }
            // this.loginService.navBarData = menusAfterLogin;
            this.close.emit("hi");
            // if (this.horoScopeService.horoRequest != null || this.astamangalaService.horoRequest != null || this.matchMakingService.matchRequest != null || this.numerologyService.numerologyRequest != null|| this.muhurthaService.muhurthaRequest != null) {
            //   this.router.navigate(["/purchase/paidServices"], { skipLocationChange: true });
            // }
            if (this.storageService.GetHoroResponse('#SH') != undefined || this.storageService.GetHoroResponse('#SA') != undefined || this.storageService.GetHoroResponse('#SM') != undefined || this.storageService.GetHoroResponse('#NM') != undefined || this.storageService.GetHoroResponse('#MU') != undefined) {
              // this.router.navigate(["/purchase/paidServices"], { skipLocationChange: true });
              this.router.navigate(["/purchase/paidServices"]);
            }
            else {
              this.loadingSwitchService.loading = false;
              if (this.loginService.path != undefined) {
                this.router.navigate([this.loginService.path]);
              }
              else {
                this.router.navigate(["/services"]);
              }
              if (StorageService.GetItem('Token') != undefined && window.location.pathname != '/settings/orderHistory') {
                const source = timer(1000, 1000);
                this.subscribe = source.subscribe(val => {
                  if (val == 3) {
                    this.orderService.LastPendingTransaction(StorageService.GetItem('PartyMastId')).subscribe((data: any) => {
                      if (data != null) {
                        this.loginService.orderHistoryResponse = data;
                        if (data.StatusCode == 'AP') {
                          this.loginService.proceedDeliveryAddress = true;
                        }
                        else if (data.StatusCode == 'BP' || data.StatusCode == 'PP') {
                          this.loginService.proceedPayment = true;
                        }
                        this.loginService.orderhistorypopupVisible = true;
                      }
                    });
                    this.subscribe.unsubscribe();
                  }
                });
              }
            }
          }
        }
      }
      else {
        this.loadingSwitchService.loading = false;
        this.loginForm.controls['UserName'].setValue('');
        this.loginForm.controls['Password'].setValue('');
        document.getElementById('err_UserName').innerHTML = '';
        document.getElementById('err_Password').innerHTML = '';
      }
    });
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
        // this.loginService.Login(loginModel).subscribe((data) => {
        //   if (data.Errors == undefined) {
        //     this.registrationService.registered = false;
        //     this.loadingSwitchService.loading = false;
        //     if (data.IsActivated == true) {
        //       this.loginService.PartyMastId = data.PartyMastId;
        //       if(data.Token!=undefined&&data.PartyMastId!=undefined){
        //         this.loginService.Token = data.Token;
        //         this.loginService.Name = data.Name;
        //         StorageService.SetItem('Token',data.Token);
        //         StorageService.SetItem('PartyMastId',data.PartyMastId);
        //         StorageService.SetItem('Name',data.Name);
        //         this.loginService.userProfileVisible = true;
        //         if (window.innerWidth < 768) {
        //           this.loginService.menuItems = navigationAfterLogin;
        //         }
        //         else{
        //           this.loginService.menuItems = navigationAfterLoginForSystem;
        //           this.loginService.serviceMenus= serviceMenusAfterLogin;
        //           this.loginService.serviceList= serviceListAfterLogin;
        //         }
        //        // this.loginService.navBarData = menusAfterLogin;
        //         this.close.emit("hi");

        //         if (this.storageService.GetHoroResponse('#SH') != undefined || this.storageService.GetHoroResponse('#SA') != undefined || this.storageService.GetHoroResponse('#SM') != undefined || this.storageService.GetHoroResponse('#NM') != undefined|| this.storageService.GetHoroResponse('#MU') != undefined) {
        //           // this.router.navigate(["/purchase/paidServices"], { skipLocationChange: true });
        //           this.router.navigate(["/purchase/paidServices"]);
        //         }
        //         else {
        //           this.loadingSwitchService.loading = false;
        //           if (this.loginService.path != undefined) {
        //             this.router.navigate([this.loginService.path]);
        //           }
        //           else{
        //             this.router.navigate(["/services"]);
        //           } 
        //         }
        //       }
        //     }
        //     // else {
        //     //   this.loadingSwitchService.loading = false;
        //     //   this.loginForm.controls['UserName'].setValue('');
        //     //   this.loginForm.controls['Password'].setValue('');
        //     //   document.getElementById('err_UserName').innerHTML='';
        //     //   document.getElementById('err_Password').innerHTML='';
        //     // }
        //   }
        // });
        this.Login(loginModel);
        this.needtoEnterOTP = false;
      }
    });
  }
  ResendOTP_click() {
    this.loadingSwitchService.loading = true;
    var UserName = {
      UserName: this.loginForm.get('UserName').value
    }
    this.registrationService.ResendUserOTP(UserName).subscribe((data: any) => {
      if (data.Errors == undefined) {
        this.title = 'Message';
        this.message = 'Please enter OTP And Submit';
      }
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
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxValidationGroupModule,
    DxPopupModule,
    ReactiveFormsModule,
    FormsModule, DxLoadPanelModule
  ],
  providers: [AuthService],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent]
})
export class LoginFormModule { }
