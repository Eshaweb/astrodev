import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/shared/services/app.service';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { DxDataGridComponent } from 'devextreme-angular';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
    templateUrl: 'unusedPromoCodes.component.html',
    styleUrls: [ './unusedPromoCodes.component.scss' ]
  })
  
  export class UnUsedPromoCodesComponent {
    @ViewChild(DxDataGridComponent) public datagridBasePrice: DxDataGridComponent;  
    saveButtonName: string;
    allowUpdate: boolean;
    dataSource: any;
    popupVisible: boolean;
    AskMobileNoForm: FormGroup;
    Id: any;

    constructor(public formBuilder: FormBuilder, public router: Router, public itemService:ItemService, public loadingSwitchService:LoadingSwitchService) {
        this.itemService.GetUnUsedPromoCodes().subscribe((data:any)=>{
            if (data.Errors == undefined) {
                this.dataSource=data;
            }
          });
          
    this.saveButtonName='Edit'; 
    this.allowUpdate=false;   
    this.AskMobileNoForm=this.formBuilder.group({
        MobileNo:[null]
      }); 
    }
    onToolbarPreparing (e) { 
        
        var toolbarItems = e.toolbarOptions.items;
         
        toolbarItems.forEach(function(item) {
            
               item.visible = false;
            
        });
    }
    OnSend(promoItem){
        this.popupVisible=true;
        this.Id=promoItem.data.Id;
    }

    onCreatePromoCode(){
        this.router.navigate(["/admin/createPromoCode"]);
    }
    onSend_click() {
        this.popupVisible=false;
        this.loadingSwitchService.loading = true;
        var SendPromo = {
            Id: this.Id,
            MobileNo: this.AskMobileNoForm.controls['MobileNo'].value
        }
        this.itemService.SendPromoCode(SendPromo).subscribe((data: any) => {
            if (data.Errors == undefined) {
                if(data==true){
                    this.itemService.GetUnUsedPromoCodes().subscribe((data:any)=>{
                        if (data.Errors == undefined) {
                            this.dataSource=data;
                        }
                      });  
                }
                this.loadingSwitchService.loading = false;
            }
        });
    }

    onRowRemoving(event){
      this.itemService.DeletePromoCode(event.data.Id).subscribe((data:any)=>{
        this.loadingSwitchService.loading = false;
        if (data.Errors == undefined) {
              if(data==true){
                this.itemService.GetUnUsedPromoCodes().subscribe((data:any)=>{
                    if (data.Errors == undefined) {
                        this.dataSource=data;
                    }
                  }); 
              }
          }
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