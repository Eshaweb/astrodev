import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { DxDataGridComponent } from 'devextreme-angular';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from 'src/Services/AdminService/AdminService';


@Component({
    templateUrl: 'usedPromoCodes.component.html',
    styleUrls: [ './usedPromoCodes.component.scss' ]
  })
  
  export class UsedPromoCodesComponent {
    @ViewChild(DxDataGridComponent) public datagridBasePrice: DxDataGridComponent;  
    saveButtonName: string;
    allowUpdate: boolean;
    dataSource: any;
    popupVisible: boolean;
    AskMobileNoForm: FormGroup;
    Id: any;

    constructor(public formBuilder: FormBuilder, public router: Router, public adminService:AdminService,
        public itemService:ItemService, public loadingSwitchService:LoadingSwitchService) {
        this.itemService.GetUsedPromoCodes().subscribe((data:any)=>{
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

  
  }