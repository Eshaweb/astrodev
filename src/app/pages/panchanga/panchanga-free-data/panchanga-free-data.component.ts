import { Component } from '@angular/core';
import { CaptionDbService } from 'src/Services/CaptionService/captionDb.service';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { AstamangalaService } from 'src/Services/AstamanglaService/AstamanglaService';
import { PrashnaFreeModel } from 'src/Models/Astamangala/prashnaFreeModel';
import { LoginService } from 'src/Services/login/login.service';
import { Router } from '@angular/router';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { Caption } from 'src/Models/Caption';
import { PanchangaRequest } from 'src/Models/Panchanga/PanchangaRequest';
import { PanchangaService } from 'src/Services/PanchangaService/PanchangaService';
import { SerialisedPanchangaResponse } from 'src/Models/Panchanga/PanchangaResponse';


@Component({
    selector: 'app-panchanga-free-data',
    templateUrl: './panchanga-free-data.component.html',
    styleUrls: [ './panchanga-free-data.component.scss' ]
  })
  
  export class PanchangaFreeDataComponent {
  horoModel: HoroRequest;
  caption: Caption;
  prashnaFreeModel: PrashnaFreeModel;
  panchangaRequest: PanchangaRequest;
  serialisedPanchangaResponse: SerialisedPanchangaResponse;
    ngOnInit(): void {
      this.caption=new Caption();
      this.panchangaRequest=this.panchangaService.panchangaRequest;
      this.GetCaption(this.panchangaRequest.LangCode, this.caption);
    }
    constructor(private itemService:ItemService, public router: Router, public loginService: LoginService, 
      public captionDbService:CaptionDbService, public panchangaService: PanchangaService) {
      this.serialisedPanchangaResponse = JSON.parse(this.panchangaService.panchangaResponse.Panchanga);
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
  }
  