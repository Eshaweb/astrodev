import { Component, OnInit, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { ServiceInfo, HoroScopeService, ServiceInformation } from 'src/Services/HoroScopeService/HoroScopeService';
import { LoginService } from 'src/Services/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { FormControlName } from '@angular/forms';
import { Location } from "@angular/common";
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
  horoInfo: any;
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
    public loginService: LoginService, public horoScopeService: HoroScopeService) {
      this.horoInfo = horoScopeService.horoRequest;
      var itemMast = {
          ItActId: "#SH",
          PartyMastId: loginService.PartyMastId,
      }
      this.horoScopeService.GetPriceListByItActId(itemMast, (data) => {
        if(data.Error==undefined){  
        this.serviceInfo = data;
    }
    else{
      this.errorMessage=data.Error;
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
      this.horoScopeService.GetItemPrice(hardCopyPriceRequest, (data) => {
          this.serviceHardCopy = data;
      });
  }

  onNext() {
      var orderModel = {
          FreeAmount: 0,
          ItemAmount: this.totalprice,
          PartyMastId: this.loginService.PartyMastId,
          //JSONData: this.horoInfo,
          JSONData: { Name: "Shamanth", Father: "Rajesh", Mother: "Leelavathi", Gothra: "Vasista", Date: "2018-12-21", EW: "W", Gender: "F", LatDeg: 17, LatMt: 24, LongDeg: 78, LongMt: 25, NS: "N", PN: "+", Time: "18:47:00", TimeFormat: "STANDARD", ZH: 5, ZM: 30 },
          //ItActId: "#SH",
          ItActId: this.horoScopeService.ItActId,
          ItMastId: '#HFH'
      }
      if (this.FH_HardcopySelected == true || this.MH_HardcopySelected == true || this.PH_HardcopySelected == true) {
          this.requireDeliveryAddress = true;
      }
      else {
          this.requireDeliveryAddress = false;
      }
      var DeliveryAddressRequired = this.requireDeliveryAddress;
      this.router.navigate(["/deliveryAddress", { 'DeliveryAddressRequired': DeliveryAddressRequired }]);
  }

  trackByFn(index, item) {    
    return item.id; // unique id corresponding to the item
 }

}
