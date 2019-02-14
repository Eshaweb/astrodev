
import { NgModule, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, ViewChild, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Location, CommonModule } from "@angular/common";
import { SocialUser, AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { OrderModel } from 'src/Models/HoroScope/OrderModel';
import { UIService } from 'src/Services/UIService/ui.service';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { LoginService } from 'src/Services/login/login.service';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { DxButtonModule, DxCheckBoxModule, DxTextBoxModule, DxValidatorModule, DxValidationGroupModule } from 'devextreme-angular';
import { RegistrationService } from 'src/Services/registration/registration.service';
import { RegisterModel } from 'src/Models/Register';
//import { EventsService } from 'angular4-events';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
  public loading = false;
  public currentValue: number;
  public interval: any;
  public maxvalue: number;
  registerModel: RegisterModel;
  EMailOTPType: string;
  SMSOTPType: string;
  value: string;
    popupVisible: boolean;
    uservalidateForm: FormGroup;
    OTPValidated: string;
    OTPValidatedVisible: boolean;
  public changeIcon() {
      return this.interval ? "pause" : "play_arrow";
  }
  public onDialogOKSelected(event) {
      event.dialog.close();
  }
  
  public progresChanged(progress) {

  }
  private randomIntFromInterval(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1) + min);
  }
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  registrationForm: FormGroup;
  mobilenoMessage: string;
  emailMessage: string;
  passwordMessage: string;
  confirm_PasswordMessage: string;
  refCodeMessage: string;
  isLoading: boolean;


  constructor(public loadingSwitchService: LoadingSwitchService, public toastrService: ToastrManager, public uiService: UIService, public registrationService: RegistrationService,
      public route: ActivatedRoute, public _location: Location,
      public router: Router, public formBuilder: FormBuilder) {

      this.registrationForm = this.formBuilder.group({
          UserName: [null, [Validators.required, Validators.minLength(8)]],
          //email: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*"), Validators.minLength(6)]],
          Password: ['', [Validators.required, Validators.minLength(4)]],
          confirm_Password: ['', [Validators.required, Validators.minLength(4)]],
          IntroParty: ['', [Validators.minLength(6)]]
      }, { validator: this.matchingPasswords });

      const UserNameContrl = this.registrationForm.get('UserName');
      UserNameContrl.valueChanges.subscribe(value => this.setErrorMessage(UserNameContrl));

      const PasswordControl = this.registrationForm.get('Password');
      PasswordControl.valueChanges.subscribe(value => this.setErrorMessage(PasswordControl));

      const confirm_PasswordControl = this.registrationForm.get('confirm_Password');
      confirm_PasswordControl.valueChanges.subscribe(value => this.setErrorMessage(confirm_PasswordControl));

      const IntroPartyControl = this.registrationForm.get('IntroParty');
      IntroPartyControl.valueChanges.subscribe(value => this.setErrorMessage(IntroPartyControl));
  
      this.uservalidateForm = this.formBuilder.group({
        //UserName: [null, [Validators.required, Validators.minLength(8)]],
        OTP: ['', [Validators.required]],
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
      UserName_required: 'Enter Mobile No/EMail',
      UserName_minlength: 'Minimum length should be 8',

      email_required: 'Enter EMail',
      email_minlength: 'Minimum length should be 6',
      email_pattern: 'Do not match with EMail pattern',

      Password_required: 'Enter Password',
      Password_minlength: 'Minimum length is 4',

      OTP_required: 'Enter OTP',

      confirm_Password_required: 'Re-Enter Password',
      confirm_Password_minlength: 'Minimum length is 4',
      confirm_Password_invalid: 'Password doesnot match',

      IntroParty_minlength: 'Minimum length should be 6'

  };
  matchingPasswords(group: FormGroup) { // here we have the 'passwords' group
      let password = group.controls.Password.value;
      let confirmpwd = group.controls.confirm_Password.value;
      if (!password || !confirmpwd) {
          return null;
      }
      return password === confirmpwd ? null : { notSame: true }
  }
  Register_Click() {
      this.loadingSwitchService.loading = true;
      var registerModel = {
          UserName: this.registrationForm.get('UserName').value,
          Password: this.registrationForm.get('Password').value,
          IntroParty: this.registrationForm.get('IntroParty').value
      }
      this.maxvalue = 100;
      this.registrationService.RegisterParty(registerModel, (data) => {
          if (data.IsValid != undefined) {
              //IsValid: true 
              this.loadingSwitchService.loading = false;
              this.popupVisible = true;
              if (data.OTPType == "E") {
                  //this.toastrService.successToastr('You Successfully registered. Please check your EMail and click on link we sent to verify your Account', 'Success!');
              this.EMailOTPType='Please check your EMail. You have received a link to verify your Account';
              }
              else if (data.OTPType == "S") {
                  //this.toastrService.successToastr('You Successfully registered. Please check your SMS and enter OTP to verify your Account', 'Success!');
                  this.SMSOTPType='You will get an OTP. Please enter the OTP, when you login for the first time';
              }
          }
          // else {
          //     this.loadingSwitchService.loading = false;
          //     //this.toastrService.errorToastr('Registration Failed', 'Error!');
          //     //   this.dialog.message=data.Errors[0].ErrorString;
          //     //   this.dialog.open();
          // }
      });
  }
  ngOnInit(){

  }
  backClicked() {
      this._location.back();
  }
  ngAfterViewInit(): void {
  }
  ngOnDestroy(): void {
      this.registrationService.registered=true;
  }
  ValidateUserByOTP(){
    var UserOTP={
          UserName: this.registrationForm.get('UserName').value,
          OTP:this.uservalidateForm.get('OTP').value
    }
    this.registrationService.ValidateUserByOTP(UserOTP).subscribe((data:any)=>{
        if (data.Errors == undefined) {
            this.OTPValidatedVisible=true;
            this.OTPValidated='OTP Validated Successfully';
        }
    });
  }
}
