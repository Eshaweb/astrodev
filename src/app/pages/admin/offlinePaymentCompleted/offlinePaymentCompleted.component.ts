import { Component, ViewChild } from '@angular/core';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { DxDataGridComponent } from 'devextreme-angular';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/Services/AdminService/AdminService';


@Component({
    templateUrl: 'offlinePaymentCompleted.component.html',
    styleUrls: [ './offlinePaymentCompleted.component.scss' ]
  })
  
  export class OfflinePaymentCompletedComponent {
    dataSource: any;
    @ViewChild(DxDataGridComponent) public datagridDeliveredList: DxDataGridComponent;  
    offlinePaymentListSearchForm: FormGroup;
    billPayModes: any;
    dateinDateFormat: Date;
    
    constructor(public formBuilder:FormBuilder,public adminService:AdminService, public loadingSwitchService:LoadingSwitchService) {
        this.dateinDateFormat = new Date();
        this.offlinePaymentListSearchForm=this.formBuilder.group({
            From: new Date(),
            To: new Date()
          });   
    }
    onToolbarPreparing (e) { 
        
        var toolbarItems = e.toolbarOptions.items;
         
        toolbarItems.forEach(function(item) {
            
               item.visible = false;
            
        });
    }

    OnSearch_click(){
        this.loadingSwitchService.loading=true;
        var AuthorizedPaymentList={
            From:this.offlinePaymentListSearchForm.controls['From'].value,
            To:this.offlinePaymentListSearchForm.controls['To'].value,
        }
        this.adminService.AuthorizedPaymentList(AuthorizedPaymentList).subscribe((data:any)=>{
            if (data.Errors == undefined) {
             this.dataSource=data;
            }
            this.loadingSwitchService.loading=false;
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
  }