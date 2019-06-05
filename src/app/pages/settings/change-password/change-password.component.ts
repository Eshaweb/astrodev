
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
 
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  changePasswordForm: FormGroup;
  mobilenoMessage: string;
  emailMessage: string;
  passwordMessage: string;
  confirm_PasswordMessage: string;
  refCodeMessage: string;
  isLoading: boolean;
    ShowPassword_checkBoxValue: boolean;
    textboxMode: string="password";
  passwordMode: string;
  passwordButton: any;


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

  ngOnInit(){
    this.ShowPassword_checkBoxValue=false;
    this.passwordMode = 'password';
    this.passwordButton = {
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7klEQVRYw+2YP0tcQRTFz65xFVJZpBBS2O2qVSrRUkwqYfUDpBbWQu3ELt/HLRQ/Q8RCGxVJrRDEwj9sTATxZ/Hugo4zL/NmV1xhD9xi59177pl9986fVwLUSyi/tYC+oL6gbuNDYtyUpLqkaUmfJY3a+G9JZ5J2JW1J2ivMDBSxeWCfeBxYTHSOWMcRYLOAEBebxtEVQWPASQdi2jgxro4E1YDTQIJjYM18hszGbew4EHNq/kmCvgDnHtI7YBko58SWgSXg1hN/btyFBM0AlwExczG1YDZrMS4uLUeUoDmgFfjLGwXEtG05wNXyTc4NXgzMCOAIGHD8q0ATuDZrempkwGJ9+AfUQ4K+A/eEseqZ/UbgdUw4fqs5vPeW+5mgBvBAPkLd8cPju+341P7D/WAaJGCdOFQI14kr6o/zvBKZYz11L5Okv5KGA89Kzu9K0b0s5ZXt5PjuOL6TRV5ZalFP4F+rrnhZ1Cs5vN6ijmn7Q162/ThZq9+YNW3MbfvDAOed5cxdGL+RFaUPKQtjI8DVAr66/u9i6+jJzTXm+HFEVqxVYBD4SNZNKzk109HxoycPaG0bIeugVDTp4hH2qdXJDu6xOAAWiuQoQdLHhvY1aEZSVdInG7+Q9EvSz9RrUKqgV0PP3Vz7gvqCOsUj+CxC9LB1Dc8AAAASdEVYdEVYSUY6T3JpZW50YXRpb24AMYRY7O8AAAAASUVORK5CYII=",
        type: "default",
        onClick: () => {
            this.passwordMode = this.passwordMode === "text" ? "password" : "text";
        }
    };
  }

  ShowPassword_Click(event) {
    if (event.value == true) {
      this.ShowPassword_checkBoxValue = true;
      this.textboxMode="text";
    }
    else {
      this.ShowPassword_checkBoxValue = false;
      this.textboxMode="password";
    }
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
  
  backClicked() {
      this._location.back();
  }
  ngAfterViewInit(): void {
  }
  ngOnDestroy(): void {

}

  gotoServies(){
    this.router.navigate(["/services"]);
  }
}
