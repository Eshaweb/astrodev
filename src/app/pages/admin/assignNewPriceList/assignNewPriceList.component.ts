import { Component, OnInit } from '@angular/core';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import ArrayStore from 'devextreme/data/array_store';
import { FormGroup, FormBuilder, } from '@angular/forms';
import { AdminService } from 'src/Services/AdminService/AdminService';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';



export class ComboBoxModel {
  Id: string;
  Name: string;
}
@Component({
  templateUrl: 'assignNewPriceList.component.html',
  styleUrls: ['./assignNewPriceList.component.scss']
})

export class AssignNewPriceListComponent implements OnInit {
  priceListvalue: string;
  assignNewPriceListForm: FormGroup;
  categoryListdata: ArrayStore;
  categoryListvalue: string;
  categoryList: ComboBoxModel[];
  priceListData: ArrayStore;
  priceList: ComboBoxModel[];
  popupVisible: boolean;
  typedata: ArrayStore;
  types: SelectBoxModel[] = [
    { Id: "#S", Text: "Services" },
    { Id: "#P", Text: "Products" }];
  typevalue: any;
  constructor(public loadingSwitchService: LoadingSwitchService, public adminService: AdminService, public formBuilder: FormBuilder) {
    this.assignNewPriceListForm = this.formBuilder.group({
      FromDate: new Date(),
      To: new Date()
    });
    this.typedata = new ArrayStore({
      data: this.types,
      key: "Id"
    });
    this.loadingSwitchService.loading = true;
    this.adminService.GetCategoryList().subscribe((data: any) => {
      if (data.Errors == undefined) {
        this.categoryList = data;
        this.categoryListdata = new ArrayStore({
          data: this.categoryList,
          key: "Id"
        });
      }
    });

  }

  ngOnInit() {

  }

  OnTypeSelection(event) {
    this.typevalue = event.value;
    var PriceListRequest = {
      Type: this.typevalue
    }
    this.adminService.GetPriceListSource(PriceListRequest).subscribe((data: any) => {
      if (data.Errors == undefined) {
        this.priceList = data;
        this.priceListData = new ArrayStore({
          data: this.priceList,
          key: "Id"
        });
        this.loadingSwitchService.loading = false;
      }
    });
  }
  priceListDataSelection(event) {
    this.priceListvalue = event.value;
  }
  categoryListdataSelection(event) {
    this.categoryListvalue = event.value;
  }

  OnSubmit_click() {
    this.loadingSwitchService.loading = true;
    var AssignPrice = {
      CategoryId: this.categoryListvalue,
      PriceListId: this.priceListvalue,
      From: this.assignNewPriceListForm.controls['FromDate'].value,
      To: this.assignNewPriceListForm.controls['To'].value,
      Type: this.typevalue
    }
    this.adminService.AssignPriceList(AssignPrice).subscribe((data: any) => {
      if (data.Errors == undefined) {
        if (data == true) {
          this.popupVisible = true;
        }
        this.loadingSwitchService.loading = false;
      }
    });

  }
  ClosePopUp() {
    this.popupVisible = false;
  }
}