import { Component } from '@angular/core';
import { CaptionDbService } from 'src/Services/CaptionService/captionDb.service';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { PrashnaFreeModel } from 'src/Models/Astamangala/prashnaFreeModel';
import { Router } from '@angular/router';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { Caption } from 'src/Models/Caption';
import { PanchangaRequest } from 'src/Models/Panchanga/PanchangaRequest';
import { PanchangaService } from 'src/Services/PanchangaService/PanchangaService';
import { SerialisedPanchangaResponse } from 'src/Models/Panchanga/PanchangaResponse';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { LoginService } from 'src/Services/LoginService/LoginService';


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
  slideshowDelay = 2000;
  isMobileResolution: boolean;
  direction: string;
  
    ngOnInit(): void {
      this.caption=new Caption();
      //this.panchangaRequest=this.panchangaService.panchangaRequest;
      this.panchangaRequest=this.storageService.GetHoroRequest('#PA');
      this.GetCaption(this.panchangaRequest.LangCode, this.caption);
      if (window.innerWidth < 768) {
        this.isMobileResolution = true;
        this.direction="vertical";
      } else {
        this.isMobileResolution = false;
        this.direction="horizontal";
      }
      this.itemService.ItActId = '#PAN';
      StorageService.SetItem('ItActId', '#PAN');
      this.itemService.BuyNowVisible=true;
      this.itemService.ItemName = 'Panchanga';
    }
    constructor(public storageService:StorageService,private itemService:ItemService, public router: Router, public loginService: LoginService, 
      public captionDbService:CaptionDbService, public panchangaService: PanchangaService) {
      //this.serialisedPanchangaResponse = JSON.parse(this.panchangaService.panchangaResponse.Panchanga);
      this.serialisedPanchangaResponse=JSON.parse(this.storageService.GetHoroResponse('#PA').Panchanga);
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

  ngOnDestroy(): void {
    this.itemService.BuyNowVisible=false;
}
  }
  