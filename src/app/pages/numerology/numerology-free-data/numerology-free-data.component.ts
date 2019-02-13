import { Component, OnInit, ViewChildren } from '@angular/core';
import { ServiceInfo, HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { LoginService } from 'src/Services/login/login.service';
import { Location } from "@angular/common";
import { RegistrationService } from 'src/Services/registration/registration.service';
import { HoroResponse } from 'src/Models/HoroScope/HoroResponse';
import { CaptionDbService } from 'src/Services/CaptionService/captionDb.service';
import { PrashnaFreeModel } from 'src/Models/Astamangala/prashnaFreeModel';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { NumerologyService } from 'src/Services/NumerologyService/NumerologyService';
import { Caption } from 'src/Models/Caption';
import { NumerologyResponse, SerialseMonth } from 'src/Models/Numerology/numerologyResponse';
import { NumerologyRequest } from 'src/Models/Numerology/numerologyRequest';

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
      ngOnInit(): void {
        this.caption=new Caption();
        this.numerologyRequest=this.numerologyService.numerologyRequest;
        this.GetCaption(this.numerologyRequest.LangCode, this.caption);
      }
      constructor(private itemService:ItemService, public router: Router, public loginService: LoginService, 
        public captionDbService:CaptionDbService, public numerologyService: NumerologyService) {
        
            this.numerologyResponse=this.numerologyService.numerologyResponse;
            this.serialseMonth=JSON.parse(this.numerologyResponse.Month);
            this.manthcaption= this.serialseMonth[0].Caption;
        }
  
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
      this.itemService.ItActId='#SN';
      if (this.loginService.Token == null) {
          this.router.navigate(["/login-form"]);
      }
      else {
          this.router.navigate(["/purchase/paidServices"]);
      }
  }
}
