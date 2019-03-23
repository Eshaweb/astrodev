import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/shared/services/app.service';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { DxDataGridComponent } from 'devextreme-angular';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
    templateUrl: 'deliveredList.component.html',
    styleUrls: [ './deliveredList.component.scss' ]
  })
  
  export class DeliveredListComponent {
    dataSource: any;
    @ViewChild(DxDataGridComponent) public datagridDeliveredList: DxDataGridComponent;  
    deliveredListSearchForm: FormGroup;
    dateinDateFormat: Date;
    
    constructor(public formBuilder:FormBuilder,public itemService:ItemService, public loadingSwitchService:LoadingSwitchService) {
        this.dateinDateFormat = new Date();
        this.deliveredListSearchForm=this.formBuilder.group({
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
        var DeliveredList={
            From:this.deliveredListSearchForm.controls['From'].value,
            To:this.deliveredListSearchForm.controls['To'].value,
        }
        this.itemService.DeliveredList(DeliveredList).subscribe((data:any)=>{
            if (data.Errors == undefined) {
             this.dataSource=data;
            }
            this.loadingSwitchService.loading=false;
          });   
    }
  }