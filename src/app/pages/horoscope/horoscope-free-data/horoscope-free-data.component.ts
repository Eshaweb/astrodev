import { Component, OnInit, ViewChildren } from '@angular/core';
import { ServiceInfo, HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { LoginService } from 'src/Services/login/login.service';
import { Location } from "@angular/common";
import { RegistrationService } from 'src/Services/registration/registration.service';
import { Caption } from 'src/Models/HoroScope/Caption';
import { HoroResponse } from 'src/Models/HoroScope/HoroResponse';
import { CaptionDbService } from 'src/Services/CaptionService/captionDb.service';
import { PrashnaFreeModel } from 'src/Models/Astamangala/prashnaFreeModel';
import { ItemService } from 'src/Services/ItemService/ItemService';

@Component({
  selector: 'app-horoscope-free-data',
  templateUrl: './horoscope-free-data.component.html',
  styleUrls: ['./horoscope-free-data.component.scss']
})
export class HoroscopeFreeDataComponent implements OnInit {
  Shloka1: string;
  Shloka2: string;
  Name: string;
  Fathername: string;
  Mothername: string;
  ItMastId: any;
  serviceInfo: ServiceInfo[];
  horoRequest: HoroRequest;
  horoInfo: any;
  JanmaNakshathra: string;
  JanmaRashi: string;
  BirthPlace: string;
  SunRise: string;
  SunSet: string;
  DinaMana: string;
  ShakaVarsha: string;
  Kollam: string;
  Samvathsara: string;
  Aayana: string;
  ChandraMasa: string;
  Ruthu: string;
  SouraMasa: string;
  Paksha: string;
  MahaNakshatra: string;
  Tithi: string;
  NithyaNakshatra: string;
  ChandrarkaYoga: string;
  Karana: string;
  VishaGhati: string;
  AmrithaGhati: string;
  BDate: string;
  systemDate: string;
    horoModel: HoroRequest;
    caption: any;
    horoResponse: any;
  ngOnInit(): void {
    this.caption=new Caption();
    this.GetCaption(this.horoModel.LangCode, this.caption);
  }
  constructor(private itemService:ItemService,public captionDbService:CaptionDbService, public registrationService:RegistrationService,
    public _location: Location, public route: ActivatedRoute, public router: Router, 
    public platform: Platform, public loginService: LoginService, public horoScopeService: HoroScopeService) {
    
    this.horoModel=this.horoScopeService.horoRequest;
    this.horoResponse=new HoroResponse();
    this.horoResponse=this.horoScopeService.horoResponse
      this.Fathername = this.horoScopeService.Mothername;
      this.Mothername = this.horoScopeService.Fathername;
      this.BirthPlace = this.horoScopeService.birthplaceShort;
      this.systemDate=this.horoScopeService.systemDate;
      this.horoInfo = horoScopeService.horoRequest;
      this.Name = horoScopeService.horoRequest.Name;
      this.BDate = horoScopeService.horoRequest.Date
    //   this.Shloka1 = horoScopeService.data.Shloka1;
    //   this.Shloka2 = horoScopeService.data.Shloka2;
    //   this.JanmaNakshathra = horoScopeService.data.JanmaNakshathra;
    //   this.JanmaRashi = horoScopeService.data.JanmaRashi;
    //   this.SunRise = horoScopeService.data.SunRise;
    //   this.SunSet = horoScopeService.data.SunSet;
    //   this.DinaMana = horoScopeService.data.DinaMana;
    //   this.ShakaVarsha = horoScopeService.data.ShakaVarsha;
    //   this.Kollam = horoScopeService.data.Kollam;
    //   this.Samvathsara = horoScopeService.data.Samvathsara;
    //   this.Aayana = horoScopeService.data.Aayana;
    //   this.Ruthu = horoScopeService.data.Ruthu;
    //   this.ChandraMasa = horoScopeService.data.ChandraMasa;
    //   this.SouraMasa = horoScopeService.data.SouraMasa;
    //   this.Paksha = horoScopeService.data.Paksha;
    //   this.MahaNakshatra = horoScopeService.data.MahaNakshatra;
    //   this.Tithi = horoScopeService.data.Tithi;
    //   this.NithyaNakshatra = horoScopeService.data.NithyaNakshatra;
    //   this.ChandrarkaYoga = horoScopeService.data.ChandrarkaYoga;
    //   this.Karana = horoScopeService.data.Karana;
    //   this.VishaGhati = horoScopeService.data.VishaGhati;
    //   this.AmrithaGhati = horoScopeService.data.AmrithaGhati;
      
  }

  GetCaption(langCode:string,caption:Caption)
    {
     this.captionDbService.GetCaption(langCode,caption);
    }

  backClicked() {
      this._location.back();
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
  onClick() {
    this.itemService.ItActId='#SH';
      if (this.loginService.Token == null) {
          this.registrationService.registered=true;
          this.router.navigate(["/login-form"]);
      }
      else {
          // this.router.navigate(["/purchase/paidServices", { "PartyMastId": this.loginService.PartyMastId}]);
          this.router.navigate(["/purchase/paidServices"]);

      }
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {

  }

}
