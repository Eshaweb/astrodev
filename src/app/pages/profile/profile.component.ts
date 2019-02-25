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
  birthDateinDateFormat: Date;
  birthTimeinDateFormat: Date;
  errorMessage: any;
  subscription: Subscription;
  profileForm: FormGroup;
  panchangaRequest: PanchangaRequest;
  timeformatdata: ArrayStore;
  timeformatvalue: string;
  statesOfIndia: string[];
  statevalue: any;
  Id: any;
  MobileNoDisabled: boolean;
  EMailDisabled: boolean;
  ReferralCode: any;
  constructor(public loadingSwitchService: LoadingSwitchService, public toastr: ToastrManager, public route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef, public partyService: PartyService, public panchangaService: PanchangaService, public uiService: UIService,
    public formbuilder: FormBuilder) {
    this.maxDate = new Date(this.maxDate.setFullYear(this.maxDate.getFullYear() - 21));
    this.profileForm = this.formbuilder.group({
      Date: new Date(),
      Name: ['', [Validators.required]],
      language: ['', []],
      MobileNo: [''],
      EMail: [''],
      Address1: ['', [Validators.required, Validators.minLength(3)]],
      Address2: ['', [Validators.required, Validators.minLength(4)]],
      Address3: ['', [Validators.required, Validators.minLength(4)]],
      PinCode: ['', [Validators.required, Validators.minLength(6)]],
      //ReferralCode:[''],
      state: ['Andhra Pradesh', [Validators.required, Validators.minLength(4)]],
    });
    this.statesOfIndia = ['Andhra Pradesh', 'Arunachal Pradesh',
      'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
      'Himachal Pradesh', 'Jammu & Kashmir', 'Jharkhand', 'Karnataka',
      'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
      'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
      'Tamil Nadu', 'Telangana', 'Tripura', 'Uttarakhand', 'Uttar Pradesh',
      'West Bengal'];
    const birthPlaceContrl = this.profileForm.get('Name');
    birthPlaceContrl.valueChanges.subscribe(value => this.setErrorMessage(birthPlaceContrl));
    if (StorageService.GetItem('PartyMastId') != undefined) {
      this.partyService.GetProfile(StorageService.GetItem('PartyMastId')).subscribe((data: any) => {
        this.ReferralCode = data.ReferralCode;
        this.Id = data.Id;
        this.profileForm.controls['Name'].setValue(data.Name);
        this.profileForm.controls['MobileNo'].setValue(data.Mobile);
        this.profileForm.controls['EMail'].setValue(data.EMail);
        this.profileForm.controls['Address1'].setValue(data.Address1);
        this.profileForm.controls['Address2'].setValue(data.Address2);
        this.profileForm.controls['Address3'].setValue(data.Address3);
        this.profileForm.controls['PinCode'].setValue(data.PinCode);

        if (data.Mobile != null) {
          this.MobileNoDisabled = true;
        }
        if (data.EMail != null||data.EMail != "") {
          this.EMailDisabled = true;
        }
      });
    }
    if (this.panchangaService.panchangaRequest != null) {
      this.panchangaRequest = this.panchangaService.panchangaRequest;
      this.birthDateinDateFormat = this.panchangaService.DateinDateFormat;
      this.birthTimeinDateFormat = this.panchangaService.TimeinDateFormat;
      this.profileForm.controls['Name'].setValue(this.panchangaService.panchangaRequest.Place);
    }
    else {
      this.birthDateinDateFormat = this.profileForm.controls['Date'].value;
      this.profileForm.controls['ReferralCode'].setValue(this.ReferralCode);
      this.panchangaRequest = {
        Date: this.profileForm.controls['Date'].value,
        Time: null,
        Place: this.panchangaService.place,
        TimeFormat: this.timeformatvalue,
        LangCode: null,
        LatDeg: null,
        LatMt: null,
        LongDeg: null,
        LongMt: null,
        NS: null,
        EW: null,
        ZH: null,
        ZM: null,
        PN: null,
      }
    }
  }
  statedataSelection(event) {
    this.statevalue = event.value;
  }
  setErrorMessage(c: AbstractControl): void {
    let control = this.uiService.getControlName(c);//gives the control name property from particular service.
    document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
    if ((c.touched || c.dirty) && c.errors) {
      document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
    }
  }
  private validationMessages = { //used in above method.

    Date_required: '*Select Date of Birth',

    birthPlace_required: '*Enter Birth Place',

    language_required: '*Select Language',

  };

  ngOnInit() {

  }
  ngAfterViewInit(): void {
    if (this.panchangaService.panchangaRequest != null) {
      this.timeformatvalue = this.panchangaService.panchangaRequest.TimeFormat;
    }
    else {

    }

  }

  ngOnDestroy(): void {

  }


  timeformatdataSelection(event) {
    this.timeformatvalue = event.value;
  }

  public date: Date = new Date(Date.now());

  OnSave_click() {
    this.isLoading = true;
    this.loadingSwitchService.loading = true;
    this.panchangaService.systemDate = ("0" + new Date().getDate()).toString().slice(-2) + "-" + ("0" + ((new Date().getMonth()) + 1)).toString().slice(-2) + "-" + new Date().getFullYear().toString();
    var bdate: Date = this.profileForm.controls['Date'].value;
    var btime: Date = this.profileForm.controls['Date'].value;
    if (bdate instanceof Date) {
      var dateinString = bdate.getFullYear().toString() + "-" + ("0" + ((bdate.getMonth()) + 1)).toString().slice(-2) + "-" + ("0" + bdate.getDate()).toString().slice(-2);
    }
    else {
      dateinString = bdate;
    }
    if (btime instanceof Date) {
      var timeinString = ("0" + btime.getHours()).toString().slice(-2) + ":" + ("0" + btime.getMinutes()).toString().slice(-2) + ":" + "00";
    }
    else {
      timeinString = "00:00:00";
    }
    var ProfileData = {
      Id: this.Id,
      Name: this.profileForm.controls['Name'].value,
      Mobile: this.profileForm.controls['MobileNo'].value,
      EMail: this.profileForm.controls['EMail'].value,
      Address1: this.profileForm.controls['Address1'].value,
      Address2: this.profileForm.controls['Address2'].value,
      Address3: this.profileForm.controls['Address3'].value,
      PinCode: this.profileForm.controls['PinCode'].value
    }
    this.panchangaService.DateinDateFormat = bdate;
    this.partyService.UpdateProfile(ProfileData).subscribe((data: any) => {
      this.loadingSwitchService.loading = false;
    });
  }

  public onDialogOKSelected(event) {
    event.dialog.close();
  }


  maxDate: Date = new Date();
  cityPattern = "^[^0-9]+$";
  namePattern: any = /^[^0-9]+$/;
  phonePattern: any = /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/;
  countries: string[];
  phoneRules: any = {
    X: /[02-9]/
  }
  now: Date = new Date();

}
