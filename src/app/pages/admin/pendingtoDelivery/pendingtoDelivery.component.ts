import { Component, ViewChild } from '@angular/core';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WizardComponent } from 'angular-archwizard';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { OrderService } from 'src/Services/OrderService/OrderService';
import { interval, Subscription } from 'rxjs';

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
  sub:Subscription;
  ItName: any;
    constructor(public storageService:StorageService,public orderService:OrderService,public horoScopeService:HoroScopeService,public formBuilder:FormBuilder,public itemService:ItemService, public loadingSwitchService:LoadingSwitchService) {
        this.loadingSwitchService.loading=true;
        this.itemService.GetPendingToDelvery(StorageService.GetItem('PartyMastId')).subscribe((data:any)=>{
            if (data.Errors == undefined) {
             this.dataSource=data;
            }
            this.loadingSwitchService.loading=false;
          }); 
          
          this.updateDeliveryForm=this.formBuilder.group({
            TrackingRef:[''],
            DispatchDate: new Date()
          });
    }
    onToolbarPreparing (e) { 
        
        var toolbarItems = e.toolbarOptions.items;
         
        toolbarItems.forEach(function(item) {
            
               item.visible = false;
            
        });
    }
    
    onItemClick(event){
        this.OrderId=event.itemData.OrderId;
        this.ItName=event.itemData.Service;
      }
   
      submit_click(){
        this.loadingSwitchService.loading=true;
          var UpdateDelivery={
              OrderId:this.OrderId,
              TrackingRef:this.updateDeliveryForm.controls['TrackingRef'].value,
              DispatchDate:this.updateDeliveryForm.controls['DispatchDate'].value
          }
          this.itemService.UpdateDelivery(UpdateDelivery).subscribe((data:any)=>{
            if(data==true){
                this.itemService.GetPendingToDelvery(StorageService.GetItem('PartyMastId')).subscribe((data:any)=>{
                    if (data.Errors == undefined) {
                     this.dataSource=data;
                     this.wizard.navigation.goToPreviousStep();
                    }
                    this.loadingSwitchService.loading=false;
                  });
            }
            this.loadingSwitchService.loading=false;
          });  
      }
      OnEnterStep(event){

      }
      OnExitStep(event){
          
    }

    onDownload_click(){
      this.loadingSwitchService.loading = true;
            this.orderService.CheckForResult(this.OrderId).subscribe((data) => {
                if (data.AstroReportId.length != 0) {
                    this.buttonId = data.AstroReportId[0].split('_')[0];
                    this.horoScopeService.DownloadResult(this.buttonId, (data) => {
                        var newBlob = new Blob([data], { type: "application/pdf" });
                        const fileName: string = this.ItName + '.pdf';
                        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
                        var url = window.URL.createObjectURL(newBlob);
                        a.href = url;
                        a.download = fileName;
                        document.body.appendChild(a);
                        this.loadingSwitchService.loading = false;
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                    });
                }
                else {
                    this.sub = interval(10000).subscribe((val) => {
                        this.orderService.CheckForResult(this.OrderId).subscribe((data) => {
                            if (data.AstroReportId.length != 0) {
                                this.buttonId = data.AstroReportId[0].split('_')[0];
                                this.horoScopeService.DownloadResult(this.buttonId, (data) => {
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

                        });
                    });

                }
            });
    }
  }