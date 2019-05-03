import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { DxDataGridComponent } from 'devextreme-angular';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from 'src/Services/AdminService/AdminService';
import { PartyService } from 'src/Services/PartyService/PartyService';


@Component({
    templateUrl: 'unresolvedMessages.component.html',
    styleUrls: [ './unresolvedMessages.component.scss' ]
  })
  
  export class UnResolvedMessagesComponent {
    @ViewChild(DxDataGridComponent) public datagridBasePrice: DxDataGridComponent;  
    saveButtonName: string;
    allowUpdate: boolean;
    dataSource: any;
    popupVisible: boolean;
    AskMobileNoForm: FormGroup;
    Id: any;

    constructor(public formBuilder: FormBuilder, public router: Router, public adminService: AdminService,
        public partyService: PartyService, public loadingSwitchService: LoadingSwitchService) {
        // this.partyService.GetUsedPromoCodes().subscribe((data:any)=>{
        //     if (data.Errors == undefined) {
        //         this.dataSource=data;
        //     }
        //   });
        this.saveButtonName = 'Edit';
        this.allowUpdate = false;
        this.AskMobileNoForm = this.formBuilder.group({
            MobileNo: [null]
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
        // this.partyService.SendPromoCode(SendPromo).subscribe((data: any) => {
        //     if (data.Errors == undefined) {
        //         if(data==true){
        //             this.partyService.GetUnUsedPromoCodes().subscribe((data:any)=>{
        //                 if (data.Errors == undefined) {
        //                     this.dataSource=data;
        //                 }
        //               });  
        //         }
        //         this.loadingSwitchService.loading = false;
        //     }
        // });
    }

  
  }