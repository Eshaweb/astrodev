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
import { isString } from 'util';
import { NumerologyService } from 'src/Services/NumerologyService/NumerologyService';
import { NumerologyRequest } from 'src/Models/Numerology/numerologyRequest';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { LoginService } from 'src/Services/login/login.service';

// if (!/localhost/.test(document.location.host)) {
//   enableProdMode();
// }


@Component({
  //selector: 'app-horopage',
  templateUrl: './numerology.component.html',
  styleUrls: ['./numerology.component.css']
})
export class NumerologyComponent {
  //genders:string[];
  genders: SelectBoxModel[]=[
    { Id: "M", Text: "Male" }, 
    { Id: "F", Text: "Female" }];
  isLoading: boolean;
  birthDateinDateFormat: Date;
  birthTimeinDateFormat: Date;
  errorMessage: any;
  subscription: Subscription;
  languagevalue: string;
  languagedata: ArrayStore;
  genderValue: string;
  genderdata: ArrayStore;
  numerologyRequest: NumerologyRequest;
  numerologyForm: FormGroup;
  languages: SelectBoxModel[] = [
    { Id: "ENG", Text: "English" },
    { Id: "HIN", Text: "Hindi" },
    { Id: "KAN", Text: "Kannada" },
    { Id: "MAL", Text: "Malayalam" },
    { Id: "TAM", Text: "Tamil" }];
    reportSizes: SelectBoxModel[] = [
      { Id: "A4", Text: "A4" },
      { Id: "A5", Text: "A5" }];
  reportSizedata: ArrayStore;
  reportSizevalue: any;
  constructor(public loginService:LoginService,public storageService:StorageService, public loadingSwitchService: LoadingSwitchService, public toastr: ToastrManager,
    public route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder,
    public partyService: PartyService, public numerologyService: NumerologyService, public uiService: UIService,
    public formbuilder: FormBuilder) {
      this.loginService.isHomePage=false;
      this.numerologyForm = this.formbuilder.group({
      Name: ['Shailesh', [Validators.required, Validators.minLength(4)]],
      Date: new Date(),
      language: ['', []],
      gender: ['M', []],
      houseName: [''],
      mobileNo: [null],
      vehicleNo: [''],
      cityName: ['', []]
    });
    const NameContrl = this.numerologyForm.get('Name');
    NameContrl.valueChanges.subscribe(value => this.setErrorMessage(NameContrl));
    if (this.numerologyService.numerologyRequest != null) {
      this.numerologyRequest = this.numerologyService.numerologyRequest;
      this.numerologyForm.controls['Name'].setValue(this.numerologyService.numerologyRequest.Name);
      this.birthDateinDateFormat = this.numerologyService.birthDateinDateFormat;
    }
    else {
      this.birthDateinDateFormat = this.numerologyForm.controls['Date'].value;
      this.numerologyRequest = {
        Name: this.numerologyForm.controls['Name'].value,
        Date: this.numerologyForm.controls['Date'].value,
        Gender: this.genderValue,
        LangCode: null,
        HouseName: this.numerologyForm.controls['houseName'].value,
        MobileNo: this.numerologyForm.controls['mobileNo'].value,
        VehicleNo: this.numerologyForm.controls['vehicleNo'].value,
        CityName: this.numerologyForm.controls['cityName'].value,
        ReportSize:this.reportSizevalue
      }
    }
  }

  setErrorMessage(c: AbstractControl): void {
    let control = this.uiService.getControlName(c);//gives the control name property from particular service.
    document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
    if ((c.touched || c.dirty) && c.errors) {
      document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
    }
  }
  private validationMessages = { //used in above method.
    Name_required: '*Enter Name',
    Name_minlength: '*Minimum length is 4',
    Name_pattern: 'Name should be character only',

    Date_required: '*Select Date of Birth',

    gender_required: '*Select Date of Birth',

    birthPlace_required: '*Enter Birth Place',

    language_required: '*Select Language',

  };

  ngOnInit() {
    this.languagedata = new ArrayStore({
      data: this.languages,
      key: "Id"
    });
    this.genderdata = new ArrayStore({
      data: this.genders,
      key: "Id"
    });
    this.reportSizedata = new ArrayStore({
      data: this.reportSizes,
      key: "Id"
    });
  }
  onGenderChanged(event) {
    if (event.value == 'M') {
      this.genderValue = 'M';
    }
    else {
      this.genderValue = 'F';
    }
  }
  reportSizedataSelection(event) {
    this.reportSizevalue = event.value;
  }
  ngAfterViewInit(): void {
    if (this.numerologyService.numerologyRequest != null) {
      this.languagevalue = this.numerologyService.numerologyRequest.LangCode;
      this.genderValue = this.numerologyService.numerologyRequest.Gender;
      this.reportSizevalue = this.numerologyService.numerologyRequest.ReportSize;
    }
    else {
      this.languagevalue = this.languages[2].Id;
      this.genderValue = this.genders[0].Id;
      this.reportSizevalue = this.reportSizes[0].Id;
    }

  }

  ngOnDestroy(): void {

  }

  languagedataSelection(event) {
    this.languagevalue = event.value;
  }
  OnMouseUp(event) {
    if (event == null) {

    }
  }

  public date: Date = new Date(Date.now());
  submit_click() {
    this.isLoading = true;
    this.loadingSwitchService.loading = true;
    this.numerologyService.systemDate = ("0" + new Date().getDate()).toString().slice(-2) + "-" + ("0" + ((new Date().getMonth()) + 1)).toString().slice(-2) + "-" + new Date().getFullYear().toString();
    var bdate: Date = this.numerologyForm.controls['Date'].value;
    if (bdate instanceof Date) {
      var dateinString = bdate.getFullYear().toString() + "-" + ("0" + ((bdate.getMonth()) + 1)).toString().slice(-2) + "-" + ("0" + bdate.getDate()).toString().slice(-2);
    }
    else {
      dateinString = bdate;
    }
    this.numerologyRequest = {
      Name: this.numerologyForm.controls['Name'].value,
      Date: dateinString,
      Gender: this.genderValue,
      LangCode: this.languagevalue,
      HouseName: this.numerologyForm.controls['houseName'].value,
      MobileNo: this.numerologyForm.controls['mobileNo'].value,
      VehicleNo: this.numerologyForm.controls['vehicleNo'].value,
      CityName: this.numerologyForm.controls['cityName'].value,
      ReportSize:this.reportSizevalue
    }
    
    this.numerologyService.numerologyRequest = this.numerologyRequest;
    this.numerologyService.birthDateinDateFormat = bdate;
    this.storageService.SetHoroModel(JSON.stringify(this.numerologyRequest));
    this.numerologyService.GetFreeData(this.numerologyRequest).subscribe((data: any) => {
      this.numerologyService.numerologyResponse = data;
      this.storageService.SetHoroResponse(JSON.stringify(data));
      this.loadingSwitchService.loading = false;
      this.router.navigate(["/numerology/getNumerologyFreeData"]);
    });
  }

  public onDialogOKSelected(event) {
    event.dialog.close();
  }
}
