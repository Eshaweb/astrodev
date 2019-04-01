import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { UIService } from 'src/Services/UIService/ui.service';
import { PartyService } from 'src/Services/PartyService/PartyService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { LoginService } from 'src/Services/LoginService/LoginService';

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
    UserToken: { userid: any; Token: any; };
    message: string;
    passwordEntryForm: FormGroup;
    passwordEntry: boolean;
    popupVisible: boolean;
    PasswordUpdated: string;
    constructor(public loadingSwitchService:LoadingSwitchService,public loginService: LoginService, public formBuilder: FormBuilder, private partyService:PartyService,
        public route: ActivatedRoute, public router: Router, public uiService: UIService) {
        this.route.queryParams.subscribe(params => {
            this.UserToken = {
                userid: params['userid'],
                Token: params['token']
            }
        });
        this.passwordEntry = true;
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
    gotoLogin() {
        this.router.navigate(["/login-form"]);
    }
    OnSave_Click(){
        this.loadingSwitchService.loading = true;
        var ResetPassword = {
            UserId: this.UserToken.userid,
            Password:this.passwordEntryForm.get('NewPassword').value,
            Token:this.UserToken.Token
          }
          this.partyService.ResetPassword(ResetPassword).subscribe((data:any)=>{
            this.loadingSwitchService.loading = false;
            if (data.Errors == undefined) {
                this.popupVisible=true;
                this.PasswordUpdated='Password Changed Successfully';
                this.router.navigate(["/login-form"]);
            }
          });
    }
}
