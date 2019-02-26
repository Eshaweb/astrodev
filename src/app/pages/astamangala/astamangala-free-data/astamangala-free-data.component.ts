import { Component } from '@angular/core';
import { CaptionDbService } from 'src/Services/CaptionService/captionDb.service';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { AstamangalaService } from 'src/Services/AstamanglaService/AstamanglaService';
import { PrashnaFreeModel } from 'src/Models/Astamangala/prashnaFreeModel';
import { LoginService } from 'src/Services/login/login.service';
import { Router } from '@angular/router';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { Caption } from 'src/Models/Caption';
import { StorageService } from 'src/Services/StorageService/Storage_Service';


@Component({
    selector: 'app-astamangala-free-data',
    templateUrl: './astamangala-free-data.component.html',
    styleUrls: [ './astamangala-free-data.component.scss' ]
  })
  
  export class AstamangalaFreeDataComponent {
  horoModel: HoroRequest;
  caption: Caption;
  prashnaFreeModel: PrashnaFreeModel;
    ngOnInit(): void {
      this.caption=new Caption();
      this.horoModel=this.astamangalaService.horoRequest;
      this.GetCaption(this.horoModel.LangCode, this.caption);
    }
    constructor(private itemService:ItemService, public router: Router, public loginService: LoginService, public captionDbService:CaptionDbService, public astamangalaService: AstamangalaService) {
      this.prashnaFreeModel=this.astamangalaService.horoResponse;
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
    this.itemService.ItActId='#SA';
    if (StorageService.GetItem('Token')==undefined) {
        this.router.navigate(["/login-form"]);
    }
    else {
        // this.router.navigate(["/purchase/paidServices", { "PartyMastId": this.loginService.PartyMastId}]);
        this.router.navigate(["/purchase/paidServices"]);

    }
}
  }
  