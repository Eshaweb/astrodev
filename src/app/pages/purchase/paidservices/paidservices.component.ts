import { Component, OnInit, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { ServiceInfo, HoroScopeService, ServiceInformation } from 'src/Services/HoroScopeService/HoroScopeService';
import { LoginService } from 'src/Services/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { FormControlName } from '@angular/forms';
import { Location } from "@angular/common";
import { ItemService } from 'src/Services/ItemService/ItemService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
@Component({
  selector: 'app-paidservices',
  templateUrl: './paidservices.component.html',
  styleUrls: ['./paidservices.component.scss']
})
export class PaidservicesComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  @ViewChildren('cmp') components: ElementRef;
  serviceInfo: ServiceInfo[];
  serviceInformation: ServiceInformation[];
  horoRequest: HoroRequest;
  checkBoxValue: boolean = false;
  FH_PDFSelected: boolean = false;
  FH_HardcopySelected: boolean = false;
  MH_PDFSelected: boolean = false;
  MH_HardcopySelected: boolean = false;
  PH_PDFSelected: boolean = false;
  PH_HardcopySelected: boolean = false;
  FH_price: number = 0;
  MH_price: number = 0;
  PH_price: number = 0;
  totalprice: number = 0;
  requireDeliveryAddress: boolean;
  PartyMastId: string;
  serviceHardCopy: ServiceInfo[];
    errorMessage: any;
  ngAfterViewInit(){

}
  constructor(public _location: Location, public route: ActivatedRoute, public router: Router,
    public loginService: LoginService, public itemService: ItemService) {
      var itemMast = {
          ItActId: itemService.ItActId,
          PartyMastId: StorageService.GetItem('PartyMastId'),
      }
    this.itemService.GetPriceListByItActId(itemMast).subscribe((data:any) => {
        if (data.Error == undefined) {
            this.serviceInfo = data;
        }
        else {
            this.errorMessage = data.Error;
        }
    });
      //this.serviceInformation = [{ ItMastId: '', Name: 'Horo', MRP: 33, Amount: 44, Description: '',PrintMRP:6,PrintAmount:5 }]
    }
  ngOnInit(): void {
      /*
      */
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
