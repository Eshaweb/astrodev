import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/shared/services/app.service';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { DxDataGridComponent } from 'devextreme-angular';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
export class BasePrice {
    Id: string;
    Description: string;
    MRP: number;
    PrintMRP: number;
}


@Component({
    templateUrl: 'pendingtoDelivery.component.html',
    styleUrls: [ './pendingtoDelivery.component.scss' ]
  })
  
  export class PendingtoDeliveryComponent {
    dataSource: BasePrice[];
    @ViewChild(DxDataGridComponent) public datagridBasePrice: DxDataGridComponent;  
    saveButtonName: string;
    allowUpdate: boolean;

    constructor(public itemService:ItemService, public loadingSwitchService:LoadingSwitchService) {
        this.itemService.GetPendingToDelvery(StorageService.GetItem('PartyMastId')).subscribe((data:any)=>{
            if (data.Errors == undefined) {
             this.dataSource=data;
            }
          });
          
    this.saveButtonName='Edit'; 
    this.allowUpdate=false;       
    }
    onToolbarPreparing (e) { 
        
        var toolbarItems = e.toolbarOptions.items;
         
        toolbarItems.forEach(function(item) {
            
               item.visible = false;
            
        });
    }
    

    saveRecords(){
         
        if(this.datagridBasePrice.instance.hasEditData())
        {
            this.loadingSwitchService.loading = true;
            this.datagridBasePrice.instance.saveEditData();
            //alert(this.dataSource[0].MRP);
            this.itemService.UpdateBasePrice(this.dataSource).subscribe((data: any) => {
                if (data.Errors == undefined) {
                    if (data == true) {
                        this.itemService.GetBasePrice().subscribe((data: any) => {
                            if (data.Errors == undefined) {
                                this.dataSource = data;
                                this.saveButtonName = 'Edit';
                                this.allowUpdate = false;
                                this.loadingSwitchService.loading = false;
                            }
                        });
                    }

                }
            });
        }
        else{
            this.saveButtonName='Save'; 
            this.allowUpdate=true;  
        }
     
    }
  }