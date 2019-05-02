import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { DxDataGridComponent } from 'devextreme-angular';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from 'src/Services/AdminService/AdminService';


@Component({
    templateUrl: 'unusedPromoCodes.component.html',
    styleUrls: [ './unusedPromoCodes.component.scss' ]
  })
  
  export class UnUsedPromoCodesComponent implements OnInit {
    
    @ViewChild(DxDataGridComponent) public datagridBasePrice: DxDataGridComponent;  
    saveButtonName: string;
    allowUpdate: boolean;
    dataSource: any;
    popupVisible: boolean;
    AskMobileNoForm: FormGroup;
    Id: any;

    constructor(public formBuilder: FormBuilder, public router: Router, public adminService:AdminService, 
        public itemService:ItemService, public loadingSwitchService:LoadingSwitchService) {
        
    this.AskMobileNoForm=this.formBuilder.group({
        MobileNo:[null]
      }); 
    }

    ngOnInit() {
        this.loadingSwitchService.loading = true;
        this.itemService.GetUnUsedPromoCodes().subscribe((data: any) => {
            if (data.Errors == undefined) {
                this.dataSource = data;
                this.loadingSwitchService.loading = false;
            }
        });
        this.saveButtonName = 'Edit';
        this.allowUpdate = false;
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
  }