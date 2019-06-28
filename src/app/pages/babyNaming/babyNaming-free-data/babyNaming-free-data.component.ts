import { Component } from '@angular/core';
import { CaptionDbService } from 'src/Services/CaptionService/captionDb.service';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { PrashnaFreeModel } from 'src/Models/Astamangala/prashnaFreeModel';
import { Router } from '@angular/router';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { Caption } from 'src/Models/Caption';
import { PanchangaService } from 'src/Services/PanchangaService/PanchangaService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { LoginService } from 'src/Services/LoginService/LoginService';
import { BabyNamingRequest } from 'src/Models/BabyNaming/BabyNamingRequest';
import { BabyNamingResponse } from 'src/Models/BabyNaming/BabyNamingResponse';


@Component({
  selector: 'app-babyNaming-free-data',
  templateUrl: './babyNaming-free-data.component.html',
  styleUrls: ['./babyNaming-free-data.component.scss']
})

export class BabyNamingFreeDataComponent {
  babyNamingRequest: BabyNamingRequest;
  babyNamingResponse: any[];
  slideshowDelay = 2000;
  isMobileResolution: boolean;
  direction: string;
  secondPreference: BabyNamingResponse[];
  firstPreference: BabyNamingResponse[];

  ngOnInit(): void {
    this.babyNamingRequest = this.storageService.GetHoroRequest('#BN');
    if (window.innerWidth < 768) {
      this.isMobileResolution = true;
      this.direction = "vertical";
    } else {
      this.isMobileResolution = false;
      this.direction = "horizontal";
    }
    this.itemService.ItActId = '#BN';
    StorageService.SetItem('ItActId', '#BN');
    this.itemService.BuyNowVisible = true;
    this.itemService.ItemName = 'Baby Naming';
  }
  constructor(public storageService: StorageService, private itemService: ItemService, public router: Router, public loginService: LoginService,
    public captionDbService: CaptionDbService, public panchangaService: PanchangaService) {
    this.babyNamingResponse = this.storageService.GetHoroResponse('#BN');
    for (var i = 0; i < this.babyNamingResponse.length; i++) {
      if (this.babyNamingResponse[i].Pref == 2) {
        if(this.secondPreference==undefined){
          this.secondPreference=[{Name:this.babyNamingResponse[i].Name,Meaning:this.babyNamingResponse[i].Meaning,Pref:this.babyNamingResponse[i].Pref}];
        }
        else{
          this.secondPreference.push(this.babyNamingResponse[i]);
        }
      }
      else if (this.babyNamingResponse[i].Pref == 1) {
        if(this.firstPreference==undefined){
          this.firstPreference=[{Name:this.babyNamingResponse[i].Name,Meaning:this.babyNamingResponse[i].Meaning,Pref:this.babyNamingResponse[i].Pref}];
        }
        else{
          this.firstPreference.push(this.babyNamingResponse[i]);
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.itemService.BuyNowVisible = false;
  }
}
