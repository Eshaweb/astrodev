import { Component, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/Services/login/login.service';
import { CaptionDbService } from 'src/Services/CaptionService/captionDb.service';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { NumerologyService } from 'src/Services/NumerologyService/NumerologyService';
import { Caption } from 'src/Models/Caption';
import { NumerologyResponse, SerialseMonth } from 'src/Models/Numerology/numerologyResponse';
import { NumerologyRequest } from 'src/Models/Numerology/numerologyRequest';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UIService } from 'src/Services/UIService/ui.service';
import { RegistrationService } from 'src/Services/registration/registration.service';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { MatchMakingService } from 'src/Services/MatchMakingService/MatchMakingService';
import { AstamangalaService } from 'src/Services/AstamanglaService/AstamanglaService';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { Location } from "@angular/common";

@Component({
  selector: 'app-numerology-free-data',
  templateUrl: './numerology-free-data.component.html',
  styleUrls: ['./numerology-free-data.component.scss']
})
export class NumerologyFreeDataComponent implements OnInit {
    caption: Caption;
    numerologyResponse: NumerologyResponse;
    numerologyRequest: NumerologyRequest;
    serialseMonth:SerialseMonth[]=[];
  manthcaption:string;
  loginForm: FormGroup;
  isOTPRequested: boolean;
  message: string;
  title: string;
  popupVisible: boolean;
  needtoEnterOTP: boolean;
  oTPRef: any;
  isLoginByOTP: boolean;
  uservalidateForm: FormGroup;
      ngOnInit(): void {
        this.caption=new Caption();
        this.numerologyRequest=this.numerologyService.numerologyRequest;
        this.GetCaption(this.numerologyRequest.LangCode, this.caption);
      }
      constructor(public uiService: UIService, public formBuilder: FormBuilder, private itemService:ItemService, 
        public router: Router, public loginService: LoginService, public registrationService: RegistrationService,
        public loadingSwitchService: LoadingSwitchService, private matchMakingService: MatchMakingService, private astamangalaService: AstamangalaService,
        public authService: AuthService, public horoScopeService: HoroScopeService, 
        public _location: Location, 
        public captionDbService:CaptionDbService, public numerologyService: NumerologyService) {
        
            this.numerologyResponse=this.numerologyService.numerologyResponse;
            this.numerologyResponse.Predictions= this.numerologyService.numerologyResponse.Predictions;
            this.serialseMonth=JSON.parse(this.numerologyResponse.Month);
            this.manthcaption= this.serialseMonth[0].Caption;
           
        // this.loginForm = this.formBuilder.group({
        //   UserName: [8277033170, [Validators.required, Validators.minLength(8)]],
        //   Password: ['1234', [Validators.required, Validators.minLength(4)]]
        // });

        // const UserNameContrl = this.loginForm.get('UserName');
        // UserNameContrl.valueChanges.subscribe(value => this.setErrorMessage(UserNameContrl));

        // const PasswordControl = this.loginForm.get('Password');
        // PasswordControl.valueChanges.subscribe(value => this.setErrorMessage(PasswordControl));

        // this.uservalidateForm = this.formBuilder.group({
        //   OTP: ['', [Validators.required]]
        // });
        // const OTPControl = this.uservalidateForm.get('OTP');
        // OTPControl.valueChanges.subscribe(value => this.setErrorMessage(OTPControl));
  }
  // setErrorMessage(c: AbstractControl): void {
  //   let control = this.uiService.getControlName(c);
  //   document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
  //   if ((c.touched || c.dirty) && c.errors) {
  //     document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
  //   }
  // }
  // private validationMessages = {
  //   UserName_required: 'Enter UserName',
  //   UserName_minlength: 'Minimum length should be 8',

  //   Password_required: 'Enter Password',
  //   Password_minlength: 'Minimum length should be 3',
  // };
      GetCaption(langCode:string,caption:Caption)
     {
      this.captionDbService.GetCaption(langCode,caption);
     }
  
     getFont(LangCode) {
      switch (LangCode) {
        case "KAN":
          return "KannadaFont";
        case "ENG":
          return "EnglishFont";
        case "HIN":
          return "HindiFont";
          case "MAL":
          return "MalyalamFont";
          case "TAM":
          return "TamilFont";
      }
    }
    split (day:String): String
    {
      if(day!=undefined)
      {
      return day.split('-')[0];
      }
      return "";
    }
    
    GetBackColor (day:any)
    {
    
      if(day!=undefined)
      {
     return day.split('-')[1];
      }
     
    }
    GetForeColor (day:any)
    {
      if(day!=undefined)
      {
     
     return day.split('-')[3];
      
      }
    }
  onClick() {
    this.itemService.ItActId = '#NM';
    if (StorageService.GetItem('Token') == undefined) {
      this.router.navigate(["/login-form"]);
      //this.popupVisible=true;
    }
    else {
      this.router.navigate(["/purchase/paidServices"]);
    }
  }



//   signInWithGoogle(): void {
//     this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

//   }
//   signInWithFB() {
//     this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);

//   }
//   signOut(): void {
//     this.authService.signOut();
//   }

//   goToRegistration() {
//     this.registrationService.registered = true;
//     this.router.navigate(["/registration-form"]);
//   }
//   onRequestOTP() {
//     this.isOTPRequested = true;
//     if (this.loginForm.get('UserName').value == '') {
//       document.getElementById('err_UserName').innerHTML = 'Please Enter Mobile Number'
//     }
//     else{
//       var GetOTP={
//         MobileNo:this.loginForm.get('UserName').value
//       }
//       this.loginService.GetOTP(GetOTP).subscribe((data:any)=>{
//         this.loginService.oTPRef=data;
//         this.popupVisible=true;
//         this.title='Note';
//         this.message='You Received an OTP with Reference No.'+this.loginService.oTPRef
//       });
//     }
//   }
//   onRegenerateOTP() {

//   }
//   Login_Click() {
//     this.loadingSwitchService.loading = true;
//     if (this.isOTPRequested == false) {
//       const loginModel = {
//         UserName: this.loginForm.get('UserName').value,
//         Password: this.loginForm.get('Password').value
//       }
//       this.loginService.Login(loginModel).subscribe((data) => {
//         if (data.Errors == undefined) {
//           this.registrationService.registered = false;
//           this.loadingSwitchService.loading = false;
//           if (data.IsActivated == false) {
//             this.needtoEnterOTP = true;
//             this.title='Alert';
//             this.message= 'Please Enter OTP(since you loginnig for the first time)'
//           }
//           else if (data.IsActivated == true) {
//             this.loginService.PartyMastId = data.PartyMastId;
//             if(data.Token!=undefined&&data.PartyMastId!=undefined){
//               this.loginService.Token = data.Token;
//               this.loginService.Name = data.Name;
//               StorageService.SetItem('Token',data.Token);
//               StorageService.SetItem('PartyMastId',data.PartyMastId);
//               StorageService.SetItem('Name',data.Name);
//               if (this.horoScopeService.horoRequest != null || this.astamangalaService.horoRequest != null || this.matchMakingService.matchRequest != null || this.numerologyService.numerologyRequest != null) {
//                 this.router.navigate(["/purchase/paidServices"], { skipLocationChange: true });
//               }
//               else {
//                 this.loadingSwitchService.loading = false;
//                 if (this.loginService.path != undefined) {
//                   this.router.navigate([this.loginService.path]);
//                 }
//                 else{
//                   this.router.navigate(["/services"]);
//                 } 
//               }
//             }
//           }
//         }
//         else {
//           this.loadingSwitchService.loading = false;
          
//         }
//       });

//     }
//     else {
//       this.oTPRef = this.loginService.oTPRef;
//       const oTPModel = {
//         MobileNo: this.loginForm.get('UserName').value,
//         OTPRef: this.oTPRef,
//         OTP: this.loginForm.get('Password').value
//       }
//       this.loadingSwitchService.loading = false;
//       this.loginService.ValidateOTP(oTPModel).subscribe((data:any)=>{
//         this.loginService.PartyMastId = data.PartyMastId;
//         if(data.Token!=undefined&&data.PartyMastId!=undefined){
//           this.loginService.Token = data.Token;
//           StorageService.SetItem('Token',data.Token);
//           StorageService.SetItem('PartyMastId',data.PartyMastId);
//           if (this.horoScopeService.horoRequest != null || this.astamangalaService.horoRequest != null || this.matchMakingService.matchRequest != null || this.numerologyService.numerologyRequest != null) {
//             this.router.navigate(["/purchase/paidServices"]);
//           }
//           else {
//             this.loadingSwitchService.loading = false;
//             if (this.loginService.path != undefined) {
//               this.router.navigate([this.loginService.path]);
//             }
//             else{
//               this.router.navigate(["/services"]);
//             } 
//           }
//         }
//       });
//     }
//   }
//   backClicked() {
//     this._location.back();
//   }
//   goToLoginByOTP() {
//     this.isLoginByOTP = true;
//   }
  
//   ValidateUserByOTP() {
//     var UserOTP = {
//       UserName: this.loginForm.get('UserName').value,
//       OTP: this.uservalidateForm.get('OTP').value
//     }
//     this.registrationService.ValidateUserByOTP(UserOTP).subscribe((data: any) => {
//       if (data.Errors == undefined) {
//         this.popupVisible = true;
//         this.title= 'Thank you';
//         this.message = 'OTP Validated Successfully. Please Login';
//         this.needtoEnterOTP = false;
//       }
//     });
//   }
//   ResendOTP_click(){
//     var UserName = {
//       UserName: this.loginForm.get('UserName').value
//     }
//     this.registrationService.ResendUserOTP(UserName).subscribe((data: any) => {
//       if (data.Errors == undefined) {
//         this.title= 'Message';
//         this.message = 'Please enter OTP And Submit';
//       }
//     });
//   }
//   onBackClick() {
//     this.isOTPRequested = false;
//     document.getElementById('err_UserName').innerHTML = '';
//   }


}
