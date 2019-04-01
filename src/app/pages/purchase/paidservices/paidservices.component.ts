import { Component, OnInit, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { ServiceInfo, HoroScopeService, ServiceInformation } from 'src/Services/HoroScopeService/HoroScopeService';
import { ActivatedRoute, Router } from '@angular/router';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { FormControlName } from '@angular/forms';
import { Location } from "@angular/common";
import { ItemService } from 'src/Services/ItemService/ItemService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { LoginService } from 'src/Services/LoginService/LoginService';
@Component({
  selector: 'app-paidservices',
  templateUrl: './paidservices.component.html',
  styleUrls: ['./paidservices.component.scss']
})
export class PaidservicesComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  @ViewChildren('cmp') components: ElementRef;
  serviceInfo: ServiceInfo[];
  checkBoxValue: boolean = false;
  totalprice: number = 0;
  requireDeliveryAddress: boolean;
  PartyMastId: string;
  serviceHardCopy: ServiceInfo[];
  errorMessage: any;
  
  constructor(public _location: Location, public route: ActivatedRoute, public router: Router,
    public loginService: LoginService, public itemService: ItemService, public loadingSwitchService:LoadingSwitchService) {
        this.loadingSwitchService.loading=true; 
    //     var itemMast = {
    //       ItActId: itemService.ItActId,
    //       PartyMastId: StorageService.GetItem('PartyMastId'),
    //   }
    var itemMast = {
        ItActId: StorageService.GetItem('ItActId'),
        PartyMastId: StorageService.GetItem('PartyMastId'),
    }
    this.itemService.GetPriceListByItActId(itemMast).subscribe((data:any) => {
        if (data.Error == undefined) {
            this.serviceInfo = data;
        }
        else {
            this.errorMessage = data.Error;
        }
        this.loadingSwitchService.loading=false;
    });
    }
  ngOnInit(): void {
      /*
      */
  }
  ngAfterViewInit(){

}
  backClicked() {
    this._location.back();
}
  hardcopyRequired_Click(id) {
      var hardCopyPriceRequest={
          IsHardCopy:true,
          ItMastId: id,
          PartyMastId:this.PartyMastId,
          CountryCode:"IN"
      }
      this.itemService.GetItemPrice(hardCopyPriceRequest).subscribe((data) => {
          this.serviceHardCopy = data;
      });
  }

  trackByFn(index, item) {    
    return item.id; // unique id corresponding to the item
 }

}
