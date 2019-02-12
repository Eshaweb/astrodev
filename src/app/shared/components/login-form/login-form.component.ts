import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxValidationGroupModule } from 'devextreme-angular/ui/validation-group';
import { NgModule, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, ViewChild, Component } from '@angular/core';
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
//import { EventsService } from 'angular4-events';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  password = '';
  login = '';
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  isLoading: boolean = false;
  loading: boolean = false;
  errorMessage: any;
  requestOTP: boolean=false;

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

  constructor(private astamangalaService:AstamangalaService, public registrationService:RegistrationService,public loadingSwitchService: LoadingSwitchService, public toastrService: ToastrManager, 
    public _location: Location, public route: ActivatedRoute, public router: Router, public http: HttpClient,
    public authService: AuthService, public horoScopeService: HoroScopeService, public loginService: LoginService,
    public uiService: UIService, public formbuilder: FormBuilder) {

    // this.route.params.subscribe(params => {
    //     //this.id = +params['OrderId']; // (+) converts string 'id' to a number
    //     this.orderModel = params['orderModel'];
    //     this.horoInfo = params['HoroInfo'];
    //     // In a real app: dispatch action to load the details here.
    // });
    this.loginForm = this.formbuilder.group({
      UserName: [8277033170, [Validators.required, Validators.minLength(8)]],
      Password: ['1234', [Validators.required, Validators.minLength(4)]]
    });
    const UserNameContrl = this.loginForm.get('UserName');
    UserNameContrl.valueChanges.subscribe(value => this.setErrorMessage(UserNameContrl));

    const PasswordControl = this.loginForm.get('Password');
    PasswordControl.valueChanges.subscribe(value => this.setErrorMessage(PasswordControl));
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

    Password_required: 'Enter Password',
    Password_minlength: 'Minimum length should be 3',
  };

  dismiss() {
  }
  onMobileNo() {
    var MobileNo = this.loginForm.get('UserName').value;
    this.loginService.GetOTP(MobileNo);
    this.isOTPRequested = true;
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
    this.registrationService.registered=true;
    this.router.navigate(["/registration-form"]);
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
          this.registrationService.registered=false;
          this.loginService.PartyMastId = data.PartyMastId;
          this.loginService.Token = data.Token;
          this.loadingSwitchService.loading = false;
          if (this.horoScopeService.horoRequest != null) {
            if (data.IsActivated == true) {
              this.router.navigate(["/purchase/paidServices"]);
              //this.router.navigate(["/purchase/paidServices"]);
            }
            else if (data.IsActivated == false) {
              //this.events.publish('To_UserActivation');  //events written in appcomponent fires
              this.router.navigate(["/purchase/enterOTP"]);
            }
          }
          else if (this.astamangalaService.horoRequest != null) {
            if (data.IsActivated == true) {
              this.router.navigate(["/purchase/paidServices"]);
            }
            else if (data.IsActivated == false) {
              this.router.navigate(["/purchase/enterOTP"]);
            }
          }
          else {
            if (data.IsActivated == true) {
              this.loadingSwitchService.loading = false;
              this.router.navigate(["/home"]);
            }
            else if (data.IsActivated == false) {
              this.loadingSwitchService.loading = false;
              //this.events.publish('To_UserActivation');
              this.router.navigate(["/enterOTP"]);
            }

          }
        }
        else {
          this.loadingSwitchService.loading = false;
          // this.dialog.message=data.Error;
          // this.dialog.open();
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
      this.loginService.ValidateOTP(oTPModel);
    }
  }
  backClicked() {
    this._location.back();
  }
  goToLoginByOTP() {
    this.isLoginByOTP = true;
  }
  onRequestOTP(){
      this.requestOTP=true;
      if (this.loginForm.get('UserName').value==null) {
          document.getElementById('err_UserName').innerHTML ='Please Enter Registered Mobile Number/EMail ID'
      }
  }
  onRegenerateOTP(){

  }
  onBackClick(){
      this.requestOTP=false;
      document.getElementById('err_UserName').innerHTML ='';
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
    ReactiveFormsModule,
    FormsModule,
  ],
  providers:[AuthService],
  declarations: [ LoginFormComponent ],
  exports: [ LoginFormComponent ]
})
export class LoginFormModule { }
