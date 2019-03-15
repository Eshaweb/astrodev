import { Component, NgModule, enableProdMode, NgZone, ChangeDetectorRef } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { Service } from 'src/app/shared/services/app.service';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { from, Subscription } from 'rxjs';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { PaymentInfo, ServiceInfo, HoroScopeService, SelectBoxModelNew } from 'src/Services/HoroScopeService/HoroScopeService';
import { PartyService } from 'src/Services/PartyService/PartyService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { UIService } from 'src/Services/UIService/ui.service';
import { ErrorService } from 'src/Services/Error/error.service';
import { MapsAPILoader } from '@agm/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import ArrayStore from 'devextreme/data/array_store';
import { AstamangalaService } from 'src/Services/AstamanglaService/AstamanglaService';
import { PanchangaService } from 'src/Services/PanchangaService/PanchangaService';
import { PanchangaRequest } from 'src/Models/Panchanga/PanchangaRequest';
import { StorageService } from 'src/Services/StorageService/Storage_Service';


@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {
  isLoading: boolean;
  public loading = false;
  profileForm: FormGroup;
  statesOfIndia: SelectBoxModel[];
  statevalue: any;
  Id: any;
  MobileNoDisabled: boolean=true;
  EMailDisabled: boolean=true;
  statedata: ArrayStore;
  constructor(public loadingSwitchService: LoadingSwitchService, public toastr: ToastrManager, 
    public partyService: PartyService, public panchangaService: PanchangaService, public route: ActivatedRoute, 
    public formbuilder: FormBuilder, public formBuilder: FormBuilder,) {
    this.profileForm = this.formbuilder.group({
      Date: new Date(),
      Name: [''],
      language: ['', []],
      MobileNo: [''],
      EMail: [''],
      Address1: [''],
      Address2: [''],
      Address3: [''],
      PinCode: [''],
      ReferralCode:[''],
    });
    this.statesOfIndia = partyService.statesOfIndia;
      this.loadingSwitchService.loading = true;
      if (StorageService.GetItem('PartyMastId') != undefined) {
      this.partyService.GetProfile(StorageService.GetItem('PartyMastId')).subscribe((data: any) => {
        this.profileForm.controls['ReferralCode'].setValue(data.ReferralCode);
        this.Id = data.Id;
        this.profileForm.controls['Name'].setValue(data.Name);
        this.profileForm.controls['MobileNo'].setValue(data.Mobile);
        this.profileForm.controls['EMail'].setValue(data.EMail);
        this.profileForm.controls['Address1'].setValue(data.Address1);
        this.profileForm.controls['Address2'].setValue(data.Address2);
        this.profileForm.controls['Address3'].setValue(data.Address3);
        this.profileForm.controls['PinCode'].setValue(data.PinCode);
        this.statevalue=data.State;
        if (data.Mobile == null||data.Mobile == "") {
          this.MobileNoDisabled = false;
        }
        if (data.EMail == null||data.EMail == "") {
          this.EMailDisabled = false;
        }
        this.loadingSwitchService.loading = false;
      });
    }
  }
  statedataSelection(event) {
    this.statevalue = event.value;
  }
 
  ngOnInit() {
    this.statedata = new ArrayStore({
      data: this.statesOfIndia,
      key: "Id"
    });


  }
  ngAfterViewInit(): void {
    
  }

  ngOnDestroy(): void {

  }
  OnSave_click() {
    this.isLoading = true;
    this.loadingSwitchService.loading = true;
    var ProfileData = {
      Id: this.Id,
      Name: this.profileForm.controls['Name'].value,
      Mobile: this.profileForm.controls['MobileNo'].value,
      EMail: this.profileForm.controls['EMail'].value,
      Address1: this.profileForm.controls['Address1'].value,
      Address2: this.profileForm.controls['Address2'].value,
      Address3: this.profileForm.controls['Address3'].value,
      State:this.statevalue,
      PinCode: this.profileForm.controls['PinCode'].value
    }
    this.partyService.UpdateProfile(ProfileData).subscribe((data: any) => {
      this.loadingSwitchService.loading = false;
    });
  }

  public onDialogOKSelected(event) {
    event.dialog.close();
  }
}
