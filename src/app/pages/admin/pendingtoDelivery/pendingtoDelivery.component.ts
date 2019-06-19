import { Component, ViewChild } from '@angular/core';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WizardComponent } from 'angular-archwizard';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { OrderService } from 'src/Services/OrderService/OrderService';
import { interval, Subscription } from 'rxjs';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
import ArrayStore from 'devextreme/data/array_store';

@Component({
    templateUrl: 'pendingtoDelivery.component.html',
    styleUrls: [ './pendingtoDelivery.component.scss' ]
  })
  
  export class PendingtoDeliveryComponent {
    dataSource: any;
    @ViewChild(WizardComponent) public wizard: WizardComponent;
    updateDeliveryForm: FormGroup;
    OrderId: any;
    buttonId: any;
    sub: Subscription;
    ItName: string;
    ExtCode: string;
    typedata: ArrayStore;
    types: SelectBoxModel[] = [
        { Id: "#S", Text: "Services" },
        { Id: "#P", Text: "Products" }];
    typevalue: string;
    constructor(public storageService: StorageService, public orderService: OrderService, public horoScopeService: HoroScopeService, public formBuilder: FormBuilder, public itemService: ItemService, public loadingSwitchService: LoadingSwitchService) {
        this.typedata = new ArrayStore({
            data: this.types,
            key: "Id"
          });

          this.updateDeliveryForm = this.formBuilder.group({
            TrackingRef: [''],
            DispatchDate: new Date()
        });
    }

    ngOnInit() {
        
    }

    onToolbarPreparing (e) { 
        
        var toolbarItems = e.toolbarOptions.items;
         
        toolbarItems.forEach(function(item) {
            
               item.visible = false;
            
        });
    }
    
    OnTypeSelection(event) {
        this.typevalue = event.value;
        this.loadingSwitchService.loading = true;
        var PendingToDelveryRequest = {
            Type: this.typevalue
        }
        this.itemService.GetPendingToDelvery(PendingToDelveryRequest).subscribe((data: any) => {
            if (data.Errors == undefined) {
                this.dataSource = data;
            }
            this.loadingSwitchService.loading = false;
        });
    }
    OnAmountClick(){
        //alert("hello");
    }
    onItemClick(event){
        this.OrderId=event.itemData.OrderId;
        this.ItName=event.itemData.Service;
        this.ExtCode=event.itemData.ExtCode;
      }
   
    submit_click() {
        this.loadingSwitchService.loading = true;
        var UpdateDelivery = {
            OrderId: this.OrderId,
            TrackingRef: this.updateDeliveryForm.controls['TrackingRef'].value,
            DispatchDate: this.updateDeliveryForm.controls['DispatchDate'].value
        }
        this.itemService.UpdateDelivery(UpdateDelivery).subscribe((data: any) => {
            if (data == true) {
                this.itemService.GetPendingToDelvery(this.typevalue).subscribe((data: any) => {
                    if (data.Errors == undefined) {
                        this.dataSource = data;
                        this.wizard.navigation.goToPreviousStep();
                    }
                    this.loadingSwitchService.loading = false;
                });
            }
            this.loadingSwitchService.loading = false;
        });
    }

    OnEnterStep(event) {

    }

    OnExitStep(event) {

    }

    onDownload_click() {
        this.loadingSwitchService.loading = true;
        this.orderService.CheckForResult(this.OrderId).subscribe((data) => {
            if (data.AstroReportId.length != 0) {
                this.buttonId = data.AstroReportId[0].split('_')[0];
                this.DownloadResult(this.buttonId);
            }
            else {
                this.sub = interval(10000).subscribe((val) => {
                    this.orderService.CheckForResult(this.OrderId).subscribe((data) => {
                        if (data.AstroReportId.length != 0) {
                            this.buttonId = data.AstroReportId[0].split('_')[0];
                            this.DownloadResult(this.buttonId);
                        }
                    });
                });
            }
        });
    }

    DownloadResult(buttonId) {
        this.horoScopeService.DownloadResult(buttonId).subscribe((data: any) => {
            var newBlob = new Blob([data], { type: "application/pdf" });
            const fileName: string = this.ItName + '.pdf';
            const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
            var url = window.URL.createObjectURL(newBlob);
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            this.loadingSwitchService.loading = false;
            this.storageService.RemoveDataFromSession();
            this.sub.unsubscribe();
        });
    }
  }