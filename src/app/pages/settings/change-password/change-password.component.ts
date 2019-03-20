
import { NgModule, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, ViewChild, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Location, CommonModule } from "@angular/common";
import { UIService } from 'src/Services/UIService/ui.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { RegistrationService } from 'src/Services/registration/registration.service';
import { RegisterModel } from 'src/Models/Register';
import { PartyService } from 'src/Services/PartyService/PartyService';
//import { EventsService } from 'angular4-events';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  public loading = false;
  value: string;
    popupVisible: boolean;
    uservalidateForm: FormGroup;
    OTPValidatedVisible: boolean;
    message: string;
    changePasswordSuccessful: boolean;
 
  public onDialogOKSelected(event) {
      event.dialog.close();
  }
  
  public progresChanged(progress) {

  }
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  changePasswordForm: FormGroup;
  mobilenoMessage: string;
  emailMessage: string;
  passwordMessage: string;
  confirm_PasswordMessage: string;
  refCodeMessage: string;
  isLoading: boolean;


  constructor(public registrationService:RegistrationService,public loadingSwitchService: LoadingSwitchService, public toastrService: ToastrManager, public uiService: UIService, public partyService: PartyService,
      public route: ActivatedRoute, public _location: Location,
      public router: Router, public formBuilder: FormBuilder) {
      this.changePasswordForm = this.formBuilder.group({
          OldPassword: ['', [Validators.required, Validators.minLength(4)]],
          NewPassword: ['', [Validators.required, Validators.minLength(4)]],
          confirm_NewPassword: ['', [Validators.required, Validators.minLength(4)]],
      }, { validator: this.matchingPasswords });

      const OldPasswordControl = this.changePasswordForm.get('OldPassword');
      OldPasswordControl.valueChanges.subscribe(value => this.setErrorMessage(OldPasswordControl));

      const NewPasswordControl = this.changePasswordForm.get('NewPassword');
      NewPasswordControl.valueChanges.subscribe(value => this.setErrorMessage(NewPasswordControl));

      const confirm_NewPasswordControl = this.changePasswordForm.get('confirm_NewPassword');
      confirm_NewPasswordControl.valueChanges.subscribe(value => this.setErrorMessage(confirm_NewPasswordControl));

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
      OldPassword_required: 'Enter Old Password',
      OldPassword_minlength: 'Minimum length is 4',

      NewPassword_required: 'Enter New Password',
      NewPassword_minlength: 'Minimum length is 4',

      OTP_required: 'Enter OTP',

      confirm_NewPassword_required: 'Re-Enter New Password',
      confirm_NewPassword_minlength: 'Minimum length is 4',
      confirm_NewPassword_invalid: 'Password doesnot match',

  };
  matchingPasswords(group: FormGroup) { // here we have the 'passwords' group
      let password = group.controls.NewPassword.value;
      let confirmpwd = group.controls.confirm_NewPassword.value;
      if (!password || !confirmpwd) {
          return null;
      }
      return password === confirmpwd ? null : { notSame: true }
  }
  OnSave_Click() {
      this.loadingSwitchService.loading = true;
      var ChangePassword = {
        OldPassword: this.changePasswordForm.get('OldPassword').value,
        NewPassword: this.changePasswordForm.get('NewPassword').value
      }
      this.partyService.ChangePassword(ChangePassword).subscribe((data) => {
          if (data== true) {
              this.loadingSwitchService.loading = false;
              this.changePasswordSuccessful=true;
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
//   ValidateUserByOTP(){
//     var UserOTP={
//           UserName: this.changePasswordForm.get('UserName').value,
//           OTP:this.uservalidateForm.get('OTP').value
//     }
//     this.registrationService.ValidateUserByOTP(UserOTP).subscribe((data:any)=>{
//         this.loadingSwitchService.loading = false;
//         if (data.Errors == undefined) {
//             this.OTPValidatedVisible=true;
//             //this.OTPValidated='OTP Validated Successfully';
//             //document.getElementById('message').innerHTML = 'OTP Validated Successfully';
//             this.router.navigate(["/login-form"]);
//         }
//     });
//   }
//   ResendOTP_click(){
//     var UserName = {
//       UserName: this.changePasswordForm.get('UserName').value
//     }
//     this.registrationService.ResendUserOTP(UserName).subscribe((data: any) => {
//         if (data.Errors == undefined) {
//           this.message = 'Please enter OTP And Submit';
//         }
//       });
//   }
  gotoServies(){
    this.router.navigate(["/services"]);
  }
}
