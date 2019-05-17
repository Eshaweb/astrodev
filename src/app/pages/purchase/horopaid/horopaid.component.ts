import { Component, OnInit, ViewChildren, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { ServiceInfo, ServiceInformation, HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { AstamangalaService } from 'src/Services/AstamanglaService/AstamanglaService';
import { OrderService } from 'src/Services/OrderService/OrderService';
import { MatchMakingService } from 'src/Services/MatchMakingService/MatchMakingService';
import { NumerologyService } from 'src/Services/NumerologyService/NumerologyService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { MuhurthaService } from 'src/Services/MuhoorthaService/MuhoorthaService';
import { LoginService } from 'src/Services/LoginService/LoginService';


@Component({
    selector: 'app-horopaid',
    templateUrl: './horopaid.component.html',
    styleUrls: ['./horopaid.component.scss']
})
export class HoropaidComponent implements OnInit,AfterViewInit {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    @Input()
    service: ServiceInfo;
    serviceInfo: ServiceInfo[];
    checkBoxValue: boolean = false;
    requireDeliveryAddress: boolean;
    PartyMastId: any;
    SoftCopyDifference: number;
    HardCopyDifference: number;
    itemAmount: number;
    errorMessage: any;
    DeliveryAddressRequired: boolean;
    constructor(public storageService: StorageService, private muhurthaService: MuhurthaService, private numerologyService: NumerologyService, private matchMakingService: MatchMakingService,
        private orderService: OrderService, private astamangalaService: AstamangalaService, private itemService: ItemService,
        public _location: Location, public route: ActivatedRoute, public router: Router, public loadingSwitchService: LoadingSwitchService,
        public loginService: LoginService, public horoScopeService: HoroScopeService) {
        
    }

    ngOnInit(): void {
        this.SoftCopyDifference = this.service.MRP - this.service.Amount;
        this.HardCopyDifference = this.service.PrintMRP - this.service.PrintAmount;
    }
     
    ngAfterViewInit() {
        this.orderService.GetOrderIsDelivery(StorageService.GetItem('OrderId')).subscribe((data: any) => {
            this.DeliveryAddressRequired = data;
            if (this.DeliveryAddressRequired != undefined && StorageService.GetItem('ItMastId') != undefined) {
                if (StorageService.GetItem('ItMastId') == this.service.ItMastId) {
                    if (this.DeliveryAddressRequired==true){
                        this.checkBoxValue = true;
                    }
                    else{
                        this.checkBoxValue = false;
                    }
                }
            }
        });
        // if (StorageService.GetItem('IsDeliverable') != undefined && StorageService.GetItem('ItMastId') != undefined) {
        //     if (StorageService.GetItem('ItMastId') == this.service.ItMastId) {
        //         if (StorageService.GetItem('IsDeliverable')=='true'){
        //             this.checkBoxValue = true;
        //         }
        //         else{
        //             this.checkBoxValue = false;
        //         }
        //     }
        // }
    }
    backClicked() {
        this._location.back();
    }

    hardcopyRequired_Click(event, ItMastId) {
        if (event.value == false) {
            this.checkBoxValue = false;
        }
        else {
            this.checkBoxValue = true;
        }
        //StorageService.SetItem('IsDeliverable', event.value);
        StorageService.SetItem('ItMastId', ItMastId);
    }
    onSamplePDF(item) {
        this.loadingSwitchService.loading = true;
        if (this.storageService.GetHoroResponse('#SH') != undefined) {
            this.horoScopeService.horoRequest=this.storageService.GetHoroRequest('#SH')
            var HoroSample = {
                ItMastId: item.ItMastId,
                ReportSize:this.horoScopeService.horoRequest.ReportSize,
                LangCode: this.horoScopeService.horoRequest.LangCode
            }
        }
        else if (this.storageService.GetHoroResponse('#SA') != undefined) {
            this.astamangalaService.horoRequest=this.storageService.GetHoroRequest('#SA')
            var HoroSample = {
                ItMastId: item.ItMastId,
                ReportSize:this.astamangalaService.horoRequest.ReportSize,
                LangCode: this.astamangalaService.horoRequest.LangCode
            }
        }
        else if (this.storageService.GetHoroResponse('#MU') != undefined) {
            this.muhurthaService.muhurthaRequest=this.storageService.GetHoroRequest('#MU')
            var HoroSample = {
                ItMastId: item.ItMastId,
                ReportSize:this.muhurthaService.muhurthaRequest.ReportSize,
                LangCode: this.muhurthaService.muhurthaRequest.LangCode
            }
        }
        else if (this.storageService.GetHoroResponse('#SM') != undefined) {
            this.matchMakingService.matchRequest=this.storageService.GetHoroRequest('#MU')
            var HoroSample = {
                ItMastId: item.ItMastId,
                ReportSize:this.matchMakingService.matchRequest.ReportSize,
                LangCode: this.matchMakingService.matchRequest.LangCode
            }
        }
        else if (this.storageService.GetHoroResponse('#NM') != undefined) {
            this.numerologyService.numerologyRequest=this.storageService.GetHoroRequest('#MU')
            var HoroSample = {
                ItMastId: item.ItMastId,
                ReportSize:this.numerologyService.numerologyRequest.ReportSize,
                LangCode: this.numerologyService.numerologyRequest.LangCode
            }
        }
        this.horoScopeService.DownloadSample(HoroSample).subscribe((data: any) => {
            this.loadingSwitchService.loading = false;
            var newBlob = new Blob([data], { type: "application/pdf" });
            const fileName: string = item.Name+'.pdf';
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
        this.loadingSwitchService.loading = true;
        //this.horoScopeService.itemOrdered = item;
        this.storageService.SetItemOrdered(JSON.stringify(item));
        //this.horoScopeService.horoRequest.ReportType = item.ItMastId;
        if (this.checkBoxValue == false) {
            this.itemAmount = item.Amount;
            this.requireDeliveryAddress = false;
            this.horoScopeService.IsDeliverable = false;
            this.itemService.ItemAmount = item.Amount;
        }
        else {
            this.itemAmount = item.PrintAmount;
            this.requireDeliveryAddress = true;
            this.horoScopeService.IsDeliverable = true;
            this.itemService.ItemAmount = item.PrintAmount;
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
        if (this.storageService.GetHoroResponse('#SH') != undefined) {
            this.horoScopeService.horoRequest = this.storageService.GetHoroRequest('#SH');
            this.horoScopeService.horoRequest.ReportType = item.ItMastId;
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
        else if (this.storageService.GetHoroResponse('#SA') != undefined) {
            this.astamangalaService.horoRequest = this.storageService.GetHoroRequest('#SA');
            this.astamangalaService.horoRequest.ReportType = item.ItMastId;
            var orderModel = {
                IsDeliverable: this.checkBoxValue,
                FreeAmount: 0,
                ItemAmount: this.itemAmount,
                PartyMastId: StorageService.GetItem('PartyMastId'),
                JSONData: JSON.stringify(this.astamangalaService.horoRequest),
                ItActId: StorageService.GetItem('ItActId'),
                ItMastId: item.ItMastId,
                OrderId: this.orderService.OrderId
            }
        }
        else if (this.storageService.GetHoroResponse('#MU') != undefined) {
            var orderModel = {
                IsDeliverable: this.checkBoxValue,
                FreeAmount: 0,
                ItemAmount: this.itemAmount,
                PartyMastId: StorageService.GetItem('PartyMastId'),
                JSONData: JSON.stringify(this.storageService.GetHoroRequest('#MU')),
                ItActId: StorageService.GetItem('ItActId'),
                ItMastId: item.ItMastId,
                OrderId: this.orderService.OrderId
            }
        }
        else if (this.storageService.GetHoroResponse('#SM') != undefined) {
            var orderModel = {
                IsDeliverable: this.checkBoxValue,
                FreeAmount: 0,
                ItemAmount: this.itemAmount,
                PartyMastId: StorageService.GetItem('PartyMastId'),
                JSONData: JSON.stringify(this.storageService.GetHoroRequest('#SM')),
                ItActId: StorageService.GetItem('ItActId'),
                ItMastId: item.ItMastId,
                OrderId: this.orderService.OrderId
            }
        }
        else if (this.storageService.GetHoroResponse('#NM') != undefined) {
            var orderModel = {
                IsDeliverable: this.checkBoxValue,
                FreeAmount: 0,
                ItemAmount: this.itemAmount,
                PartyMastId: StorageService.GetItem('PartyMastId'),
                JSONData: JSON.stringify(this.storageService.GetHoroRequest('#NM')),
                ItActId: StorageService.GetItem('ItActId'),
                ItMastId: item.ItMastId,
                OrderId: this.orderService.OrderId
            }
        }
        //StorageService.SetItem('OrderId', orderModel.OrderId);
        this.orderService.CreateOrder(orderModel).subscribe((data) => {
            if (data.Error == undefined) {
                this.orderService.OrderId = data.OrderId;
                StorageService.SetItem('OrderId', data.OrderId);
                StorageService.SetItem('ExtCode', data.ExtCode);
                //this.orderService.orderResponse = data;
                this.storageService.SetOrderResponse(JSON.stringify(data));
                //   var FreePDF = {
                //       OrderId: this.orderService.orderResponse.OrderId.toString()
                //   }
                var FreePDF = {
                    OrderId: StorageService.GetItem('OrderId').toString()
                }
                this.loadingSwitchService.loading = false;
                // this.router.navigate(["/services/deliveryAddress", { 'DeliveryAddressRequired': DeliveryAddressRequired }]);
                this.router.navigate(["/purchase/deliveryAddress", { 'OrderId': FreePDF.OrderId }]);
            }
            else {
                this.errorMessage = data.Error;
            }
        });
    }

}
