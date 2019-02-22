import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/shared/services/app.service';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { DxDataGridComponent } from 'devextreme-angular';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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

    constructor(public itemService: ItemService, public loadingSwitchService: LoadingSwitchService,
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


    saveRecords() {

        if (this.datagridBasePrice.instance.hasEditData()) {
            this.loadingSwitchService.loading = true;
            this.datagridBasePrice.instance.saveEditData();
            //alert(this.dataSource[0].MRP);
            var Item={
                
            }
            this.itemService.CreatePriceList(Item).subscribe((data: any) => {
                if (data.Errors == undefined) {
                    if (data == true) {
                        this.itemService.GetBasePrice().subscribe((data: any) => {
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
        else {
            this.saveButtonName = 'Save';
            this.allowUpdate = true;
        }

    }

    OnGenerate_click() {
        var Item = {
            Name:this.priceListForm.controls['Name'].value,
            Formula:this.priceListForm.controls['Formula'].value
        }
        this.itemService.GeneratePriceList(Item).subscribe((data: any) => {
            if (data.Errors == undefined) {
                this.dataSource = data;

            }
        });
    }
}