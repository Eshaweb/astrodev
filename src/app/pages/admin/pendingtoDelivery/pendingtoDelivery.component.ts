import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/shared/services/app.service';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { DxDataGridComponent } from 'devextreme-angular';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WizardComponent } from 'angular-archwizard';

@Component({
    templateUrl: 'pendingtoDelivery.component.html',
    styleUrls: [ './pendingtoDelivery.component.scss' ]
  })
  
  export class PendingtoDeliveryComponent {
    dataSource: any;
    @ViewChild(WizardComponent) public wizard: WizardComponent;  
    updateDeliveryForm: FormGroup;
    OrderId: any;
    constructor(public formBuilder:FormBuilder,public itemService:ItemService, public loadingSwitchService:LoadingSwitchService) {
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
  }