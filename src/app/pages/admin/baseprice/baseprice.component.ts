import { Component, ViewChild } from '@angular/core';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { DxDataGridComponent } from 'devextreme-angular';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
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
    templateUrl: 'baseprice.component.html',
    styleUrls: ['./baseprice.component.scss']
})

export class BasePriceComponent {
    dataSource: BasePrice[];
    @ViewChild(DxDataGridComponent) public datagridBasePrice: DxDataGridComponent;
    saveButtonName: string;
    allowUpdate: boolean;
    typedata: ArrayStore;
    types: SelectBoxModel[] = [
        { Id: "#S", Text: "Services" },
        { Id: "#P", Text: "Products" }];
    typevalue: any;
    selectboxdisabled: boolean;
    constructor(public adminService: AdminService, public loadingSwitchService: LoadingSwitchService) {
        this.saveButtonName = 'Edit';
        this.allowUpdate = false;
        this.selectboxdisabled = false;
        this.typedata = new ArrayStore({
            data: this.types,
            key: "Id"
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
        var Type={
            Type:event.value
        }
        this.adminService.GetBasePrice(Type).subscribe((data: any) => {
            if (data.Errors == undefined) {
                this.dataSource = data;
            }
        });
    }
    saveRecords() {
        if (this.datagridBasePrice.instance.hasEditData()) {
            this.loadingSwitchService.loading = true;
            this.datagridBasePrice.instance.saveEditData();
            //alert(this.dataSource[0].MRP);
            this.adminService.UpdateBasePrice(this.dataSource).subscribe((data: any) => {
                if (data.Errors == undefined) {
                    if (data == true) {
                        var Type={
                            Type:this.typevalue
                        }
                        this.adminService.GetBasePrice(Type).subscribe((data: any) => {
                            if (data.Errors == undefined) {
                                this.dataSource = data;
                                this.saveButtonName = 'Edit';
                                this.allowUpdate = false;
                                this.selectboxdisabled = false;
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
            this.selectboxdisabled = true;
        }

    }
}