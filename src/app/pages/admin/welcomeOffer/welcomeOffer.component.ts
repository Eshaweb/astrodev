import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/Services/AdminService/AdminService';



@Component({
    templateUrl: 'welcomeOffer.component.html',
    styleUrls: [ './welcomeOffer.component.scss' ]
  })
  
  export class WelcomeOfferComponent implements OnInit {
  welcomeOfferForm: FormGroup;
  popupVisible: boolean;
  saveButtonName: string;
  allowUpdate: boolean;
    constructor(public loadingSwitchService: LoadingSwitchService, public adminService:AdminService,public formBuilder: FormBuilder){
      this.welcomeOfferForm=this.formBuilder.group({
        Own: [null,[Validators.required]],
        Reff: [null]
      });
      this.loadingSwitchService.loading = true;
      this.adminService.GetGiftAmount().subscribe((data:any)=>{
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
      this.adminService.UpdateGiftAmount(WO).subscribe((data: any) => {
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