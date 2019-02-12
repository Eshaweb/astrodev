import { Component } from '@angular/core';
import { MatchMakingService } from 'src/Services/MatchMakingService/MatchMakingService';
import { CaptionDbService } from 'src/Services/CaptionService/captionDb.service';
import { MatchResponse } from 'src/Models/MatchMaking/match';
import { Caption } from 'src/Models/HoroScope/Caption';


@Component({
    selector: 'app-matchMaking-free-data',
    templateUrl: './matchMaking-free-data.component.html',
    styleUrls: [ './matchMaking-free-data.component.scss' ]
  })
  
  export class MatchMakingFreeDataComponent {
  matchResponse: MatchResponse;
  caption: Caption;
  matchRequest: import("d:/shailesh_bhat/Angular2Projects/DevExtreme/WorkingFolder/Astrodev/src/Models/MatchMaking/MatchRequest").MatchRequest;
    constructor(public captionDbService:CaptionDbService, public matchMakingService: MatchMakingService) {
      this.matchResponse.Left=matchMakingService.matchResponse.Left;
      this.matchResponse.Right=matchMakingService.matchResponse.Right;
      this.matchResponse.Prediction=matchMakingService.matchResponse.Prediction;    
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
  }