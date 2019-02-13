import { Component } from '@angular/core';
import { MatchMakingService } from 'src/Services/MatchMakingService/MatchMakingService';
import { CaptionDbService } from 'src/Services/CaptionService/captionDb.service';
import { MatchResponse } from 'src/Models/MatchMaking/match';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { Router } from '@angular/router';
import { LoginService } from 'src/Services/login/login.service';
import { MatchRequest } from 'src/Models/MatchMaking/MatchRequest';
import { Caption } from 'src/Models/Caption';


@Component({
    selector: 'app-matchMaking-free-data',
    templateUrl: './matchMaking-free-data.component.html',
    styleUrls: [ './matchMaking-free-data.component.scss' ]
  })
  
  export class MatchMakingFreeDataComponent {
  matchResponse: MatchResponse;
  caption: Caption;
  matchRequest: MatchRequest;
    constructor(private itemService:ItemService, public router: Router, public loginService: LoginService, 
      public captionDbService:CaptionDbService, public matchMakingService: MatchMakingService) {
      this.matchResponse=matchMakingService.matchResponse;
      this.caption=new Caption();
      this.matchRequest=this.matchMakingService.matchRequest;
      this.GetCaption(this.matchRequest.LangCode, this.caption);
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

    GetCaption(langCode:string,caption:Caption)
   {
    this.captionDbService.GetCaption(langCode,caption);
   }

   onClick() {
    this.itemService.ItActId='#SM';
      if (this.loginService.Token == null) {
          this.router.navigate(["/login-form"]);
      }
      else {
          this.router.navigate(["/purchase/paidServices"]);
      }
  }
  }