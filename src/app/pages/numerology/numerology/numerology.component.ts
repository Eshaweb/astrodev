import { Component, NgModule, enableProdMode, NgZone, ChangeDetectorRef } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { from, Subscription } from 'rxjs';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
import { PartyService } from 'src/Services/PartyService/PartyService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { UIService } from 'src/Services/UIService/ui.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import ArrayStore from 'devextreme/data/array_store';
import { NumerologyService } from 'src/Services/NumerologyService/NumerologyService';
import { NumerologyRequest } from 'src/Models/Numerology/numerologyRequest';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/Services/LoginService/LoginService';

@Component({
  //selector: 'app-horopage',
  templateUrl: './numerology.component.html',
  styleUrls: ['./numerology.component.css']
})
export class NumerologyComponent {
  //genders:string[];
  numerologyRequest: NumerologyRequest;
  numerologyForm: FormGroup;
  birthDateinDateFormat: Date;
  birthTimeinDateFormat: Date;
  subscription: Subscription;
  
  languagedata: ArrayStore;
  genderdata: ArrayStore;
  reportSizedata: ArrayStore;
  reportSizevalue: string;
  languagevalue: string;
  genderValue: string;
  
  genders: SelectBoxModel[]=[
    { Id: "M", Text: "Male" }, 
    { Id: "F", Text: "Female" }];
  languages: SelectBoxModel[] = [
    { Id: "ENG", Text: "English" },
    { Id: "HIN", Text: "Hindi" },
    { Id: "KAN", Text: "Kannada" },
    { Id: "MAL", Text: "Malayalam" },
    { Id: "TAM", Text: "Tamil" }];
    reportSizes: SelectBoxModel[] = [
      { Id: "A4", Text: "A4" },
      { Id: "A5", Text: "A5" }];
  mindateinDateFormat: Date;
  maxdateinDateFormat: Date;
  constructor(public loginService:LoginService,public storageService:StorageService, public loadingSwitchService: LoadingSwitchService, public toastr: ToastrManager,
    public route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder,
    public partyService: PartyService, public numerologyService: NumerologyService, public uiService: UIService,
    public formbuilder: FormBuilder) {
    this.mindateinDateFormat = new Date(1900, 0, 1);
    this.maxdateinDateFormat = new Date();
    this.maxdateinDateFormat.setDate(this.maxdateinDateFormat.getDate()+1);
    this.loginService.isHomePage = false;
    if (environment.production) {
      this.numerologyForm = this.formbuilder.group({
        Name: ['', [Validators.required, Validators.minLength(4)]],
        Date: [new Date(), Validators.max(18-5-2019)],
        language: ['', []],
        gender: ['M', []],
        houseName: [''],
        mobileNo: [null],
        vehicleNo: [''],
        cityName: ['', []]
      }, {validator: this.validateDateField('Date')});
    }
      else{
        this.numerologyForm = this.formbuilder.group({
          Name: ['Shailesh', [Validators.required, Validators.minLength(4)]],
          Date: new Date(),
          language: ['', []],
          gender: ['M', []],
          houseName: [''],
          mobileNo: [null],
          vehicleNo: [''],
          cityName: ['', []]
        }, {validator: this.validateDateField('Date')});
      }
      
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

    vehicleNo_pattern: 'Vehicle No should be No. and Uppercase character only',

    Date_required: '*Select Date of Birth',

    gender_required: '*Select Date of Birth',

    birthPlace_required: '*Enter Birth Place',

    language_required: '*Select Language',

  };

  validateDateField(from: string) {
    return (group: FormGroup): {[key: string]: any} => {
     let f = group.controls['Date'];
      if (f.value > new Date(this.maxdateinDateFormat)) {
       return {
         dates: "Date from should be less than Date to"
       };
     }
     return {};
    }
  }
  onInitialized(e) {
    e.component.option('elementAttr',{'class':'uppercase'});
}
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

  submit_click() {
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
//   maskRules = {
//     // a single character
//     'S': '$',

//     // a regular expression
//     'H': /[0-9A-F]/,

//     // an array of characters
//     'N': ['$', '%', '&', '@'],

//     // a function
//     'F': function (char) {
//         return char == char.toUpperCase();
//     }
// };

loginRules = [{
  type: 'required'
}, {
  type: 'pattern',
  pattern: '^[A-Z]+$',
  message: 'Do not use digits.'
}];
}
