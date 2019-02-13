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
import { Caption } from 'src/Models/HoroScope/Caption';
import { isString } from 'util';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}


@Component({
  //selector: 'app-horopage',
  templateUrl: './numerology.component.html',
  styleUrls: ['./numerology.component.css']
})
export class NumerologyComponent {
  //genders:string[];
  genders: SelectBoxModel[];
  isLoading: boolean;
  birthDateinDateFormat: Date;
  birthTimeinDateFormat: Date;
  errorMessage: any;
  subscription: Subscription;
  languagevalue: string;
  languagedata: ArrayStore;
  genderValue: string;
  genderdata: ArrayStore;
  numerologyRequest: any;
  ngOnInit() {
    this.languagedata = new ArrayStore({
      data: this.languages,
      key: "Id"
    });
    this.genderdata = new ArrayStore({
      data: this.genders,
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
  ngAfterViewInit(): void {
    if (this.horoScopeService.horoRequest != null) {
      this.languagevalue = this.horoScopeService.horoRequest.LangCode;
      this.genderValue = this.horoScopeService.horoRequest.Gender;
    }
    else {
      this.languagevalue = this.languages[2].Id;
      this.genderValue = this.genders[0].Id;
    }

  }

  ngOnDestroy(): void {

  }

  numerologyForm: FormGroup;
  languages: SelectBoxModel[] = [
    { Id: "ENG", Text: "English" },
    { Id: "HIN", Text: "Hindi" },
    { Id: "KAN", Text: "Kannada" },
    { Id: "MAL", Text: "Malayalam" },
    { Id: "TAM", Text: "Tamil" }];
  
  constructor(public loadingSwitchService: LoadingSwitchService, public toastr: ToastrManager, 
    public route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder,
    public partyService: PartyService, public horoScopeService: HoroScopeService, public uiService: UIService,
    public formbuilder: FormBuilder) {
    this.genders = [{ Id: "M", Text: "Male" }, { Id: "F", Text: "Female" }];
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
    if (this.horoScopeService.horoRequest != null) {
      this.numerologyRequest = this.horoScopeService.horoRequest;
      this.numerologyForm.controls['Name'].setValue(this.horoScopeService.horoRequest.Name);
      this.birthDateinDateFormat = this.horoScopeService.birthDateinDateFormat;
      this.birthTimeinDateFormat = this.horoScopeService.birthTimeinDateFormat;
    }
    else {
      this.birthDateinDateFormat = this.numerologyForm.controls['Date'].value;
      this.numerologyRequest = {
        Name: this.numerologyForm.controls['Name'].value,
        Date: this.numerologyForm.controls['Date'].value,
        Gender: this.numerologyForm.controls['gender'].value,
        LangCode: null,
        ReportSize: null,
        ReportType: null,
        FormParameter: null,
        Swarna: 0,
        Pruchaka: 0,
        JanmaRashi: 0,
        AshtaMangalaNo: null,
        IsMarried: true,
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
    this.horoScopeService.systemDate = ("0" + new Date().getDate()).toString().slice(-2) + "-" + ("0" + ((new Date().getMonth()) + 1)).toString().slice(-2) + "-" + new Date().getFullYear().toString();
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
      FormParameter: 'H',
      ReportType: '#HFH',
      Swarna: 0,
      Pruchaka: 0,
      JanmaRashi: 0,
      AshtaMangalaNo: '444',
      IsMarried: true,
    }
    this.horoScopeService.horoRequest = this.numerologyRequest;
    this.horoScopeService.birthDateinDateFormat = bdate;
    this.horoScopeService.GetFreeData(this.numerologyRequest).subscribe((data: any) => {
      this.horoScopeService.horoResponse = data;
      this.loadingSwitchService.loading = false;
      this.router.navigate(["/numerology/getNumerologyFreeData"]);
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
