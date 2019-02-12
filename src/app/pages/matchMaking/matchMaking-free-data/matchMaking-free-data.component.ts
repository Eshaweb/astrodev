import { Component } from '@angular/core';
import { MatchMakingService } from 'src/Services/MatchMakingService/MatchMakingService';
import { CaptionDbService } from 'src/Services/CaptionService/captionDb.service';
import { MatchResponse } from 'src/Models/MatchMaking/match';


@Component({
    selector: 'app-matchMaking-free-data',
    templateUrl: './matchMaking-free-data.component.html',
    styleUrls: [ './matchMaking-free-data.component.scss' ]
  })
  
  export class MatchMakingFreeDataComponent {
  matchResponse: MatchResponse;
    constructor(public captionDbService:CaptionDbService, public matchMakingService: MatchMakingService) {
      this.matchResponse.Left=matchMakingService.matchResponse.Left;
      this.matchResponse.Right=matchMakingService.matchResponse.Right;
      this.matchResponse.Prediction=matchMakingService.matchResponse.Prediction;    
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
  }