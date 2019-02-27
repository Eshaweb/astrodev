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

@Component({
    templateUrl: 'createPromoCode.component.html',
    styleUrls: [ './createPromoCode.component.scss' ]
  })
  
  export class CreatePromoCodeComponent implements OnInit {
  valueTypevalue: string;
  createPromoCodeForm: FormGroup;
  timeformatdata: ArrayStore;
  categoryListdata: ArrayStore;
  categoryListvalue: string;
  valueTypeData: ArrayStore;
  valueType=[
    {Id:1, Text:'Fixed'},
    {Id:2, Text:'Percentage'}];
  popupVisible: boolean;
  message: string;
    constructor(public loadingSwitchService: LoadingSwitchService, public itemService:ItemService,public formBuilder: FormBuilder){
      this.createPromoCodeForm=this.formBuilder.group({
        Amount: [null,[Validators.required]],
        ExpiryDate: new Date(),
        MobileNo:[null]
      });      
    }

    ngOnInit() {
      this.valueTypeData = new ArrayStore({
        data: this.valueType,
        key: "Id"
      });
    }
    valueTypeDataSelection(event){
      this.valueTypevalue=event.value;
    }
    onCreate_click() {
    this.loadingSwitchService.loading = true;
    var PromoModel = {
      Amount:this.createPromoCodeForm.controls['Amount'].value,
      ValueType:this.valueTypevalue,
      ExpDate:this.createPromoCodeForm.controls['ExpiryDate'].value,
      MobileNo:this.createPromoCodeForm.controls['MobileNo'].value
    }
    this.itemService.CreatePromoCode(PromoModel).subscribe((data: any) => {
      if (data.Errors == undefined) {
        if(data.Result==true){
          this.popupVisible = true;
          this.message='Your Request to Get Promo Code is granted. Promo Code is '+data.PromoCode;
        }
        this.loadingSwitchService.loading = false;
      }
    });

  }
  ClosePopUp(){
    this.popupVisible = false;
  }
}