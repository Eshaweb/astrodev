import { Component, ViewChild } from '@angular/core';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { DxDataGridComponent } from 'devextreme-angular';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';

@Component({
    templateUrl: 'offlinePaymentPending.component.html',
    styleUrls: [ './offlinePaymentPending.component.scss' ]
  })
  
  export class OfflinePaymentPendingComponent {
    dataSource: any;
    @ViewChild(DxDataGridComponent) public datagridBasePrice: DxDataGridComponent;  
    billPayModes: any;
    authorizeConfirmPopUp: boolean;
    OrderId: any;
    dateinDateFormat: Date;

    constructor(public itemService:ItemService, public loadingSwitchService:LoadingSwitchService) {
        this.dateinDateFormat = new Date();
        this.loadingSwitchService.loading=true;
        this.itemService.OfflinePaymentList().subscribe((data:any)=>{
            if (data.Errors == undefined) {
             this.dataSource=data;
            }
            this.loadingSwitchService.loading=false;
          });   
    }
    onToolbarPreparing (e) { 
        
        var toolbarItems = e.toolbarOptions.items;
         
        toolbarItems.forEach(function(item) {
            
               item.visible = false;
            
        });
    }
    

    selectionChanged(event) {
        event.component.collapseAll(-1); 
        //e.component.expandRow([e.key]);
        event.component.expandRow(event.currentSelectedRowKeys[0]);
        for(var i=0;i<this.dataSource.length;i++){
            this.billPayModes=this.dataSource[i].BillPayModes
         }
    }

    OnAuthorize_click(item) {
        this.authorizeConfirmPopUp=true;
       this.OrderId=item.data.OrderId;
    }

    OnYes_click(){
        var AuthorizePayment = {
            OrderId:this.OrderId
        }
        this.itemService.AuthorizePayment(AuthorizePayment).subscribe((data:any)=>{
            if (data.Errors == undefined) {
             this.dataSource=data;
            }
            this.loadingSwitchService.loading=false;
            this.authorizeConfirmPopUp=false;
          });  
    }
    OnNo_click(){
        this.authorizeConfirmPopUp=false;
    }
  }