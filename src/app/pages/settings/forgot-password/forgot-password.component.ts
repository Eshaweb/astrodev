
import { NgModule, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, ViewChild, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Location, CommonModule } from "@angular/common";
import { UIService } from 'src/Services/UIService/ui.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { PartyService } from 'src/Services/PartyService/PartyService';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  public loading = false;
  EMailOTPType: string;
  SMSOTPType: string;
  value: string;
    popupVisible: boolean;
    userOTPValidateForm: FormGroup;
    OTPValidated: string;
    OTPValidatedVisible: boolean;
    message: string;
    changePasswordSuccessful: boolean;
    forgotPassword: boolean;
    passwordEntry: boolean;
    Token: string;
 
  public onDialogOKSelected(event) {
      event.dialog.close();
  }
  
  public progresChanged(progress) {

  }
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  forgotPasswordForm: FormGroup;
  isLoading: boolean;
  passwordEntryForm:FormGroup;

  constructor(public loadingSwitchService: LoadingSwitchService, public toastrService: ToastrManager, public uiService: UIService, public partyService: PartyService,
      public route: ActivatedRoute, public _location: Location,
      public router: Router, public formBuilder: FormBuilder) {
      this.forgotPassword=true;    
      this.forgotPasswordForm = this.formBuilder.group({
        UserName: [null, [Validators.required, Validators.minLength(8)]],
      });
      const UserNameContrl = this.forgotPasswordForm.get('UserName');
      UserNameContrl.valueChanges.subscribe(value => this.setErrorMessage(UserNameContrl));

      this.userOTPValidateForm = this.formBuilder.group({
        //UserName: [null, [Validators.required, Validators.minLength(8)]],
        OTP: ['', [Validators.required]],
    });
    const OTPControl = this.userOTPValidateForm.get('OTP');
    OTPControl.valueChanges.subscribe(value => this.setErrorMessage(OTPControl));
    this.passwordEntryForm = this.formBuilder.group({
        NewPassword: ['', [Validators.required, Validators.minLength(4)]],
        confirm_NewPassword: ['', [Validators.required, Validators.minLength(4)]],
    }, { validator: this.matchingPasswords });

    const NewPasswordControl = this.passwordEntryForm.get('NewPassword');
    NewPasswordControl.valueChanges.subscribe(value => this.setErrorMessage(NewPasswordControl));

    const confirm_NewPasswordControl = this.passwordEntryForm.get('confirm_NewPassword');
    confirm_NewPasswordControl.valueChanges.subscribe(value => this.setErrorMessage(confirm_NewPasswordControl));
    }
  setErrorMessage(c: AbstractControl): void {
      let control = this.uiService.getControlName(c);
      document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
      if ((c.touched || c.dirty) && c.errors) {
          document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
      }
  }
  matchingPasswords(group: FormGroup) { // here we have the 'passwords' group
  let password = group.controls.NewPassword.value;
  let confirmpwd = group.controls.confirm_NewPassword.value;
  if (!password || !confirmpwd) {
      return null;
  }
  return password === confirmpwd ? null : { notSame: true }
}
  private validationMessages = {
    UserName_required: 'Enter Mobile No/EMail',
    UserName_minlength: 'Minimum length should be 8',
    
    NewPassword_required: 'Enter New Password',
    NewPassword_minlength: 'Minimum length is 4',

    OTP_required: 'Enter OTP',

    confirm_NewPassword_required: 'Re-Enter New Password',
    confirm_NewPassword_minlength: 'Minimum length is 4',
    confirm_NewPassword_invalid: 'Password doesnot match',
  };
  
  OnGetOTP_Click() {
      this.loadingSwitchService.loading = true;
      var ForgotPassword = {
        UserName: this.forgotPasswordForm.get('UserName').value
      }
      this.partyService.ForgotPassword(ForgotPassword).subscribe((data) => {
          if (data.Type== 'S') {
              this.loadingSwitchService.loading = false;
              this.popupVisible=true;
              this.forgotPassword=false;
              this.SMSOTPType='You will get an OTP. Please enter the OTP';
          
            }
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

}
  OnValidateOTP_click(){
    var UserOTP = {
        UserName: this.forgotPasswordForm.get('UserName').value,
        OTP: this.userOTPValidateForm.get('OTP').value
      }
      this.partyService.ResetOTPValidate(UserOTP).subscribe((data:any)=>{
        if (data.Errors == undefined) {
            this.Token=data.Token;
            this.OTPValidatedVisible=true;
            this.OTPValidated='OTP Validated Successfully';
            this.SMSOTPType=undefined;
            this.passwordEntry=true;
        }
      });
  }

  OnSave_Click(){
    var ResetPassword = {
        UserName: this.forgotPasswordForm.get('UserName').value,
        Password:this.passwordEntryForm.get('NewPassword').value,
        Token:this.Token
      }
      this.partyService.ResetPassword(ResetPassword).subscribe((data:any)=>{
        if (data.Errors == undefined) {
            this.popupVisible=true;
            this.OTPValidated='Password Changed Successfully';
            this.passwordEntry=false;
            this.router.navigate(["/login-form"]);
        }
      });
  }
  ResendOTP_click(){
    var UserName = {
      UserName: this.forgotPasswordForm.get('UserName').value
    }
    
  }
}
