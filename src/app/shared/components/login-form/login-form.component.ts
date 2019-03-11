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
import { LoginService } from 'src/Services/login/login.service';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { RegistrationService } from 'src/Services/registration/registration.service';
import { AstamangalaService } from 'src/Services/AstamanglaService/AstamanglaService';
import { MatchMakingService } from 'src/Services/MatchMakingService/MatchMakingService';
import { NumerologyService } from 'src/Services/NumerologyService/NumerologyService';
import { DxPopupModule } from 'devextreme-angular';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { MuhurthaService } from 'src/Services/MuhoorthaService/MuhoorthaService';
import { HeaderComponent } from '../header/header.component';
import { navigationAfterLogin } from 'src/app/app-navigation';
//import { EventsService } from 'angular4-events';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  password = '';
  login = '';
  @Output() close: EventEmitter<any> = new EventEmitter();
  isLoading: boolean = false;
  loading: boolean = false;
  errorMessage: any;
  //requestOTP: boolean = false;
  needtoEnterOTP: boolean;
  uservalidateForm: FormGroup;
  popUpVisible: boolean;
  OTPValidated: string;
  title: string;
  message: string;
  OTPRefNo: any;

  ngAfterViewInit(): void {

  }
  public onDialogOKSelected(event) {
    event.dialog.close();
  }

  public signIn(event) {
    event.dialog.close();
  }
  ngOnDestroy(): void {

  }

  private user: SocialUser;
  private loggedIn: boolean;

  ngOnInit() {
    //this.events.publish('REFRESH_DIGIPARTYNAME');
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      // alert(user.authToken);
    });
  }
  loginForm: FormGroup;
  mobilenoMessage: string;
  PasswordMessage: string;
  isMobileNoEntered: boolean;
  showerrortext: boolean;
  oTPRef: any;
  isOTPRequested: boolean = false;
  isLoginByOTP: boolean;
  orderModel: OrderModel;
  Name: any;
  horoInfo: any;

  constructor(private muhurthaService:MuhurthaService,private numerologyService: NumerologyService, private matchMakingService: MatchMakingService,
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
    // this.loginForm = this.formbuilder.group({
    //   UserName: [8277033170, [Validators.required, Validators.minLength(8)]],
    //   Password: ['1234', [Validators.required, Validators.minLength(4)]]
    // });
    this.loginForm = this.formbuilder.group({
      UserName: [null, [Validators.required, Validators.minLength(8)]],
      Password: ['', [Validators.required, Validators.minLength(4)]]
    });
    const UserNameContrl = this.loginForm.get('UserName');
    UserNameContrl.valueChanges.subscribe(value => this.setErrorMessage(UserNameContrl));

    const PasswordControl = this.loginForm.get('Password');
    PasswordControl.valueChanges.subscribe(value => this.setErrorMessage(PasswordControl));

    this.uservalidateForm = this.formbuilder.group({
      OTP: ['', [Validators.required]]
    });
    const OTPControl = this.uservalidateForm.get('OTP');
    OTPControl.valueChanges.subscribe(value => this.setErrorMessage(OTPControl));
  }

  setErrorMessage(c: AbstractControl): void {
    let control = this.uiService.getControlName(c);
    document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
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

  dismiss() {
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
  onRequestOTP() {
    this.isOTPRequested = true;
    if (this.loginForm.get('UserName').value == '') {
      document.getElementById('err_UserName').innerHTML = 'Please Enter Mobile Number'
    }
    else{
      var GetOTP={
        MobileNo:this.loginForm.get('UserName').value
      }
      this.loginService.GetOTP(GetOTP).subscribe((data:any)=>{
        this.loginService.oTPRef=data;
        this.popUpVisible=true;
        this.title='Note';
        this.message='You Received an OTP with Reference No.'+this.loginService.oTPRef;
        this.loginForm.controls['Password'].setValue('');
      });
    }
  }
  onRegenerateOTP() {

  }
  Login_Click() {
    this.loadingSwitchService.loading = true;
    if (this.isOTPRequested == false) {
      const loginModel = {
        UserName: this.loginForm.get('UserName').value,
        Password: this.loginForm.get('Password').value
      }
      this.loginService.Login(loginModel).subscribe((data) => {
        if (data.Errors == undefined) {
          this.registrationService.registered = false;
          this.loadingSwitchService.loading = false;
          if (data.IsActivated == false) {
            this.needtoEnterOTP = true;
            this.title='Alert';
            this.message= 'Please Enter OTP(since you loginnig for the first time)';
          }
          else if (data.IsActivated == true) {
            this.loginService.PartyMastId = data.PartyMastId;
            if(data.Token!=undefined&&data.PartyMastId!=undefined){
              this.loginService.Token = data.Token;
              this.loginService.Name = data.Name;
              StorageService.SetItem('Token',data.Token);
              StorageService.SetItem('PartyMastId',data.PartyMastId);
              StorageService.SetItem('Name',data.Name);
              this.loginService.userProfileVisible = true;
              this.loginService.menuItems = navigationAfterLogin;
              this.close.emit("hi");
              if (this.horoScopeService.horoRequest != null || this.astamangalaService.horoRequest != null || this.matchMakingService.matchRequest != null || this.numerologyService.numerologyRequest != null|| this.muhurthaService.muhurthaRequest != null) {
                this.router.navigate(["/purchase/paidServices"], { skipLocationChange: true });
              }
              else {
                this.loadingSwitchService.loading = false;
                if (this.loginService.path != undefined) {
                  this.router.navigate([this.loginService.path]);
                }
                else{
                  this.router.navigate(["/services"]);
                } 
              }
            }
          }
        }
        else {
          this.loadingSwitchService.loading = false;
        }
      });

    }
    else {
      this.oTPRef = this.loginService.oTPRef;
      const oTPModel = {
        MobileNo: this.loginForm.get('UserName').value,
        OTPRef: this.oTPRef,
        OTP: this.loginForm.get('Password').value
      }
      this.loadingSwitchService.loading = false;
      this.loginService.ValidateOTP(oTPModel).subscribe((data:any)=>{
        this.loginService.PartyMastId = data.PartyMastId;
        if(data.Token!=undefined&&data.PartyMastId!=undefined){
          this.loginService.Token = data.Token;
          StorageService.SetItem('Token',data.Token);
          StorageService.SetItem('PartyMastId',data.PartyMastId);
          StorageService.SetItem('Name',data.Name);
          this.loginService.userProfileVisible = true;
          if (this.horoScopeService.horoRequest != null || this.astamangalaService.horoRequest != null || this.matchMakingService.matchRequest != null || this.numerologyService.numerologyRequest != null|| this.muhurthaService.muhurthaRequest != null) {
            this.router.navigate(["/purchase/paidServices"]);
          }
          else {
            this.loadingSwitchService.loading = false;
            if (this.loginService.path != undefined) {
              this.router.navigate([this.loginService.path]);
            }
            else{
              this.router.navigate(["/services"]);
            } 
          }
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
  
  ValidateUserByOTP() {
    var UserOTP = {
      UserName: this.loginForm.get('UserName').value,
      OTP: this.uservalidateForm.get('OTP').value
    }
    this.registrationService.ValidateUserByOTP(UserOTP).subscribe((data: any) => {
      if (data.Errors == undefined) {
        this.popUpVisible = true;
        this.title= 'Thank you';
        this.message = 'OTP Validated Successfully. Please Login';
        this.needtoEnterOTP = false;
      }
    });
  }
  ResendOTP_click(){
    var UserName = {
      UserName: this.loginForm.get('UserName').value
    }
    this.registrationService.ResendUserOTP(UserName).subscribe((data: any) => {
      if (data.Errors == undefined) {
        this.title= 'Message';
        this.message = 'Please enter OTP And Submit';
      }
    });
  }
  onBackClick() {
    this.isOTPRequested = false;
    document.getElementById('err_UserName').innerHTML = '';
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
    FormsModule,
  ],
  providers: [AuthService],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent]
})
export class LoginFormModule { }
