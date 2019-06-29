
import { ViewChildren, ElementRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { UIService } from 'src/Services/UIService/ui.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { RegistrationService } from 'src/Services/registration/registration.service';
import { RegisterModel } from 'src/Models/Register';
import { timer } from 'rxjs';
import { take, map } from 'rxjs/operators';
//import { EventsService } from 'angular4-events';

@Component({
    selector: 'app-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    registrationForm: FormGroup;
    uservalidateForm: FormGroup;
    registerModel: RegisterModel;

    EMailOTPType: string="";
    SMSOTPType: string;
    value: string;
    isReffered: boolean;
    message: string;
    mobilenoMessage: string;
    emailMessage: string;
    passwordMessage: string;
    confirm_PasswordMessage: string;
    refCodeMessage: string;
    public currentValue: number;
    public interval: any;
    public maxvalue: number;
    OTPEntryFormVisible: boolean;
    OTPValidatedVisible: boolean;
    TandC_checkBoxValue: boolean = false;
    disableResendOTP: boolean;
    isLoading: boolean;
    NewsLetter_checkBoxValue: boolean = true;
    countDown;
    counter = 20;
    tick = 1000;
    Own: any;
    Ref: any;
    IntroParty_disabled: boolean=false;
    passwordMode_Password: string;
    passwordButton_Password: any;
    passwordMode_confirm_Password: string;
    passwordButton_confirm_Password: { icon: string; type: string; onClick: () => void; };
    passwordMode: string;
    passwordButton: { icon: string; type: string; onClick: () => void; };
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
        this.route.params.subscribe(params => {
            if(params['id']!="id"){
                this.registrationForm.controls['IntroParty'].setValue(params['id']);
                if(this.registrationForm.controls['IntroParty'].value.length==6){
                    this.IntroParty_disabled=true;
                }
            }
        });
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
    
        if (this.registrationService.registerModel != null) {
            this.registrationForm.controls['UserName'].setValue(this.registrationService.registerModel.UserName);
            this.registrationForm.controls['Password'].setValue(this.registrationService.registerModel.Password);
            this.registrationForm.controls['confirm_Password'].setValue(this.registrationService.registerModel.Password);
            this.registrationForm.controls['IntroParty'].setValue(this.registrationService.registerModel.IntroParty);
            this.TandC_checkBoxValue=this.registrationService.registerModel.TermsandConditions;
            this.NewsLetter_checkBoxValue=this.registrationService.registerModel.NewsLetter;
        } 
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
    ngOnInit() {
        this.passwordMode = 'password';
        this.passwordMode_Password = 'password';
        this.passwordMode_confirm_Password = 'password';
        this.passwordButton = {
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7klEQVRYw+2YP0tcQRTFz65xFVJZpBBS2O2qVSrRUkwqYfUDpBbWQu3ELt/HLRQ/Q8RCGxVJrRDEwj9sTATxZ/Hugo4zL/NmV1xhD9xi59177pl9986fVwLUSyi/tYC+oL6gbuNDYtyUpLqkaUmfJY3a+G9JZ5J2JW1J2ivMDBSxeWCfeBxYTHSOWMcRYLOAEBebxtEVQWPASQdi2jgxro4E1YDTQIJjYM18hszGbew4EHNq/kmCvgDnHtI7YBko58SWgSXg1hN/btyFBM0AlwExczG1YDZrMS4uLUeUoDmgFfjLGwXEtG05wNXyTc4NXgzMCOAIGHD8q0ATuDZrempkwGJ9+AfUQ4K+A/eEseqZ/UbgdUw4fqs5vPeW+5mgBvBAPkLd8cPju+341P7D/WAaJGCdOFQI14kr6o/zvBKZYz11L5Okv5KGA89Kzu9K0b0s5ZXt5PjuOL6TRV5ZalFP4F+rrnhZ1Cs5vN6ijmn7Q162/ThZq9+YNW3MbfvDAOed5cxdGL+RFaUPKQtjI8DVAr66/u9i6+jJzTXm+HFEVqxVYBD4SNZNKzk109HxoycPaG0bIeugVDTp4hH2qdXJDu6xOAAWiuQoQdLHhvY1aEZSVdInG7+Q9EvSz9RrUKqgV0PP3Vz7gvqCOsUj+CxC9LB1Dc8AAAASdEVYdEVYSUY6T3JpZW50YXRpb24AMYRY7O8AAAAASUVORK5CYII=",
            type: "default",
            onClick: () => {
                this.passwordMode = this.passwordMode === "text" ? "password" : "text";
            }
        };
        this.passwordButton_Password = {
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7klEQVRYw+2YP0tcQRTFz65xFVJZpBBS2O2qVSrRUkwqYfUDpBbWQu3ELt/HLRQ/Q8RCGxVJrRDEwj9sTATxZ/Hugo4zL/NmV1xhD9xi59177pl9986fVwLUSyi/tYC+oL6gbuNDYtyUpLqkaUmfJY3a+G9JZ5J2JW1J2ivMDBSxeWCfeBxYTHSOWMcRYLOAEBebxtEVQWPASQdi2jgxro4E1YDTQIJjYM18hszGbew4EHNq/kmCvgDnHtI7YBko58SWgSXg1hN/btyFBM0AlwExczG1YDZrMS4uLUeUoDmgFfjLGwXEtG05wNXyTc4NXgzMCOAIGHD8q0ATuDZrempkwGJ9+AfUQ4K+A/eEseqZ/UbgdUw4fqs5vPeW+5mgBvBAPkLd8cPju+341P7D/WAaJGCdOFQI14kr6o/zvBKZYz11L5Okv5KGA89Kzu9K0b0s5ZXt5PjuOL6TRV5ZalFP4F+rrnhZ1Cs5vN6ijmn7Q162/ThZq9+YNW3MbfvDAOed5cxdGL+RFaUPKQtjI8DVAr66/u9i6+jJzTXm+HFEVqxVYBD4SNZNKzk109HxoycPaG0bIeugVDTp4hH2qdXJDu6xOAAWiuQoQdLHhvY1aEZSVdInG7+Q9EvSz9RrUKqgV0PP3Vz7gvqCOsUj+CxC9LB1Dc8AAAASdEVYdEVYSUY6T3JpZW50YXRpb24AMYRY7O8AAAAASUVORK5CYII=",
            type: "default",
            onClick: () => {
                this.passwordMode_Password = this.passwordMode_Password === "text" ? "password" : "text";
            }
        };
        this.passwordButton_confirm_Password = {
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7klEQVRYw+2YP0tcQRTFz65xFVJZpBBS2O2qVSrRUkwqYfUDpBbWQu3ELt/HLRQ/Q8RCGxVJrRDEwj9sTATxZ/Hugo4zL/NmV1xhD9xi59177pl9986fVwLUSyi/tYC+oL6gbuNDYtyUpLqkaUmfJY3a+G9JZ5J2JW1J2ivMDBSxeWCfeBxYTHSOWMcRYLOAEBebxtEVQWPASQdi2jgxro4E1YDTQIJjYM18hszGbew4EHNq/kmCvgDnHtI7YBko58SWgSXg1hN/btyFBM0AlwExczG1YDZrMS4uLUeUoDmgFfjLGwXEtG05wNXyTc4NXgzMCOAIGHD8q0ATuDZrempkwGJ9+AfUQ4K+A/eEseqZ/UbgdUw4fqs5vPeW+5mgBvBAPkLd8cPju+341P7D/WAaJGCdOFQI14kr6o/zvBKZYz11L5Okv5KGA89Kzu9K0b0s5ZXt5PjuOL6TRV5ZalFP4F+rrnhZ1Cs5vN6ijmn7Q162/ThZq9+YNW3MbfvDAOed5cxdGL+RFaUPKQtjI8DVAr66/u9i6+jJzTXm+HFEVqxVYBD4SNZNKzk109HxoycPaG0bIeugVDTp4hH2qdXJDu6xOAAWiuQoQdLHhvY1aEZSVdInG7+Q9EvSz9RrUKqgV0PP3Vz7gvqCOsUj+CxC9LB1Dc8AAAASdEVYdEVYSUY6T3JpZW50YXRpb24AMYRY7O8AAAAASUVORK5CYII=",
            type: "default",
            onClick: () => {
                this.passwordMode_confirm_Password = this.passwordMode_confirm_Password === "text" ? "password" : "text";
            }
        };
    }
    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {
        this.registrationService.registered = true;
    }
    public changeIcon() {
        return this.interval ? "pause" : "play_arrow";
    }
    public onDialogOKSelected(event) {
        event.dialog.close();
    }
    goToTermsandConditions(){
        var registerModel = {
            UserName: this.registrationForm.get('UserName').value,
            Password: this.registrationForm.get('Password').value,
            IntroParty: this.registrationForm.get('IntroParty').value,
            NewsLetter: this.NewsLetter_checkBoxValue,
            TermsandConditions:this.TandC_checkBoxValue
        }
        this.registrationService.registerModel=registerModel;
        this.router.navigate(["/staticpages/TandC"]);
    }
    Register_Click() {
        this.loadingSwitchService.loading = true;
        this.counter = 20;
        var registerModel = {
            UserName: this.registrationForm.get('UserName').value,
            Password: this.registrationForm.get('Password').value,
            IntroParty: this.registrationForm.get('IntroParty').value,
            NewsLetter: this.NewsLetter_checkBoxValue
        }
        
        this.registrationService.UserName=registerModel.UserName;
        this.registrationService.RegisterParty(registerModel, (data) => {
            if (data.IsValid != undefined) {
                this.loadingSwitchService.loading = false;
                this.OTPEntryFormVisible = true;
                this.disableResendOTP = true;
                this.countDown = timer(0, this.tick).pipe(
                    take(this.counter),
                    map(() => 
                        --this.counter
                    ));
                if (data.OTPType == "E") {
                    //this.toastrService.successToastr('You Successfully registered. Please check your EMail and click on link we sent to verify your Account', 'Success!');
                    this.EMailOTPType = 'Please check your EMail. You have received a link to verify your Account';
                }
                else if (data.OTPType == "S") {
                    //this.toastrService.successToastr('You Successfully registered. Please check your SMS and enter OTP to verify your Account', 'Success!');
                    this.SMSOTPType = 'You will get an OTP. Please enter the OTP here';
                    //'OTP Sent to ' + oTPRequest.MobileNo + ' with Reference No. ' + data.OTPRef
                }
            }
            else{
                this.IntroParty_disabled=false;
            }
        });
    }


    onKeyDown() {
        this.disableResendOTP = true;
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
    backClicked() {
        this._location.back();
    }

    SubscibeNewsLetters_Click(event) {
        if (event.value == true) {
            this.NewsLetter_checkBoxValue = true;
        }
        else {
            this.NewsLetter_checkBoxValue = false;
        }
    }

    TandC_Click(event) {
        if (event.value == true) {
            this.TandC_checkBoxValue = true;
        }
        else {
            this.TandC_checkBoxValue = false;
        }
    }

    ValidateUserByOTP() {
        this.loadingSwitchService.loading = true;
        var UserOTP = {
            UserName: this.registrationForm.get('UserName').value,
            OTP: this.uservalidateForm.get('OTP').value
        }
        this.registrationService.ValidateUserByOTP(UserOTP).subscribe((data: any) => {
            this.loadingSwitchService.loading = false;
            if (data.Errors == undefined) {
                this.OTPValidatedVisible = true;
                if(this.registrationForm.get('IntroParty').value!=""){
                    if(data.Own!=0){
                        this.Own=data.Own;
                        this.Ref=data.Ref;
                        this.isReffered=true;
                    }
                }
                else{
                    if(data.Own!=0){
                        this.Own=data.Own;
                        this.isReffered=false;
                    }
                }
                //document.getElementById('message').innerHTML = 'OTP Validated Successfully';
                
            }
        });
    }
    ClosePopUp(){
        this.OTPValidatedVisible = false;
        this.router.navigate(["/login-form"]);
      }
    ResendOTP_click() {
        this.loadingSwitchService.loading=true;
        this.counter = 20;
        this.disableResendOTP = true;
        var UserName = {
            UserName: this.registrationForm.get('UserName').value
        }
        this.registrationService.ResendUserOTP(UserName).subscribe((data: any) => {
            if (data.Errors == undefined) {
                this.loadingSwitchService.loading=false;
                this.SMSOTPType = 'OTP Resent. Please enter OTP And Submit';
                this.countDown = timer(0, this.tick).pipe(
                    take(this.counter),
                    map(() => 
                        --this.counter
                    ));
            }
        });
    }
}
