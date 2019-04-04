import { Component, ViewChild } from '@angular/core';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { DxDataGridComponent } from 'devextreme-angular';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AdminService } from 'src/Services/AdminService/AdminService';
export class BasePrice {
    Id: string;
    Description: string;
    MRP: number;
    PrintMRP: number;
}


@Component({
    templateUrl: 'pricelist.component.html',
    styleUrls: ['./pricelist.component.scss']
})

export class PriceListComponent {
    dataSource: BasePrice[];
    @ViewChild(DxDataGridComponent) public datagridBasePrice: DxDataGridComponent;
    saveButtonName: string;
    allowUpdate: boolean;
    priceListForm: FormGroup;
    priceListUpdated: boolean=false;
    popupVisible: boolean;

    constructor(public adminService: AdminService, public loadingSwitchService: LoadingSwitchService,
        public formbuilder: FormBuilder) {
        // this.itemService.GetBasePrice().subscribe((data: any) => {
        //     if (data.Errors == undefined) {
        //         this.dataSource = data;

        //     }
        // });

        this.saveButtonName = 'Edit';
        this.allowUpdate = false;

        this.priceListForm = this.formbuilder.group({
            Name: ['', [Validators.required, Validators.minLength(4)]],
            Formula: ['', []]
        });
    }
    onToolbarPreparing(e) {

        var toolbarItems = e.toolbarOptions.items;

        toolbarItems.forEach(function (item) {

            item.visible = false;

        });
    }

    OnGenerate_click() {
        this.loadingSwitchService.loading = true;
        var Item = {
            Name:this.priceListForm.controls['Name'].value,
            Formula:this.priceListForm.controls['Formula'].value
        }
        this.adminService.GeneratePriceList(Item).subscribe((data: any) => {
            if (data.Errors == undefined) {
                this.priceListUpdated=true;
                this.dataSource = data;
            }
            this.loadingSwitchService.loading = false;
        // }, (error) => {
        //     if(error==''){

        //     }
        });
    }

    saveRecords() {
            this.loadingSwitchService.loading = true;
            var Item={
                Name:this.priceListForm.controls['Name'].value,
                Formula:this.priceListForm.controls['Formula'].value,
                GeneratedRateDets:this.dataSource
            }
            this.adminService.CreatePriceList(Item).subscribe((data: any) => {
                if (data.Errors == undefined) {
                    if (data == true) {
                        this.priceListUpdated=false;
                        this.popupVisible = true;
                    }
                    else{
                        this.priceListUpdated=true;
                    }
                    this.loadingSwitchService.loading = false;
                }
            });
    }

    ClosePopUp(){
        this.popupVisible = false;
      }
}