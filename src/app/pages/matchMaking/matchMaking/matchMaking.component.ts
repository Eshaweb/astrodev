import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, NgZone, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchRequest } from 'src/Models/MatchMaking/MatchRequest';
import { MaleMatchMakingRequest } from 'src/Models/MatchMaking/MaleMatchMakingRequest';
import { FemaleMatchMakingRequest } from 'src/Models/MatchMaking/FemaleMatchMakingRequest';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
import { MatchMakingService } from 'src/Services/MatchMakingService/MatchMakingService';
import { MapsAPILoader } from '@agm/core';
import { UIService } from 'src/Services/UIService/ui.service';
import ArrayStore from 'devextreme/data/array_store';
import { MatchResponse } from 'src/Models/MatchMaking/match';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/Services/LoginService/LoginService';


@Component({
  templateUrl: './matchMaking.component.html',
  styleUrls: ['./matchMaking.component.css']
})

export class MatchMakingComponent {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  matchRequest: MatchRequest;
  matchResponse: MatchResponse;
  maleMatchMakingRequest: MaleMatchMakingRequest;
  femaleMatchMakingRequest: FemaleMatchMakingRequest;
  maleMatchMakingForm: FormGroup;
  femaleMatchMakingForm: FormGroup;
  enabletoEdit_MaleBDetails: boolean = false;
  enabletoEdit_FemaleBDetails: boolean = false;
  maletimeformatdata: ArrayStore;
  femaletimeformatdata: ArrayStore;
  languagedata: ArrayStore;
  reportTypedata: ArrayStore;
  reportSizedata: ArrayStore;

  male_timeformatvalue: string;
  female_timeformatvalue: string;
  languagevalue: string;
  reportTypevalue: string;
  reportSizevalue: string;

  male_birthDateinDateFormat: Date;
  male_birthTimeinDateFormat: Date;
  female_birthDateinDateFormat: Date;
  female_birthTimeinDateFormat: Date;
  intLongDeg_male: number;
  intLatDeg_male: number;
  intLongDeg_female: number;
  intLatDeg_female: number;
  longitude: number;
  latitude: number;
  timeZoneId_Male: any;
  timeZoneName_Male: string;
  timeZoneId_Female: string;
  timeZoneName_Female: any;
  checkBoxValue_Male: boolean = false;
  checkBoxValue_Female: boolean = false;
  LatDegMessage: string;
  LatMtMessage: string;
  maletimeformats: SelectBoxModel[] = [
    { Id: "STANDARD", Text: 'Standard Time' },
    { Id: "SUMMER", Text: 'Daylight Saving Time' },
    { Id: "DOUBLE", Text: 'Double Summer Time' },
    { Id: "WAR", Text: 'War Time' }
  ];
  femaletimeformats: SelectBoxModel[] = [
    { Id: "STANDARD", Text: 'Standard Time' },
    { Id: "SUMMER", Text: 'Daylight Saving Time' },
    { Id: "DOUBLE", Text: 'Double Summer Time' },
    { Id: "WAR", Text: 'War Time' }
  ];
  languages: SelectBoxModel[] = [
    { Id: "ENG", Text: "English" },
    { Id: "HIN", Text: "हिन्दी" },
    { Id: "KAN", Text: "ಕನ್ನಡ" },
    { Id: "MAL", Text: "മലയാളം" },
    { Id: "TAM", Text: "தமிழ்" }];
    
  reportTypes: SelectBoxModel[] = [
    { Id: "S", Text: 'System Report' },
    { Id: "U", Text: 'User Report' }];

    reportSizes: SelectBoxModel[] = [
      { Id: "A4", Text: "A4" },
      { Id: "A5", Text: "A5" }];
  mindateinDateFormat: Date;
  maxdateinDateFormat: Date;
  girlTitle: string;
  boyTitle: string;

  opened(e) {
    e.component
      .content()
      .getElementsByClassName("dx-box-item")[0].style.display =
      "none";
    // e.component.content().getElementsByClassName("dx-toolbar-button")[0].style.padding =
    // "25px";
    e.component.content().style.width = "320px";
  }
  
  constructor(public loginService:LoginService,public storageService:StorageService, public loadingSwitchService:LoadingSwitchService,public route: ActivatedRoute, public router: Router, public cdr: ChangeDetectorRef,
    public matchMakingService: MatchMakingService, public ngZone: NgZone, public mapsAPILoader: MapsAPILoader,
    public uiService: UIService, public formbuilder: FormBuilder) {
      this.mindateinDateFormat = new Date(1900, 0, 1);
      this.maxdateinDateFormat = new Date();
      this.maxdateinDateFormat.setDate(this.maxdateinDateFormat.getDate()+1);
      this.loginService.isHomePage=false;
      if (environment.production) {
        this.maleMatchMakingForm = this.formbuilder.group({
          maleName: ['', [Validators.required, Validators.minLength(4)]],
          MaleBdate: new Date(),
          MaleBtime: new Date(),
          MaleBplace: ['', [Validators.required]],
          latitude: [''],
          longitude: [''],
          Male_LatDeg: [null, [Validators.required, Validators.min(0), Validators.max(90)]],
          Male_LongDeg: [null, [Validators.required, Validators.min(0), Validators.max(180)]],
          Male_LatMt: [null, [Validators.required, Validators.min(0), Validators.max(59)]],
          Male_LongMt: [null, [Validators.required, Validators.min(0), Validators.max(59)]],
          Male_NS: ['', [Validators.required, Validators.pattern("^[NS]?$")]],
          Male_EW: ['', [Validators.required, Validators.pattern("^[EW]?$")]],
          Male_ZH: [null, [Validators.required, Validators.min(0), Validators.max(13)]],
          Male_ZM: [null, [Validators.required, Validators.min(0), Validators.max(45)]],
          Male_PN: ['', [Validators.required, Validators.pattern("^[+-]?$")]]
        }, {validator: this.validateDateField('MaleBdate')});
        this.femaleMatchMakingForm = this.formbuilder.group({
          femaleName: ['', [Validators.required, Validators.minLength(4)]],
          FemaleBdate: new Date(),
          FemaleBtime: new Date(),
          FemaleBplace: ['', [Validators.required]],
          latitude: [''],
          longitude: [''],
          Female_LatDeg: [null, [Validators.required, Validators.min(0), Validators.max(90)]],
          Female_LongDeg: [null, [Validators.required, Validators.min(0), Validators.max(180)]],
          Female_LatMt: [null, [Validators.required, Validators.min(0), Validators.max(59)]],
          Female_LongMt: [null, [Validators.required, Validators.min(0), Validators.max(59)]],
          Female_NS: ['', [Validators.required, Validators.pattern("^[NS]?$")]],
          Female_EW: ['', [Validators.required, Validators.pattern("^[EW]?$")]],
          Female_ZH: [null, [Validators.required, Validators.min(0), Validators.max(13)]],
          Female_ZM: [null, [Validators.required, Validators.min(0), Validators.max(45)]],
          Female_PN: ['', [Validators.required, Validators.pattern("^[+-]?$")]]
        }, {validator: this.validateDateField('FemaleBdate')});
      }
      else{
        this.maleMatchMakingForm = this.formbuilder.group({
          maleName: ['Shamanth', [Validators.required, Validators.minLength(4)]],
          MaleBdate: new Date(),
          MaleBtime: new Date(),
          MaleBplace: ['', [Validators.required]],
          latitude: [''],
          longitude: [''],
          Male_LatDeg: [null, [Validators.required, Validators.min(0), Validators.max(90)]],
          Male_LongDeg: [null, [Validators.required, Validators.min(0), Validators.max(180)]],
          Male_LatMt: [null, [Validators.required, Validators.min(0), Validators.max(59)]],
          Male_LongMt: [null, [Validators.required, Validators.min(0), Validators.max(59)]],
          Male_NS: ['', [Validators.required, Validators.pattern("^[NS]?$")]],
          Male_EW: ['', [Validators.required, Validators.pattern("^[EW]?$")]],
          Male_ZH: [null, [Validators.required, Validators.min(0), Validators.max(13)]],
          Male_ZM: [null, [Validators.required, Validators.min(0), Validators.max(45)]],
          Male_PN: ['', [Validators.required, Validators.pattern("^[+-]?$")]]
        }, {validator: this.validateDateField('MaleBdate')});
        this.femaleMatchMakingForm = this.formbuilder.group({
          femaleName: ['Vaasanthi', [Validators.required, Validators.minLength(4)]],
          FemaleBdate: new Date(),
          FemaleBtime: new Date(),
          FemaleBplace: ['', [Validators.required]],
          latitude: [''],
          longitude: [''],
          Female_LatDeg: [null, [Validators.required, Validators.min(0), Validators.max(90)]],
          Female_LongDeg: [null, [Validators.required, Validators.min(0), Validators.max(180)]],
          Female_LatMt: [null, [Validators.required, Validators.min(0), Validators.max(59)]],
          Female_LongMt: [null, [Validators.required, Validators.min(0), Validators.max(59)]],
          Female_NS: ['', [Validators.required, Validators.pattern("^[NS]?$")]],
          Female_EW: ['', [Validators.required, Validators.pattern("^[EW]?$")]],
          Female_ZH: [null, [Validators.required, Validators.min(0), Validators.max(13)]],
          Female_ZM: [null, [Validators.required, Validators.min(0), Validators.max(45)]],
          Female_PN: ['', [Validators.required, Validators.pattern("^[+-]?$")]]
        }, {validator: this.validateDateField('FemaleBdate')});
      }
      
    const maleNameContrl = this.maleMatchMakingForm.get('maleName');
    maleNameContrl.valueChanges.subscribe(value => this.setErrorMessage(maleNameContrl));
    const MaleBdateContrl = this.maleMatchMakingForm.get('MaleBdate');
    MaleBdateContrl.valueChanges.subscribe(value => this.setErrorMessage(MaleBdateContrl));
    const MaleBtimeContrl = this.maleMatchMakingForm.get('MaleBtime');
    MaleBtimeContrl.valueChanges.subscribe(value => this.setErrorMessage(MaleBtimeContrl));
    const MaleBplaceContrl = this.maleMatchMakingForm.get('MaleBplace');
    MaleBplaceContrl.valueChanges.subscribe(value => this.setErrorMessage(MaleBplaceContrl));
    // const Male_LatDegContrl = this.maleMatchMakingForm.get('Male_LatDeg');
    // Male_LatDegContrl.valueChanges.subscribe(value => this.setErrorMessage(Male_LatDegContrl));
    // const Male_LatMtContrl = this.maleMatchMakingForm.get('Male_LatMt');
    // Male_LatMtContrl.valueChanges.subscribe(value => this.setErrorMessage(Male_LatMtContrl));
    // const Male_NSContrl = this.maleMatchMakingForm.get('Male_NS');
    // Male_NSContrl.valueChanges.subscribe(value => this.setErrorMessage(Male_NSContrl));
    // const Male_LongDegContrl = this.maleMatchMakingForm.get('Male_LongDeg');
    // Male_LongDegContrl.valueChanges.subscribe(value => this.setErrorMessage(Male_LongDegContrl));
    // const Male_LongMtContrl = this.maleMatchMakingForm.get('Male_LongMt');
    // Male_LongMtContrl.valueChanges.subscribe(value => this.setErrorMessage(Male_LongMtContrl));
    // const Male_EWContrl = this.maleMatchMakingForm.get('Male_EW');
    // Male_EWContrl.valueChanges.subscribe(value => this.setErrorMessage(Male_EWContrl));
    // const Male_ZHContrl = this.maleMatchMakingForm.get('Male_ZH');
    // Male_ZHContrl.valueChanges.subscribe(value => this.setErrorMessage(Male_ZHContrl));
    // const Male_ZMContrl = this.maleMatchMakingForm.get('Male_ZM');
    // Male_ZMContrl.valueChanges.subscribe(value => this.setErrorMessage(Male_ZMContrl));
    // const Male_PNContrl = this.maleMatchMakingForm.get('Male_PN');
    // Male_PNContrl.valueChanges.subscribe(value => this.setErrorMessage(Male_PNContrl));
    this.maleMatchMakingRequest = {
      Name: this.maleMatchMakingForm.controls['maleName'].value,
      Father: null,
      Mother: null,
      Gothra: null,
      Date: null,
      Time: null,
      TimeFormat: null,
      LatDeg: this.maleMatchMakingForm.controls['Male_LatDeg'].value,
      LatMt: this.maleMatchMakingForm.controls['Male_LatMt'].value,
      LongDeg: this.maleMatchMakingForm.controls['Male_LongDeg'].value,
      LongMt: this.maleMatchMakingForm.controls['Male_LongMt'].value,
      NS: this.maleMatchMakingForm.controls['Male_NS'].value,
      EW: this.maleMatchMakingForm.controls['Male_EW'].value,
      ZH: null,
      ZM: null,
      PN: null,
      Gender: null,
    }
    
    const femaleNameContrl = this.femaleMatchMakingForm.get('femaleName');
    femaleNameContrl.valueChanges.subscribe(value => this.setErrorMessage(femaleNameContrl));
    const FemaleBdateContrl = this.femaleMatchMakingForm.get('FemaleBdate');
    FemaleBdateContrl.valueChanges.subscribe(value => this.setErrorMessage(FemaleBdateContrl));
    const FemaleBtimeContrl = this.femaleMatchMakingForm.get('FemaleBtime');
    FemaleBtimeContrl.valueChanges.subscribe(value => this.setErrorMessage(FemaleBtimeContrl));
    const FemaleBplaceContrl = this.femaleMatchMakingForm.get('FemaleBplace');
    FemaleBplaceContrl.valueChanges.subscribe(value => this.setErrorMessage(FemaleBplaceContrl));
    // const Female_LatDegContrl = this.femaleMatchMakingForm.get('Female_LatDeg');
    // Female_LatDegContrl.valueChanges.subscribe(value => this.setErrorMessage(Female_LatDegContrl));
    // const Female_LatMtContrl = this.femaleMatchMakingForm.get('Female_LatMt');
    // Female_LatMtContrl.valueChanges.subscribe(value => this.setErrorMessage(Female_LatMtContrl));
    // const Female_NSContrl = this.femaleMatchMakingForm.get('Female_NS');
    // Female_NSContrl.valueChanges.subscribe(value => this.setErrorMessage(Female_NSContrl));
    // const Female_LongDegContrl = this.femaleMatchMakingForm.get('Female_LongDeg');
    // Female_LongDegContrl.valueChanges.subscribe(value => this.setErrorMessage(Female_LongDegContrl));
    // const Female_LongMtContrl = this.femaleMatchMakingForm.get('Female_LongMt');
    // Female_LongMtContrl.valueChanges.subscribe(value => this.setErrorMessage(Female_LongMtContrl));
    // const Female_EWContrl = this.femaleMatchMakingForm.get('Female_EW');
    // Female_EWContrl.valueChanges.subscribe(value => this.setErrorMessage(Female_EWContrl));
    // const Female_ZHContrl = this.femaleMatchMakingForm.get('Female_ZH');
    // Female_ZHContrl.valueChanges.subscribe(value => this.setErrorMessage(Female_ZHContrl));
    // const Female_ZMContrl = this.femaleMatchMakingForm.get('Female_ZM');
    // Female_ZMContrl.valueChanges.subscribe(value => this.setErrorMessage(Female_ZMContrl));
    // const Female_PNContrl = this.femaleMatchMakingForm.get('Female_PN');
    // Female_PNContrl.valueChanges.subscribe(value => this.setErrorMessage(Female_PNContrl));
    this.femaleMatchMakingRequest = {
      Name: this.femaleMatchMakingForm.controls['femaleName'].value,
      Father: null,
      Mother: null,
      Gothra: null,
      Date: null,
      Time: null,
      TimeFormat: null,
      LatDeg: this.femaleMatchMakingForm.controls['Female_LatDeg'].value,
      LatMt: this.femaleMatchMakingForm.controls['Female_LatMt'].value,
      LongDeg: this.femaleMatchMakingForm.controls['Female_LongDeg'].value,
      LongMt: this.femaleMatchMakingForm.controls['Female_LongMt'].value,
      NS: this.femaleMatchMakingForm.controls['Female_NS'].value,
      EW: this.femaleMatchMakingForm.controls['Female_EW'].value,
      ZH: null,
      ZM: null,
      PN: null,
      Gender: null,
    }
    if (this.matchMakingService.matchRequest != null) {
      this.matchRequest = this.matchMakingService.matchRequest;
      this.male_birthDateinDateFormat = this.matchMakingService.male_birthDateinDateFormat;
      this.male_birthTimeinDateFormat = this.matchMakingService.male_birthTimeinDateFormat;
      this.female_birthDateinDateFormat = this.matchMakingService.female_birthDateinDateFormat;
      this.female_birthTimeinDateFormat = this.matchMakingService.female_birthTimeinDateFormat;
    }
    else {
      this.male_birthDateinDateFormat = this.maleMatchMakingForm.controls['MaleBdate'].value;
      this.male_birthTimeinDateFormat = this.maleMatchMakingForm.controls['MaleBtime'].value;
      this.female_birthDateinDateFormat = this.femaleMatchMakingForm.controls['FemaleBdate'].value;
      this.female_birthTimeinDateFormat = this.femaleMatchMakingForm.controls['FemaleBtime'].value;
      this.matchRequest = {
        LangCode: null,
        UserOrSystem:null,
        ReportSize:null,
        PartyMastId:StorageService.GetItem('PartyMastId'),
        Male: {
          Name: this.maleMatchMakingForm.controls['maleName'].value,
          Date: null,
          Time: null,
          TimeFormat: null,
          LatDeg: this.maleMatchMakingForm.controls['Male_LatDeg'].value,
          LatMt: this.maleMatchMakingForm.controls['Male_LatMt'].value,
          LongDeg: this.maleMatchMakingForm.controls['Male_LongDeg'].value,
          LongMt: this.maleMatchMakingForm.controls['Male_LongMt'].value,
          NS: this.maleMatchMakingForm.controls['Male_NS'].value,
          EW: this.maleMatchMakingForm.controls['Male_EW'].value,
          ZH: null,
          ZM: null,
          PN: null,
          Gender: null,
        },
        Female: {
          Name: this.femaleMatchMakingForm.controls['femaleName'].value,
          Date: null,
          Time: null,
          TimeFormat: null,
          LatDeg: this.femaleMatchMakingForm.controls['Female_LatDeg'].value,
          LatMt: this.femaleMatchMakingForm.controls['Female_LatMt'].value,
          LongDeg: this.femaleMatchMakingForm.controls['Female_LongDeg'].value,
          LongMt: this.femaleMatchMakingForm.controls['Female_LongMt'].value,
          NS: this.femaleMatchMakingForm.controls['Female_NS'].value,
          EW: this.femaleMatchMakingForm.controls['Female_EW'].value,
          ZH: null,
          ZM: null,
          PN: null,
          Gender: null,
        }
      }
    }
  }
  setErrorMessage(c: AbstractControl): void {
    let control = this.uiService.getControlName(c);//gives the control name property from particular service.
    document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
    if(control=="FemaleBplace"){
      this.timeZoneName_Female=null;
    }
    else if(control=="MaleBplace"){
      this.timeZoneName_Male=null;
    }
    if ((c.touched || c.dirty) && c.errors) {
      document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
      //maps the error message from validationMessages array. 
    }
  }
  private validationMessages = { //used in above method.
    maleName_required: '*Enter Male Name',
    maleName_minlength: '*Minimum length is 4',

    femaleName_required: '*Enter Female Name',
    femaleName_minlength: '*Minimum length is 4',

    MaleBdate_required: '*Select Birth Date of Male',

    FemaleBdate_required: '*Select Birth Date of Female',

    MaleBtime_required: '*Select Birth Time',

    FemaleBtime_required: '*Select Birth Time',

    MaleBplace_required: '*Enter Birth Place',

    FemaleBplace_required: '*Enter Birth Place',

    Female_LatDeg_required: '*Enter Latitude Degree',
    Female_LatDeg_min: '*Minimum value is 0',
    Female_LatDeg_max: '*Maximum value is 90',

    Female_LatMt_required: '*Enter Latitude Minute',
    Female_LatMt_min: '*Minimum value is 0',
    Female_LatMt_max: '*Maximum value is 59',

    Female_NS_required: '*Enter NS',
    Female_NS_pattern: '*Only S or N is valid ',

    Female_LongDeg_required: '*Enter Longitude Degree',
    Female_LongDeg_min: '*Minimum value is 0',
    Female_LongDeg_max: '*Maximum value is 90',

    Female_LongMt_required: '*Enter Longitude Minute',
    Female_LongMt_min: '*Minimum value is 0',
    Female_LongMt_max: '*Maximum value is 59',

    Female_EW_required: '*Enter EW',
    Female_EW_pattern: '*Only E or W is valid ',

    Female_ZH_required: '*Enter ZH',
    Female_ZH_min: '*Minimum value is 0',
    Female_ZH_max: '*Maximum value is 13',

    Female_ZM_required: '*Enter ZM',
    Female_ZM_min: '*Minimum value is 0',
    Female_ZM_max: '*Maximum value is 45',

    Female_PN_required: '*Enter PN',
    Female_PN_pattern: '*Only + or - is valid ',

    Male_LatDeg_required: '*Enter Latitude Degree',
    Male_LatDeg_min: '*Minimum value is 0',
    Male_LatDeg_max: '*Maximum value is 90',

    Male_LatMt_required: '*Enter Latitude Minute',
    Male_LatMt_min: '*Minimum value is 0',
    Male_LatMt_max: '*Maximum value is 59',

    Male_NS_required: '*Enter NS',
    Male_NS_pattern: '*Only S or N is valid ',

    Male_LongDeg_required: '*Enter Longitude Degree',
    Male_LongDeg_min: '*Minimum value is 0',
    Male_LongDeg_max: '*Maximum value is 90',

    Male_LongMt_required: '*Enter Longitude Minute',
    Male_LongMt_min: '*Minimum value is 0',
    Male_LongMt_max: '*Maximum value is 59',

    Male_EW_required: '*Enter EW',
    Male_EW_pattern: '*Only E or W is valid ',

    Male_ZH_required: '*Enter ZH',
    Male_ZH_min: '*Minimum value is 0',
    Male_ZH_max: '*Maximum value is 13',

    Male_ZM_required: '*Enter ZM',
    Male_ZM_min: '*Minimum value is 0',
    Male_ZM_max: '*Maximum value is 45',

    Male_PN_required: '*Enter PN',
    Male_PN_pattern: '*Only + or - is valid ',

  };

  validateDateField(from: string) {
    return (group: FormGroup): {[key: string]: any} => {
     let m = group.controls['MaleBdate'];
     let f = group.controls['FemaleBdate'];
     if (m!=undefined&& (m.value > new Date(this.maxdateinDateFormat)||m.value < new Date(this.mindateinDateFormat))) {
      return {
        dates: "Date from should be less than Date to"
      };
    }
     if (f!=undefined&& (f.value > new Date(this.maxdateinDateFormat)||f.value < new Date(this.mindateinDateFormat))) {
       return {
         dates: "Date from should be less than Date to"
       };
     }
     return {};
    }
  }

  ngOnInit() {
    this.femaletimeformatdata = new ArrayStore({
      data: this.femaletimeformats,
      key: "Id"
    });
    this.maletimeformatdata = new ArrayStore({
      data: this.maletimeformats,
      key: "Id"
    });
    this.reportSizedata = new ArrayStore({
      data: this.reportSizes,
      key: "Id"
    });
    this.languagedata = new ArrayStore({
      data: this.languages,
      key: "Id"
    });
    this.reportTypedata = new ArrayStore({
      data: this.reportTypes,
      key: "Id"
    });
    this.mapsAPILoader.load().then(() => {
      let nativeHome1InputBox = document.getElementById('male_birthplace_txt').getElementsByTagName('input')[0];
      let autocomplete1 = new google.maps.places.Autocomplete(nativeHome1InputBox, {
        types: ["geocode"]
      });
      console.log(autocomplete1);
      autocomplete1.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete1.getPlace();
          this.matchMakingService.male_birthplace = place.formatted_address;
          this.matchMakingService.male_birthplaceShort = place.address_components[0].long_name;
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getTimezone_Male(this.latitude, this.longitude);
        });
      });
      let nativeHome2InputBox = document.getElementById('female_birthplace_txt').getElementsByTagName('input')[0];
      let autocomplete2 = new google.maps.places.Autocomplete(nativeHome2InputBox, {
        types: ["geocode"]
      });
      console.log(autocomplete2);
      autocomplete2.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete2.getPlace();
          this.matchMakingService.female_birthplace = place.formatted_address;
          this.matchMakingService.female_birthplaceShort = place.address_components[0].long_name;
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getTimezone_Female(this.latitude, this.longitude);
        });
      });
    });
  }

  ngAfterViewInit(): void {
    if (this.matchMakingService.matchRequest != null) {
      this.male_timeformatvalue = this.matchMakingService.matchRequest.Male.TimeFormat;
      this.female_timeformatvalue = this.matchMakingService.matchRequest.Female.TimeFormat;
      this.languagevalue = this.matchMakingService.matchRequest.LangCode;
      this.reportSizevalue = this.matchMakingService.matchRequest.ReportSize;
      this.reportTypevalue= this.matchMakingService.matchRequest.UserOrSystem;
      this.timeZoneName_Female = this.matchMakingService.timeZoneName_Female;
      this.timeZoneName_Male = this.matchMakingService.timeZoneName_Male;
    }
    else {
      this.male_timeformatvalue = this.maletimeformats[0].Id;
      this.female_timeformatvalue = this.femaletimeformats[0].Id;
      this.languagevalue = this.languages[2].Id;
      this.reportTypevalue= this.reportTypes[0].Id;
      this.reportSizevalue = this.reportSizes[1].Id;
    }
  }

  getTimezone_Male(lat, long) {
    this.matchRequest.Male.LatDeg = Math.abs(parseInt(lat));
    this.matchRequest.Male.LongDeg = Math.abs(parseInt(long));
    this.intLatDeg_male = parseInt(lat);
    this.intLongDeg_male = parseInt(long);
    this.matchRequest.Male.LatMt = parseInt(Math.abs((lat - this.intLatDeg_male) * 60).toString());
    this.matchRequest.Male.LongMt = parseInt(Math.abs((long - this.intLongDeg_male) * 60).toString());
    if (lat < 0) {
      this.matchRequest.Male.NS = "S";
    }
    else {
      this.matchRequest.Male.NS = "N";
    }
    if (long < 0) {
      this.matchRequest.Male.EW = "W";
    }
    else {
      this.matchRequest.Male.EW = "E";
    }
    this.matchMakingService.getTimezone(lat, long).subscribe((data: any) => setTimeout(() => {
      this.matchRequest.Male.ZH = parseInt((Math.abs(data.rawOffset) / 3600.00).toString());
      this.matchRequest.Male.ZM = parseInt((((Math.abs(data.rawOffset) / 3600.00) - this.matchRequest.Male.ZH) * 60).toString());
      if (data.rawOffset < 0) {
        this.matchRequest.Male.PN = "-";
      }
      else {
        this.matchRequest.Male.PN = "+";
      }
      this.timeZoneName_Male = data.timeZoneName;
      this.timeZoneId_Male = data.timeZoneId;
      this.cdr.detectChanges();
    }));
  }
  getTimezone_Female(lat, long) {
    this.matchRequest.Female.LatDeg = Math.abs(parseInt(lat));
    this.matchRequest.Female.LongDeg = Math.abs(parseInt(long));
    this.intLatDeg_female = parseInt(lat);
    this.intLongDeg_female = parseInt(long);
    this.matchRequest.Female.LatMt = parseInt(Math.abs((lat - this.intLatDeg_female) * 60).toString());
    this.matchRequest.Female.LongMt = parseInt(Math.abs((long - this.intLongDeg_female) * 60).toString());
    if (lat < 0) {
      this.matchRequest.Female.NS = "S";
    }
    else {
      this.matchRequest.Female.NS = "N";
    }
    if (long < 0) {
      this.matchRequest.Female.EW = "W";
    }
    else {
      this.matchRequest.Female.EW = "E";
    }
    this.matchMakingService.getTimezone(lat, long).subscribe((data: any) => setTimeout(() => {
      this.matchRequest.Female.ZH = parseInt((Math.abs(data.rawOffset) / 3600.00).toString());
      this.matchRequest.Female.ZM = parseInt((((Math.abs(data.rawOffset) / 3600.00) - this.matchRequest.Female.ZH) * 60).toString());
      if (data.rawOffset < 0) {
        this.matchRequest.Female.PN = "-";
      }
      else {
        this.matchRequest.Female.PN = "+";
      }
      this.timeZoneName_Female = data.timeZoneName;
      this.timeZoneId_Female = data.timeZoneId;
      this.cdr.detectChanges();
    }));
  }

  femaletimeformatdataSelection(event) {
    this.female_timeformatvalue = event.value;
  }
  maletimeformatdataSelection(event) {
    this.male_timeformatvalue = event.value;
  }
  languagedataSelection(event) {
    this.languagevalue = event.value;
  }
  reportTypedataSelection(event){
    this.reportTypevalue = event.value;
  }
  reportSizedataSelection(event) {
    this.reportSizevalue = event.value;
  }
  
  OnMouseUp_Male(event) {
    if (event == null) {
      this.timeZoneName_Male = null;
    }
  }
  OnMouseUp_Female(event) {
    if (event == null) {
      this.timeZoneName_Female = null;
    }
  }

  Matchmaking_Click() {
    this.loadingSwitchService.loading=true;
    var bdate_Male: Date = this.maleMatchMakingForm.controls['MaleBdate'].value;
    var btime_Male: Date = this.maleMatchMakingForm.controls['MaleBtime'].value;
    var bdate_Female: Date = this.femaleMatchMakingForm.controls['FemaleBdate'].value;
    var btime_Female: Date = this.femaleMatchMakingForm.controls['FemaleBtime'].value;
    if (bdate_Female instanceof Date) {
      var dateinStringFemale = bdate_Female.getFullYear().toString() + "-" + ("0" + ((bdate_Female.getMonth()) + 1)).toString().slice(-2) + "-" + ("0" + bdate_Female.getDate()).toString().slice(-2);
    }
    else {
      dateinStringFemale = bdate_Female;
    }
    if (btime_Female instanceof Date) {
      var timeinString_Female = ("0" + btime_Female.getHours()).toString().slice(-2) + ":" + ("0" + btime_Female.getMinutes()).toString().slice(-2) + ":" + "00";
    }
   
    if (bdate_Male instanceof Date) {
      var dateinString_Male = bdate_Male.getFullYear().toString() + "-" + ("0" + ((bdate_Male.getMonth()) + 1)).toString().slice(-2) + "-" + ("0" + bdate_Male.getDate()).toString().slice(-2);
    }
    else {
      dateinString_Male = bdate_Male;
    }
    if (btime_Male instanceof Date) {
      var timeinString_Male = ("0" + btime_Male.getHours()).toString().slice(-2) + ":" + ("0" + btime_Male.getMinutes()).toString().slice(-2) + ":" + "00";
    }
    
    this.matchRequest = {
      LangCode: this.languagevalue,
      UserOrSystem: this.reportTypevalue,
      ReportSize:this.reportSizevalue,
      PartyMastId:StorageService.GetItem('PartyMastId'),
      Female: {
        Name:this.femaleMatchMakingForm.controls['femaleName'].value,
        Date: dateinStringFemale,
        Time: timeinString_Female,
        LatDeg: this.femaleMatchMakingForm.controls['Female_LatDeg'].value,
        LatMt: this.femaleMatchMakingForm.controls['Female_LatMt'].value,
        LongDeg: this.femaleMatchMakingForm.controls['Female_LongDeg'].value,
        LongMt: this.femaleMatchMakingForm.controls['Female_LongMt'].value,
        ZH: this.femaleMatchMakingForm.controls['Female_ZH'].value,
        ZM: this.femaleMatchMakingForm.controls['Female_ZM'].value,
        NS: this.femaleMatchMakingForm.controls['Female_NS'].value,
        EW: this.femaleMatchMakingForm.controls['Female_EW'].value,
        PN: this.femaleMatchMakingForm.controls['Female_PN'].value,
        Gender: "F",
        TimeFormat: this.female_timeformatvalue
      },
      Male: {
        Name:this.maleMatchMakingForm.controls['maleName'].value,
        Date: dateinString_Male,
        Time: timeinString_Male,
        LatDeg: this.maleMatchMakingForm.controls['Male_LatDeg'].value,
        LatMt: this.maleMatchMakingForm.controls['Male_LatMt'].value,
        LongDeg: this.maleMatchMakingForm.controls['Male_LongDeg'].value,
        LongMt: this.maleMatchMakingForm.controls['Male_LongMt'].value,
        ZH: this.maleMatchMakingForm.controls['Male_ZH'].value,
        ZM: this.maleMatchMakingForm.controls['Male_ZM'].value,
        NS: this.maleMatchMakingForm.controls['Male_NS'].value,
        EW: this.maleMatchMakingForm.controls['Male_EW'].value,
        PN: this.maleMatchMakingForm.controls['Male_PN'].value,
        Gender: "M",
        TimeFormat: this.male_timeformatvalue
      }
    }
    this.matchMakingService.male_birthDateinDateFormat = bdate_Male;
    this.matchMakingService.male_birthTimeinDateFormat = btime_Male;
    this.matchMakingService.female_birthDateinDateFormat = bdate_Female;
    this.matchMakingService.female_birthTimeinDateFormat = btime_Female;
    this.matchMakingService.timeZoneName_Female = this.timeZoneName_Female;
    this.matchMakingService.timeZoneName_Male = this.timeZoneName_Male;
    this.storageService.SetHoroModel(JSON.stringify(this.matchRequest));
    this.matchMakingService.GetFreeData(this.matchRequest).subscribe((data) => {
      this.matchMakingService.matchRequest = this.matchRequest;
      this.matchMakingService.matchResponse = data;
      this.storageService.SetHoroResponse(JSON.stringify(data));
      this.loadingSwitchService.loading=false;
      this.router.navigate(["/matchMaking/getMatchMakingFreeData"]);
    });
  }
}