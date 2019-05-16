import { Component, OnInit, ViewChildren } from '@angular/core';
import { ServiceInfo, HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { Location } from "@angular/common";
import { RegistrationService } from 'src/Services/registration/registration.service';
import { HoroResponse } from 'src/Models/HoroScope/HoroResponse';
import { CaptionDbService } from 'src/Services/CaptionService/captionDb.service';
import { PrashnaFreeModel } from 'src/Models/Astamangala/prashnaFreeModel';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { Caption } from 'src/Models/Caption';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { LoginService } from 'src/Services/LoginService/LoginService';

@Component({
    selector: 'app-horoscope-free-data',
    templateUrl: './horoscope-free-data.component.html',
    styleUrls: ['./horoscope-free-data.component.scss']
})
export class HoroscopeFreeDataComponent implements OnInit {
    Name: string;
    horoInfo: any;
    horoModel: HoroRequest;
    caption: any;
    horoResponse: any;
    dffdg: boolean;
    
    constructor(public storageService: StorageService, private itemService: ItemService, public captionDbService: CaptionDbService,
        public _location: Location, public route: ActivatedRoute, public router: Router, public registrationService: RegistrationService,
        public platform: Platform, public loginService: LoginService, public horoScopeService: HoroScopeService) {
        this.itemService.BuyNowVisible=true;
        this.itemService.ItemName = 'Horoscope';
        this.dffdg=false;
        //this.horoModel=this.horoScopeService.horoRequest;
        this.horoModel = this.storageService.GetHoroRequest('#SH');
        this.horoResponse = new HoroResponse();
        //this.horoResponse=this.horoScopeService.horoResponse;
        this.horoResponse = this.storageService.GetHoroResponse('#SH');
    }
    ngOnInit(): void {
        this.caption = new Caption();
        this.GetCaption(this.horoModel.LangCode, this.caption);
        this.itemService.ItActId = '#SH';
        StorageService.SetItem('ItActId', '#SH');
    }
    ngOnDestroy(): void {
        this.itemService.BuyNowVisible=false;
    }
    GetCaption(langCode: string, caption: Caption) {
        this.captionDbService.GetCaption(langCode, caption);
    }

    backClicked() {
        this._location.back();
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
    // onClick() {
    //     this.itemService.ItActId = '#SH';
    //     StorageService.SetItem('ItActId', '#SH');
    //     if (StorageService.GetItem('refreshToken') == undefined) {
    //         this.registrationService.registered = true;
    //         this.router.navigate(["/login-form"]);
    //     }
    //     else {
    //         // this.router.navigate(["/purchase/paidServices", { "PartyMastId": this.loginService.PartyMastId}]);
    //         this.router.navigate(["/purchase/paidServices"]);

    //     }
    // }

}
