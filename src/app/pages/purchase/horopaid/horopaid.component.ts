import { Component, OnInit, ViewChildren, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { ServiceInfo, ServiceInformation, HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { LoginService } from 'src/Services/login/login.service';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { AstamangalaService } from 'src/Services/AstamanglaService/AstamanglaService';
import { OrderService } from 'src/Services/OrderService/OrderService';
import { MatchMakingService } from 'src/Services/MatchMakingService/MatchMakingService';
import { NumerologyService } from 'src/Services/NumerologyService/NumerologyService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { MuhurthaService } from 'src/Services/MuhoorthaService/MuhoorthaService';


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
  constructor(public storageService:StorageService,private muhurthaService:MuhurthaService,private numerologyService:NumerologyService,private matchMakingService:MatchMakingService,
    private orderService:OrderService,private astamangalaService:AstamangalaService,private itemService:ItemService ,
    public _location: Location, public route: ActivatedRoute, public router: Router, public loadingSwitchService:LoadingSwitchService,
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
      this.loading=true;
      if (this.checkBoxValue == false) {
          this.checkBoxValue = true;
          this.loading=false;
      }
      else {
          this.checkBoxValue = false;
          this.loading=false;
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


  onNext_click(item) {
    this.loadingSwitchService.loading=true; 
      this.horoScopeService.itemOrdered = item;
      //this.horoScopeService.horoRequest.ReportType = item.ItMastId;
      if (this.checkBoxValue == false) {
          this.itemAmount = item.Amount;
          this.requireDeliveryAddress = false;
          this.horoScopeService.IsDeliverable = false;
          this.itemService.ItemAmount=item.Amount;
      }
      else {
          this.itemAmount = item.PrintAmount;
          this.requireDeliveryAddress = true;
          this.horoScopeService.IsDeliverable = true;
          this.itemService.ItemAmount=item.PrintAmount;
      }
    //   if(this.horoScopeService.horoRequest!=undefined){
    //     this.horoScopeService.horoRequest.ReportType=item.ItMastId;
    //     var orderModel = {
    //         IsDeliverable: this.checkBoxValue,
    //         FreeAmount: 0,
    //         ItemAmount: this.itemAmount,
    //         PartyMastId: StorageService.GetItem('PartyMastId'),
    //         JSONData: JSON.stringify(this.horoScopeService.horoRequest),
    //         ItActId: this.itemService.ItActId,
    //         ItMastId: item.ItMastId,
    //         OrderId: this.orderService.OrderId
    //     }
    //   }
    //   else if(this.astamangalaService.horoRequest!=undefined){
    //     this.astamangalaService.horoRequest.ReportType=item.ItMastId;
    //     var orderModel = {
    //         IsDeliverable: this.checkBoxValue,
    //         FreeAmount: 0,
    //         ItemAmount: this.itemAmount,
    //         PartyMastId: StorageService.GetItem('PartyMastId'),
    //         JSONData:JSON.stringify(this.astamangalaService.horoRequest),
    //         ItActId: this.itemService.ItActId,
    //         ItMastId: item.ItMastId,
    //         OrderId: this.orderService.OrderId
    //     }
    //   }
    //   else if(this.muhurthaService.muhurthaRequest!=undefined){
    //     var orderModel = {
    //         IsDeliverable: this.checkBoxValue,
    //         FreeAmount: 0,
    //         ItemAmount: this.itemAmount,
    //         PartyMastId: StorageService.GetItem('PartyMastId'),
    //         JSONData:JSON.stringify(this.muhurthaService.muhurthaRequest),
    //         ItActId: this.itemService.ItActId,
    //         ItMastId: item.ItMastId,
    //         OrderId: this.orderService.OrderId
    //     }
    //   }
    //   else if(this.matchMakingService.matchRequest!=undefined){
    //     var orderModel = {
    //         IsDeliverable: this.checkBoxValue,
    //         FreeAmount: 0,
    //         ItemAmount: this.itemAmount,
    //         PartyMastId: StorageService.GetItem('PartyMastId'),
    //         JSONData:JSON.stringify(this.matchMakingService.matchRequest),
    //         ItActId: this.itemService.ItActId,
    //         ItMastId: item.ItMastId,
    //         OrderId: this.orderService.OrderId
    //     }
    //   }
    //   else if(this.numerologyService.numerologyRequest!=undefined){
    //     var orderModel = {
    //         IsDeliverable: this.checkBoxValue,
    //         FreeAmount: 0,
    //         ItemAmount: this.itemAmount,
    //         PartyMastId: StorageService.GetItem('PartyMastId'),
    //         JSONData:JSON.stringify(this.numerologyService.numerologyRequest),
    //         ItActId: this.itemService.ItActId,
    //         ItMastId: item.ItMastId,
    //         OrderId: this.orderService.OrderId
    //     }
    //   }
    if(this.storageService.GetHoroResponse('#SH')!=undefined){
        this.horoScopeService.horoRequest=this.storageService.GetHoroRequest('#SH');
        this.horoScopeService.horoRequest.ReportType=item.ItMastId;
        var orderModel = {
            IsDeliverable: this.checkBoxValue,
            FreeAmount: 0,
            ItemAmount: this.itemAmount,
            PartyMastId: StorageService.GetItem('PartyMastId'),
            JSONData: JSON.stringify(this.horoScopeService.horoRequest),
            ItActId: StorageService.GetItem('ItActId'),
            ItMastId: item.ItMastId,
            OrderId: this.orderService.OrderId
        }
      }
      else if(this.storageService.GetHoroResponse('#SA')!=undefined){
        this.astamangalaService.horoRequest=this.storageService.GetHoroRequest('#SA');
        this.astamangalaService.horoRequest.ReportType=item.ItMastId;
        var orderModel = {
            IsDeliverable: this.checkBoxValue,
            FreeAmount: 0,
            ItemAmount: this.itemAmount,
            PartyMastId: StorageService.GetItem('PartyMastId'),
            JSONData:JSON.stringify(this.astamangalaService.horoRequest),
            ItActId: StorageService.GetItem('ItActId'),
            ItMastId: item.ItMastId,
            OrderId: this.orderService.OrderId
        }
      }
      else if(this.storageService.GetHoroResponse('#MU')!=undefined){
        var orderModel = {
            IsDeliverable: this.checkBoxValue,
            FreeAmount: 0,
            ItemAmount: this.itemAmount,
            PartyMastId: StorageService.GetItem('PartyMastId'),
            JSONData:JSON.stringify(this.storageService.GetHoroRequest('#MU')),
            ItActId: StorageService.GetItem('ItActId'),
            ItMastId: item.ItMastId,
            OrderId: this.orderService.OrderId
        }
      }
      else if(this.storageService.GetHoroResponse('#SM')!=undefined){
        var orderModel = {
            IsDeliverable: this.checkBoxValue,
            FreeAmount: 0,
            ItemAmount: this.itemAmount,
            PartyMastId: StorageService.GetItem('PartyMastId'),
            JSONData:JSON.stringify(this.storageService.GetHoroRequest('#SM')),
            ItActId: StorageService.GetItem('ItActId'),
            ItMastId: item.ItMastId,
            OrderId: this.orderService.OrderId
        }
      }
      else if(this.storageService.GetHoroResponse('#NM')!=undefined){
        var orderModel = {
            IsDeliverable: this.checkBoxValue,
            FreeAmount: 0,
            ItemAmount: this.itemAmount,
            PartyMastId: StorageService.GetItem('PartyMastId'),
            JSONData:JSON.stringify(this.storageService.GetHoroRequest('#NM')),
            ItActId: StorageService.GetItem('ItActId'),
            ItMastId: item.ItMastId,
            OrderId: this.orderService.OrderId
        }
      }
      this.orderService.CreateOrder(orderModel).subscribe((data) => {
          if(data.Error==undefined){
          this.orderService.OrderId = data.OrderId;
          StorageService.SetItem('OrderId',data.OrderId);
          //this.orderService.orderResponse = data;
          this.storageService.SetOrderResponse(JSON.stringify(data));
        //   var FreePDF = {
        //       OrderId: this.orderService.orderResponse.OrderId.toString()
        //   }
        var FreePDF = {
            OrderId: StorageService.GetItem('OrderId').toString()
        }
          this.loadingSwitchService.loading=false; 
          // this.router.navigate(["/services/deliveryAddress", { 'DeliveryAddressRequired': DeliveryAddressRequired }]);
          this.router.navigate(["/purchase/deliveryAddress", { 'OrderId': FreePDF.OrderId }]);
      }
      else{
        this.errorMessage=data.Error;
      }
      });
  }


}
