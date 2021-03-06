import { Component } from '@angular/core';
import { MatchMakingService } from 'src/Services/MatchMakingService/MatchMakingService';
import { CaptionDbService } from 'src/Services/CaptionService/captionDb.service';
import { MatchResponse, Kuta } from 'src/Models/MatchMaking/match';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { Router } from '@angular/router';
import { MatchRequest } from 'src/Models/MatchMaking/MatchRequest';
import { Caption } from 'src/Models/Caption';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { LoginService } from 'src/Services/LoginService/LoginService';


@Component({
    selector: 'app-matchMaking-free-data',
    templateUrl: './matchMaking-free-data.component.html',
    styleUrls: [ './matchMaking-free-data.component.scss' ]
  })
  
  export class MatchMakingFreeDataComponent {
  matchResponse: MatchResponse;
  caption: Caption;
  matchRequest: MatchRequest;
  brideDetail:any;
  groomDetail:any;
    constructor(public storageService:StorageService, private itemService:ItemService, public router: Router, public loginService: LoginService, 
      public captionDbService:CaptionDbService, public matchMakingService: MatchMakingService) {
      //this.matchResponse=matchMakingService.matchResponse;
      this.matchResponse=this.storageService.GetHoroResponse('#SM');
      this.brideDetail=this.matchResponse.Left.splice(0,2);
      this.groomDetail=this.matchResponse.Right.splice(0,2);
      this.matchResponse.Left=this.matchResponse.Left;
      this.matchResponse.Right=this.matchResponse.Right;
      this.caption=new Caption();
      //this.matchRequest=this.matchMakingService.matchRequest;
      this.matchRequest=this.storageService.GetHoroRequest('#SM');
      this.GetCaption(this.matchRequest.LangCode, this.caption);
      this.itemService.BuyNowVisible=true;
      this.itemService.ItemName = 'Match Making';
      this.itemService.ItActId='#SM';
      StorageService.SetItem('ItActId','#SM');
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
   ngOnDestroy(): void {
    this.itemService.BuyNowVisible=false;
}
  //  onClick() {
    
  //     if (StorageService.GetItem('refreshToken')==undefined) {
  //         this.router.navigate(["/login-form"]);
  //     }
  //     else {
  //         this.router.navigate(["/purchase/paidServices"]);
  //     }
  // }
  }