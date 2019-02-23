import { Component, ViewChild, NgZone, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import ArrayStore from 'devextreme/data/array_store';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UIService } from 'src/Services/UIService/ui.service';
import { PanchangaService } from 'src/Services/PanchangaService/PanchangaService';
import { PanchangaRequest } from 'src/Models/Panchanga/PanchangaRequest';
import { MapsAPILoader } from '@agm/core';
import { PartyService } from 'src/Services/PartyService/PartyService';
import { ToastrManager } from 'ng6-toastr-notifications';


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
  timeformatdata: ArrayStore;
  categoryListdata: ArrayStore;
  categoryListvalue: string;
  categoryList: ComboBoxModel[];
  priceListData: ArrayStore;
  priceList: ComboBoxModel[];
    constructor(public loadingSwitchService: LoadingSwitchService, public itemService:ItemService,public formBuilder: FormBuilder){
      this.assignNewPriceListForm=this.formBuilder.group({
        FromDate: new Date(),
        ToDate: new Date()
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

  submit_click() {
    this.loadingSwitchService.loading = true;
    var AssignPrice = {
      CategoryId:this.categoryListvalue,
      PriceListId:this.priceListvalue,
      From:this.assignNewPriceListForm.controls['FromDate'].value,
      To:this.assignNewPriceListForm.controls['ToDate'].value
    }
    this.itemService.AssignPriceList(AssignPrice).subscribe((data: any) => {
      if (data.Errors == undefined) {
        var gg = data;
        this.loadingSwitchService.loading = false;
      }
    });

  }
}