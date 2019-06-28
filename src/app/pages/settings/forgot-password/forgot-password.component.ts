
import { NgModule, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, ViewChild, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Location, CommonModule } from "@angular/common";
import { UIService } from 'src/Services/UIService/ui.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { PartyService } from 'src/Services/PartyService/PartyService';
import { RegistrationService } from 'src/Services/registration/registration.service';
import { timer } from 'rxjs';
import { take, map } from 'rxjs/operators';

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
  UserId: any;
  disableResendOTP: boolean;
  passwordMode: string;
  passwordMode_NewPassword: string;
  passwordMode_confirm_NewPassword: string;
  passwordButton: { icon: string; type: string; onClick: () => void; };
  passwordButton_NewPassword: { icon: string; type: string; onClick: () => void; };
  passwordButton_confirm_NewPassword: { icon: string; type: string; onClick: () => void; };

  public onDialogOKSelected(event) {
      event.dialog.close();
  }
  
  public progresChanged(progress) {

  }
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  forgotPasswordForm: FormGroup;
  isLoading: boolean;
  passwordEntryForm:FormGroup;

  constructor(public registrationService:RegistrationService,public loadingSwitchService: LoadingSwitchService, public toastrService: ToastrManager, public uiService: UIService, public partyService: PartyService,
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
  countDown;
  counter = 20;
  tick = 1000;
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
              //this.disableResendOTP = true;
              this.countDown = timer(0, this.tick).pipe(
                take(this.counter),
                map(() => 
                  --this.counter
                )); 
            }
            else if (data.Type== 'E') {
              this.loadingSwitchService.loading = false;
              this.popupVisible=true;
              this.EMailOTPType='You will get an EMail. Please click on the Link there to verify you';
            }
      });
  }
  ngOnInit(){
    this.passwordMode = 'password';
    this.passwordMode_NewPassword = 'password';
    this.passwordMode_confirm_NewPassword = 'password';
    this.passwordButton = {
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7klEQVRYw+2YP0tcQRTFz65xFVJZpBBS2O2qVSrRUkwqYfUDpBbWQu3ELt/HLRQ/Q8RCGxVJrRDEwj9sTATxZ/Hugo4zL/NmV1xhD9xi59177pl9986fVwLUSyi/tYC+oL6gbuNDYtyUpLqkaUmfJY3a+G9JZ5J2JW1J2ivMDBSxeWCfeBxYTHSOWMcRYLOAEBebxtEVQWPASQdi2jgxro4E1YDTQIJjYM18hszGbew4EHNq/kmCvgDnHtI7YBko58SWgSXg1hN/btyFBM0AlwExczG1YDZrMS4uLUeUoDmgFfjLGwXEtG05wNXyTc4NXgzMCOAIGHD8q0ATuDZrempkwGJ9+AfUQ4K+A/eEseqZ/UbgdUw4fqs5vPeW+5mgBvBAPkLd8cPju+341P7D/WAaJGCdOFQI14kr6o/zvBKZYz11L5Okv5KGA89Kzu9K0b0s5ZXt5PjuOL6TRV5ZalFP4F+rrnhZ1Cs5vN6ijmn7Q162/ThZq9+YNW3MbfvDAOed5cxdGL+RFaUPKQtjI8DVAr66/u9i6+jJzTXm+HFEVqxVYBD4SNZNKzk109HxoycPaG0bIeugVDTp4hH2qdXJDu6xOAAWiuQoQdLHhvY1aEZSVdInG7+Q9EvSz9RrUKqgV0PP3Vz7gvqCOsUj+CxC9LB1Dc8AAAASdEVYdEVYSUY6T3JpZW50YXRpb24AMYRY7O8AAAAASUVORK5CYII=",
        type: "default",
        onClick: () => {
            this.passwordMode = this.passwordMode === "text" ? "password" : "text";
        }
    };
    this.passwordButton_NewPassword = {
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7klEQVRYw+2YP0tcQRTFz65xFVJZpBBS2O2qVSrRUkwqYfUDpBbWQu3ELt/HLRQ/Q8RCGxVJrRDEwj9sTATxZ/Hugo4zL/NmV1xhD9xi59177pl9986fVwLUSyi/tYC+oL6gbuNDYtyUpLqkaUmfJY3a+G9JZ5J2JW1J2ivMDBSxeWCfeBxYTHSOWMcRYLOAEBebxtEVQWPASQdi2jgxro4E1YDTQIJjYM18hszGbew4EHNq/kmCvgDnHtI7YBko58SWgSXg1hN/btyFBM0AlwExczG1YDZrMS4uLUeUoDmgFfjLGwXEtG05wNXyTc4NXgzMCOAIGHD8q0ATuDZrempkwGJ9+AfUQ4K+A/eEseqZ/UbgdUw4fqs5vPeW+5mgBvBAPkLd8cPju+341P7D/WAaJGCdOFQI14kr6o/zvBKZYz11L5Okv5KGA89Kzu9K0b0s5ZXt5PjuOL6TRV5ZalFP4F+rrnhZ1Cs5vN6ijmn7Q162/ThZq9+YNW3MbfvDAOed5cxdGL+RFaUPKQtjI8DVAr66/u9i6+jJzTXm+HFEVqxVYBD4SNZNKzk109HxoycPaG0bIeugVDTp4hH2qdXJDu6xOAAWiuQoQdLHhvY1aEZSVdInG7+Q9EvSz9RrUKqgV0PP3Vz7gvqCOsUj+CxC9LB1Dc8AAAASdEVYdEVYSUY6T3JpZW50YXRpb24AMYRY7O8AAAAASUVORK5CYII=",
        type: "default",
        onClick: () => {
            this.passwordMode_NewPassword = this.passwordMode_NewPassword === "text" ? "password" : "text";
        }
    };
    this.passwordButton_confirm_NewPassword = {
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7klEQVRYw+2YP0tcQRTFz65xFVJZpBBS2O2qVSrRUkwqYfUDpBbWQu3ELt/HLRQ/Q8RCGxVJrRDEwj9sTATxZ/Hugo4zL/NmV1xhD9xi59177pl9986fVwLUSyi/tYC+oL6gbuNDYtyUpLqkaUmfJY3a+G9JZ5J2JW1J2ivMDBSxeWCfeBxYTHSOWMcRYLOAEBebxtEVQWPASQdi2jgxro4E1YDTQIJjYM18hszGbew4EHNq/kmCvgDnHtI7YBko58SWgSXg1hN/btyFBM0AlwExczG1YDZrMS4uLUeUoDmgFfjLGwXEtG05wNXyTc4NXgzMCOAIGHD8q0ATuDZrempkwGJ9+AfUQ4K+A/eEseqZ/UbgdUw4fqs5vPeW+5mgBvBAPkLd8cPju+341P7D/WAaJGCdOFQI14kr6o/zvBKZYz11L5Okv5KGA89Kzu9K0b0s5ZXt5PjuOL6TRV5ZalFP4F+rrnhZ1Cs5vN6ijmn7Q162/ThZq9+YNW3MbfvDAOed5cxdGL+RFaUPKQtjI8DVAr66/u9i6+jJzTXm+HFEVqxVYBD4SNZNKzk109HxoycPaG0bIeugVDTp4hH2qdXJDu6xOAAWiuQoQdLHhvY1aEZSVdInG7+Q9EvSz9RrUKqgV0PP3Vz7gvqCOsUj+CxC9LB1Dc8AAAASdEVYdEVYSUY6T3JpZW50YXRpb24AMYRY7O8AAAAASUVORK5CYII=",
        type: "default",
        onClick: () => {
            this.passwordMode_confirm_NewPassword = this.passwordMode_confirm_NewPassword === "text" ? "password" : "text";
        }
    };
  }
  backClicked() {
      this._location.back();
  }
  ngAfterViewInit(): void {

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
  getisDisabled(){
    if(this.disableResendOTP == true){
      return 'isDisabled';
    }
    else{
      return 'notDisabled';
    }
  }
  ngOnDestroy(): void {

}
  OnValidateOTP_click(){
    this.loadingSwitchService.loading = true;
    var UserOTP = {
        UserName: this.forgotPasswordForm.get('UserName').value,
        OTP: this.userOTPValidateForm.get('OTP').value
      }
      this.partyService.ResetOTPValidate(UserOTP).subscribe((data:any)=>{
        if (data.Errors == undefined) {
          this.loadingSwitchService.loading = false;
            this.Token=data.Token;
            this.UserId=data.UserId;
            this.OTPValidatedVisible=true;
            this.OTPValidated='OTP Validated Successfully';
            this.SMSOTPType=undefined;
            this.passwordEntry=true;
        }
      });
  }

  OnSave_Click(){
    this.loadingSwitchService.loading = true;
    var ResetPassword = {
        UserId: this.UserId,
        Password:this.passwordEntryForm.get('NewPassword').value,
        Token:this.Token
      }
      this.partyService.ResetPassword(ResetPassword).subscribe((data:any)=>{
        this.loadingSwitchService.loading = false;
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
    this.registrationService.ResendUserOTP(UserName).subscribe((data: any) => {
      if (data.Errors == undefined) {
        this.SMSOTPType = 'Please enter OTP And Submit';
      }
    });
  }
}
