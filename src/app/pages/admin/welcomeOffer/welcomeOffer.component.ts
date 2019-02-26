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
    templateUrl: 'welcomeOffer.component.html',
    styleUrls: [ './welcomeOffer.component.scss' ]
  })
  
  export class WelcomeOfferComponent implements OnInit {
  welcomeOfferForm: FormGroup;
  popupVisible: boolean;
  saveButtonName: string;
  allowUpdate: boolean;
    constructor(public loadingSwitchService: LoadingSwitchService, public itemService:ItemService,public formBuilder: FormBuilder){
      this.welcomeOfferForm=this.formBuilder.group({
        Own: [null,[Validators.required]],
        Reff: [null]
      });
      this.loadingSwitchService.loading = true;
      this.itemService.GetGiftAmount().subscribe((data:any)=>{
        this.welcomeOfferForm.controls['Own'].setValue(data.Own);
        this.welcomeOfferForm.controls['Reff'].setValue(data.Reff);
      });
      this.saveButtonName='Edit'; 
      this.allowUpdate=true;    
    }

    ngOnInit() {
      
    }
    
  onSaveClick() {
    if (this.saveButtonName == 'Save') {
      this.loadingSwitchService.loading = true;
      var WO = {
        Own: this.welcomeOfferForm.controls['Own'].value,
        Reff: this.welcomeOfferForm.controls['Reff'].value
      }
      this.itemService.UpdateGiftAmount(WO).subscribe((data: any) => {
        if (data.Errors == undefined) {
          if (data == true) {
            this.popupVisible = true;
            this.saveButtonName = 'Edit';
            this.allowUpdate = true;
          }
          this.loadingSwitchService.loading = false;
        }
      });
    }
    else {
      this.saveButtonName = 'Save';
      this.allowUpdate = false;
    }
  }
  ClosePopUp(){
    this.popupVisible = false;
  }
}