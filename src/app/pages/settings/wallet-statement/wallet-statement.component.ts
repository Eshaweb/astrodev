import { Component, ViewChild } from '@angular/core';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { DxDataGridComponent } from 'devextreme-angular';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { WalletService } from 'src/Services/Wallet/WalletService';


@Component({
    templateUrl: 'wallet-statement.component.html',
    styleUrls: [ './wallet-statement.component.scss' ]
  })
  
  export class WalletStatementComponent {
    dataSource: any;
    @ViewChild(DxDataGridComponent) public datagridDeliveredList: DxDataGridComponent;  
    walletStatementSearchForm: FormGroup;
    billPayModes: any;
    dateinDateFormat: Date;
    walletBalanceAmount: any;
    
    constructor(public walletService:WalletService,public formBuilder:FormBuilder,public itemService:ItemService, public loadingSwitchService:LoadingSwitchService) {
        this.dateinDateFormat = new Date();
        this.walletStatementSearchForm=this.formBuilder.group({
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
        var WalletStatement={
            From:this.walletStatementSearchForm.controls['From'].value,
            To:this.walletStatementSearchForm.controls['To'].value,
            PartyMastId:StorageService.GetItem('PartyMastId')
        }
        this.walletService.WalletStatement(WalletStatement).subscribe((data:any)=>{
            if (data.Errors == undefined) {
             this.dataSource=data;
            }
                this.walletService.GetWalletBalance(StorageService.GetItem('PartyMastId')).subscribe((data) => {
                  if (data.Errors == undefined) {
                    this.walletBalanceAmount = data;
                  }
                });
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