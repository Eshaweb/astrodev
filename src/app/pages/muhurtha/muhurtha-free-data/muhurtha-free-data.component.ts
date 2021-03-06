import { Component } from '@angular/core';
import { CaptionDbService } from 'src/Services/CaptionService/captionDb.service';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { PrashnaFreeModel } from 'src/Models/Astamangala/prashnaFreeModel';
import { Router } from '@angular/router';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { Caption } from 'src/Models/Caption';
import { SerialisedPanchangaResponse } from 'src/Models/Panchanga/PanchangaResponse';
import { MuhurthaRequest } from 'src/Models/Muhurtha/MuhurthaRequest';
import { MuhurthaService } from 'src/Services/MuhoorthaService/MuhoorthaService';
import { MuhurthaResponse } from 'src/Models/Muhurtha/MuhurthaResponse';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { RegistrationService } from 'src/Services/registration/registration.service';
import { LoginService } from 'src/Services/LoginService/LoginService';


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
  showErrorMessage: string;
    
    constructor(public storageService:StorageService, private registrationService:RegistrationService,private itemService:ItemService, public router: Router, public loginService: LoginService, 
      public captionDbService:CaptionDbService, public muhurthaService: MuhurthaService) {
        //this.muhurthaResponse=muhurthaService.muhurthaResponse;
        this.muhurthaResponse=this.storageService.GetHoroResponse('#MU');
        if(this.muhurthaResponse.Buy!=false){
          this.itemService.BuyNowVisible=true;
          this.itemService.ItemName = 'Muhurtha';
          this.itemService.ItActId='#MU';
          StorageService.SetItem('ItActId','#MU');
        }
        else{
          this.showErrorMessage="Sorry..There are no Muhurthas for the given Date Range";
        }
    }
    ngOnInit(): void {
      this.caption=new Caption();
      //this.muhurthaRequest=this.muhurthaService.muhurthaRequest;
      this.muhurthaRequest=this.storageService.GetHoroRequest('#MU');
      this.GetCaption(this.muhurthaRequest.LangCode, this.caption);
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
  // onClick() {
  //   this.itemService.ItActId='#MU';
  //   StorageService.SetItem('ItActId','#MU');
  //     if (StorageService.GetItem('refreshToken')==undefined) {
  //         this.registrationService.registered=true;
  //         this.router.navigate(["/login-form"]);
  //     }
  //     else {
  //         // this.router.navigate(["/purchase/paidServices", { "PartyMastId": this.loginService.PartyMastId}]);
  //         this.router.navigate(["/purchase/paidServices"]);

  //     }
  // }
  }
  