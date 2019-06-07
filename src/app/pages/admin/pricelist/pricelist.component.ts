import { Component, ViewChild } from '@angular/core';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { DxDataGridComponent } from 'devextreme-angular';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AdminService } from 'src/Services/AdminService/AdminService';
import ArrayStore from 'devextreme/data/array_store';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';

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
    typedata: ArrayStore;
    types: SelectBoxModel[] = [
        { Id: "#S", Text: "Services" },
        { Id: "#P", Text: "Products" }];
    typevalue: any;
    Item: { Name: any; Formula: any; FormulaPDF: number; Type: any; };
    constructor(public adminService: AdminService, public loadingSwitchService: LoadingSwitchService,
        public formbuilder: FormBuilder) {

        this.saveButtonName = 'Edit';
        this.allowUpdate = false;
        this.typedata = new ArrayStore({
            data: this.types,
            key: "Id"
        });
        this.priceListForm = this.formbuilder.group({
            Name: ['', [Validators.required, Validators.minLength(4)]],
            Formula: ['', []],
            FormulaPDF:[null,[]]
        });
    }
    onToolbarPreparing(e) {

        var toolbarItems = e.toolbarOptions.items;

        toolbarItems.forEach(function (item) {

            item.visible = false;

        });
    }
    OnTypeSelection(event) {
        this.typevalue = event.value;
    }
    OnGenerate_click() {
        this.loadingSwitchService.loading = true;
        if(this.priceListForm.controls['FormulaPDF'].value!=null){
            this.Item = {
                Name:this.priceListForm.controls['Name'].value,
                Formula:this.priceListForm.controls['Formula'].value,
                FormulaPDF:this.priceListForm.controls['FormulaPDF'].value,
                Type: this.typevalue 
            }
        }
        else{
            this.Item = {
                Name:this.priceListForm.controls['Name'].value,
                Formula:this.priceListForm.controls['Formula'].value,
                FormulaPDF:0,
                Type: this.typevalue 
            }
        }
        this.adminService.GeneratePriceList(this.Item).subscribe((data: any) => {
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
                FormulaPDF:this.Item.FormulaPDF,
                GeneratedRateDets:this.dataSource,
                Type: this.typevalue 
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