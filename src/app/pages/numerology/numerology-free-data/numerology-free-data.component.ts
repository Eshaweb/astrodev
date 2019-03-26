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
  serialseMonth: SerialseMonth[] = [];
  manthcaption: string;
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
    this.caption = new Caption();
    //this.numerologyRequest = this.numerologyService.numerologyRequest;
    this.numerologyRequest=this.storageService.GetHoroRequest('#NM');
    this.GetCaption(this.numerologyRequest.LangCode, this.caption);
  }
  constructor(public storageService: StorageService, public uiService: UIService, public formBuilder: FormBuilder, private itemService: ItemService,
    public router: Router, public loginService: LoginService, public registrationService: RegistrationService,
    public loadingSwitchService: LoadingSwitchService, private matchMakingService: MatchMakingService, private astamangalaService: AstamangalaService,
    public authService: AuthService, public horoScopeService: HoroScopeService,
    public _location: Location,
    public captionDbService: CaptionDbService, public numerologyService: NumerologyService) {

    //this.numerologyResponse = this.numerologyService.numerologyResponse;
    this.numerologyResponse=this.storageService.GetHoroResponse('#NM');
    this.serialseMonth = JSON.parse(this.numerologyResponse.Month);
    this.manthcaption = this.serialseMonth[0].Caption;
  }
  GetCaption(langCode: string, caption: Caption) {
    this.captionDbService.GetCaption(langCode, caption);
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
  split(day: String): String {
    if (day != undefined) {
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
    StorageService.SetItem('ItActId', '#NM');
    if (StorageService.GetItem('Token') == undefined) {
      this.router.navigate(["/login-form"]);
      //this.popupVisible=true;
    }
    else {
      this.router.navigate(["/purchase/paidServices"]);
    }
  }
}

