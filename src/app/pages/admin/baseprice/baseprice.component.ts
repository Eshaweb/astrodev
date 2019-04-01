import { Component, ViewChild } from '@angular/core';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { DxDataGridComponent } from 'devextreme-angular';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { AdminService } from 'src/Services/AdminService/AdminService';
export class BasePrice {
    Id: string;
    Description: string;
    MRP: number;
    PrintMRP: number;
}


@Component({
    templateUrl: 'baseprice.component.html',
    styleUrls: [ './baseprice.component.scss' ]
  })
  
  export class BasePriceComponent {
    dataSource: BasePrice[];
    @ViewChild(DxDataGridComponent) public datagridBasePrice: DxDataGridComponent;  
    saveButtonName: string;
    allowUpdate: boolean;

    constructor(public adminService:AdminService, public loadingSwitchService:LoadingSwitchService) {
        this.adminService.GetBasePrice().subscribe((data:any)=>{
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
            this.adminService.UpdateBasePrice(this.dataSource).subscribe((data: any) => {
                if (data.Errors == undefined) {
                    if (data == true) {
                        this.adminService.GetBasePrice().subscribe((data: any) => {
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