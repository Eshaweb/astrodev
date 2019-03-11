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
import { MuhurthaRequest } from 'src/Models/Muhurtha/MuhurthaRequest';
import { MuhurthaService } from 'src/Services/MuhoorthaService/MuhoorthaService';
import { MuhurthaResponse } from 'src/Models/Muhurtha/MuhurthaResponse';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { RegistrationService } from 'src/Services/registration/registration.service';


@Component({
    selector: 'app-muhurtha-free-data',
    templateUrl: './muhurtha-free-data.component.html',
    styleUrls: [ './muhurtha-free-data.component.scss' ]
  })
  
  export class MuhurthaFreeDataComponent {
  horoModel: HoroRequest;
  caption: Caption;
  prashnaFreeModel: PrashnaFreeModel;
  muhurthaRequest: MuhurthaRequest;
  muhurthaResponse: MuhurthaResponse;
  serialisedPanchangaResponse: SerialisedPanchangaResponse;
    ngOnInit(): void {
      this.caption=new Caption();
      //this.muhurthaRequest=this.muhurthaService.muhurthaRequest;
      this.muhurthaRequest=this.storageService.GetHoroRequest('#MU');
      this.GetCaption(this.muhurthaRequest.LangCode, this.caption);
    }
    constructor(public storageService:StorageService, private registrationService:RegistrationService,private itemService:ItemService, public router: Router, public loginService: LoginService, 
      public captionDbService:CaptionDbService, public muhurthaService: MuhurthaService) {
        //this.muhurthaResponse=muhurthaService.muhurthaResponse;
        this.muhurthaResponse=this.storageService.GetHoroResponse('#MU');
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
  onClick() {
    this.itemService.ItActId='#MU';
    StorageService.SetItem('ItActId','#MU');
      if (StorageService.GetItem('Token')==undefined) {
          this.registrationService.registered=true;
          this.router.navigate(["/login-form"]);
      }
      else {
          // this.router.navigate(["/purchase/paidServices", { "PartyMastId": this.loginService.PartyMastId}]);
          this.router.navigate(["/purchase/paidServices"]);

      }
  }
  }
  