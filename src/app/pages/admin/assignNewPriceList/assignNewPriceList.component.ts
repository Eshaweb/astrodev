import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import ArrayStore from 'devextreme/data/array_store';
import { FormGroup, FormBuilder, } from '@angular/forms';



export class ComboBoxModel{
  Id:string;
  Name:string;
}
@Component({
    templateUrl: 'assignNewPriceList.component.html',
    styleUrls: [ './assignNewPriceList.component.scss' ]
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
    constructor(public loadingSwitchService: LoadingSwitchService, public itemService:ItemService,public formBuilder: FormBuilder){
      this.assignNewPriceListForm=this.formBuilder.group({
        FromDate: new Date(),
        To: new Date()
      });
      this.loadingSwitchService.loading = true;
      this.itemService.GetCategoryList().subscribe((data:any)=>{
        if (data.Errors == undefined) {
         this.categoryList=data;
         this.categoryListdata = new ArrayStore({
          data: this.categoryList,
          key: "Id"
        });
        }
      });
      this.itemService.GetPriceListSource().subscribe((data:any)=>{
        if (data.Errors == undefined) {
         this.priceList=data;
         this.priceListData = new ArrayStore({
          data: this.priceList,
          key: "Id"
        });
        this.loadingSwitchService.loading = false;
        }
      });
    }

    ngOnInit() {
      
    }
    priceListDataSelection(event){
      this.priceListvalue=event.value;
    }
    categoryListdataSelection(event){
      this.categoryListvalue=event.value;
    }

  OnSubmit_click() {
    this.loadingSwitchService.loading = true;
    var AssignPrice = {
      CategoryId:this.categoryListvalue,
      PriceListId:this.priceListvalue,
      From:this.assignNewPriceListForm.controls['FromDate'].value,
      To:this.assignNewPriceListForm.controls['To'].value
    }
    this.itemService.AssignPriceList(AssignPrice).subscribe((data: any) => {
      if (data.Errors == undefined) {
        if(data==true){
          this.popupVisible = true;
        }
        this.loadingSwitchService.loading = false;
      }
    });

  }
  ClosePopUp(){
    this.popupVisible = false;
  }
}