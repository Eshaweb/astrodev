import { Component, OnInit, ViewChildren, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { ServiceInfo, ServiceInformation, HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { LoginService } from 'src/Services/login/login.service';


@Component({
  selector: 'app-horopaid',
  templateUrl: './horopaid.component.html',
  styleUrls: ['./horopaid.component.scss']
})
export class HoropaidComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  @Input()
  service: ServiceInfo;
  serviceInfo: ServiceInfo[];
  serviceInformation: ServiceInformation[];
  horoInfo: any;
  public loading = false;
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
  PartyMastId: any;
  serviceHardCopy: ServiceInfo[];
  SoftCopyDifference: number;
  HardCopyDifference: number;
  itemAmount: number;
  isLoading: boolean;
  errorMessage: any;
  constructor(public _location: Location, public route: ActivatedRoute, public router: Router,
      public loginService: LoginService, public horoScopeService: HoroScopeService) {
      this.serviceInformation = [{ ItMastId: '', Name: 'Horo', MRP: 33, Amount: 44, Description: '', PrintMRP: 6, PrintAmount: 5 }]
  }
  
  ngOnInit(): void {
      this.SoftCopyDifference = this.service.MRP - this.service.Amount;
      this.HardCopyDifference = this.service.PrintMRP - this.service.PrintAmount;
     
  }
  backClicked() {
      this._location.back();
  }
  
  hardcopyRequired_Click(event) {
      if (this.checkBoxValue == false) {
          this.checkBoxValue = true;
      }
      else {
          this.checkBoxValue = false;
      }
  }
  onSamplePDF(item) {
      var HoroSample = {
          ItMastId: item.ItMastId,
          LangCode: this.horoScopeService.horoRequest.LangCode
      }
      this.horoScopeService.GetSample(HoroSample).subscribe((data: any) => {
          var newBlob = new Blob([data], { type: "application/pdf" });
          const fileName: string = 'PDFSample.pdf';
          const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
          var url = window.URL.createObjectURL(newBlob);
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
      });

  }


  onNext(item) {
      this.loading = true;
      this.horoScopeService.itemOrdered = item;
      this.horoScopeService.horoRequest.ReportType = item.ItMastId;
      if (this.checkBoxValue == false) {
          this.itemAmount = item.Amount;
          this.requireDeliveryAddress = false;
          this.horoScopeService.IsDeliverable = false;
      }
      else {
          this.itemAmount = item.PrintAmount;
          this.requireDeliveryAddress = true;
          this.horoScopeService.IsDeliverable = true;
      }
      var orderModel = {
          IsDeliverable: this.checkBoxValue,
          FreeAmount: 0,
          ItemAmount: this.itemAmount,
          PartyMastId: this.loginService.PartyMastId,
          JSONData: this.horoScopeService.horoRequest,
          ItActId: this.horoScopeService.ItActId,
          ItMastId: item.ItMastId,
          OrderId: this.horoScopeService.OrderId
      }
      var DeliveryAddressRequired: boolean = this.requireDeliveryAddress;
      this.horoScopeService.CreateOrder(orderModel).subscribe((data) => {
          if(data.Error==undefined){
          this.horoScopeService.OrderId = data.OrderId;
          this.horoScopeService.orderResponse = data;
          var FreePDF = {
              OrderId: this.horoScopeService.OrderId.toString()
          }
          this.isLoading = false;  
          // this.router.navigate(["/services/deliveryAddress", { 'DeliveryAddressRequired': DeliveryAddressRequired }]);
          this.router.navigate(["/purchase/deliveryAddress", { 'OrderId': FreePDF.OrderId }]);
      }
      else{
        this.errorMessage=data.Error;
      }
      });
  }


}