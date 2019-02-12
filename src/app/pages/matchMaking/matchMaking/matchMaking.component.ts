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


@Component({
  templateUrl: './matchMaking.component.html',
  styleUrls: ['./matchMaking.component.css']
})

export class MatchMakingComponent {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  matchRequest: MatchRequest;
  enabletoEdit_MaleBDetails: boolean = false;
  enabletoEdit_FemaleBDetails: boolean = false;
  reportSizedata: ArrayStore;
  languagedata: ArrayStore;
  reportSizevalue: any;
  languagevalue: any;
  male_timeformatvalue: any;
  maletimeformatdata: ArrayStore;
  femaletimeformatdata: ArrayStore;
  female_timeformatvalue: any;
  male_birthDateinDateFormat: any;
  male_birthTimeinDateFormat: any;
  female_birthDateinDateFormat: any;
  female_birthTimeinDateFormat: any;
  intLongDeg_male: number;
  intLatDeg_male: number;
  intLongDeg_female: number;
  intLatDeg_female: number;
  matchResponse: MatchResponse;

  ngAfterViewInit(): void {
    if (this.matchMakingService.matchRequest != null) {
      this.male_timeformatvalue= this.matchMakingService.matchRequest.Male.TimeFormat;
      this.female_timeformatvalue= this.matchMakingService.matchRequest.Female.TimeFormat;
      this.reportSizevalue= 'A6';
      this.languagevalue= this.matchMakingService.matchRequest.LangCode;
    }
    else {
      this.male_timeformatvalue = this.maletimeformats[0].Id;
      this.female_timeformatvalue = this.femaletimeformats[0].Id;
      this.languagevalue = this.languages[2].Id;
    }
  }

  ngOnDestroy(): void {

  }

  maleMatchMakingForm: FormGroup;
  femaleMatchMakingForm: FormGroup;
  longitude: number;
  latitude: number;
  maleMatchMakingRequest: MaleMatchMakingRequest;
  femaleMatchMakingRequest: FemaleMatchMakingRequest;
  timeZoneId_Male: any;
  timeZoneName_Male: any;
  timeZoneId_Female: any;
  timeZoneName_Female: any;
  checkBoxValue_Male: boolean = false;
  checkBoxValue_Female: boolean = false;
  LatDegMessage: string;
  LatMtMessage: string;
  ngOnInit() {
    this.femaletimeformatdata = new ArrayStore({
      data: this.femaletimeformats,
      key: "Id"
    });
    this.maletimeformatdata = new ArrayStore({
      data: this.maletimeformats,
      key: "Id"
    });
    
    this.languagedata = new ArrayStore({
      data: this.languages,
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

  opened(e) {
    e.component
      .content()
      .getElementsByClassName("dx-box-item")[0].style.display =
      "none";
    // e.component.content().getElementsByClassName("dx-toolbar-button")[0].style.padding =
    // "25px";
    e.component.content().style.width = "320px";
  }
  maletimeformats: SelectBoxModel[] = [
    { Id: "STANDARD", Text: 'Standard Time' },
    { Id: "SUMMER", Text: 'Summer Time' },
    { Id: "DOUBLE", Text: 'Double Summer Time' },
    { Id: "WAR", Text: 'War Time' }
  ];
  femaletimeformats: SelectBoxModel[] = [
    { Id: "STANDARD", Text: 'Standard Time' },
    { Id: "SUMMER", Text: 'Summer Time' },
    { Id: "DOUBLE", Text: 'Double Summer Time' },
    { Id: "WAR", Text: 'War Time' }
  ];
  languages: SelectBoxModel[] = [
    { Id: "ENG", Text: 'English' },
    { Id: "HIN", Text: 'Hindi' },
    { Id: "KAN", Text: 'Kannada' },
    { Id: "MAL", Text: 'Malayalam' }
  ];
  femaletimeformatdataSelection(event){
    this.female_timeformatvalue=event.value;
  }
  maletimeformatdataSelection(event){
    this.male_timeformatvalue=event.value;
  }
  languagedataSelection(event){
    this.languagevalue=event.value;
  }
  constructor(public route: ActivatedRoute, public router: Router, public cdr: ChangeDetectorRef,
    public matchMakingService: MatchMakingService, public ngZone: NgZone, public mapsAPILoader: MapsAPILoader,
    public uiService: UIService, public formbuilder: FormBuilder) {
    this.maleMatchMakingForm = this.formbuilder.group({
      maleName: ['Shamanth', [Validators.required, Validators.minLength(4)]],
      MaleBdate: new Date(),
      MaleBtime: new Date(),
      MaleBplace: ['', [Validators.required]],
      latitude: [''],
      longitude: [''],
      LatDeg: ['', [Validators.min(0), Validators.max(90)]],
      LongDeg: ['', [Validators.min(0), Validators.max(180)]],
      LatMt: ['', [Validators.min(0), Validators.max(59)]],
      LongMt: ['', [Validators.min(0), Validators.max(59)]],
      NS: ['', [Validators.required, Validators.pattern("^[NS]?$")]],
      EW: ['', [Validators.required, Validators.pattern("^[EW]?$")]],
      ZH: [null, [Validators.min(0), Validators.max(13)]],
      ZM: [null, [Validators.min(0), Validators.max(45)]],
      PN: ['', [Validators.required, Validators.pattern("^[+-]?$")]]
    });
    const maleNameContrl = this.maleMatchMakingForm.get('maleName');
    maleNameContrl.valueChanges.subscribe(value => this.setErrorMessage(maleNameContrl));
    const MaleBdateContrl = this.maleMatchMakingForm.get('MaleBdate');
    MaleBdateContrl.valueChanges.subscribe(value => this.setErrorMessage(MaleBdateContrl));
    const MaleBtimeContrl = this.maleMatchMakingForm.get('MaleBtime');
    MaleBtimeContrl.valueChanges.subscribe(value => this.setErrorMessage(MaleBtimeContrl));
    const MaleBplaceContrl = this.maleMatchMakingForm.get('MaleBplace');
    MaleBplaceContrl.valueChanges.subscribe(value => this.setErrorMessage(MaleBplaceContrl));
    this.maleMatchMakingRequest = {
      Name: this.maleMatchMakingForm.controls['maleName'].value,
      Father: null,
      Mother: null,
      Gothra: null,
      Date: null,
      Time: null,
      TimeFormat: null,
      LatDeg: this.maleMatchMakingForm.controls['LatDeg'].value,
      LatMt: this.maleMatchMakingForm.controls['LatMt'].value,
      LongDeg: this.maleMatchMakingForm.controls['LongDeg'].value,
      LongMt: this.maleMatchMakingForm.controls['LongMt'].value,
      NS: this.maleMatchMakingForm.controls['NS'].value,
      EW: this.maleMatchMakingForm.controls['EW'].value,
      ZH: null,
      ZM: null,
      PN: null,
      Gender: null,
    }
    this.femaleMatchMakingForm = this.formbuilder.group({
      femaleName: ['Vaasanthi', [Validators.required, Validators.minLength(4)]],
      FemaleBdate: new Date(),
      FemaleBtime: new Date(),
      FemaleBplace: ['', [Validators.required]],
      latitude: [''],
      longitude: [''],
      LatDeg: ['', [Validators.min(0), Validators.max(90)]],
      LongDeg: ['', [Validators.min(0), Validators.max(180)]],
      LatMt: ['', [Validators.min(0), Validators.max(59)]],
      LongMt: ['', [Validators.min(0), Validators.max(59)]],
      NS: ['', [Validators.required, Validators.pattern("^[NS]?$")]],
      EW: ['', [Validators.required, Validators.pattern("^[EW]?$")]],
      ZH: [null, [Validators.min(0), Validators.max(13)]],
      ZM: [null, [Validators.min(0), Validators.max(45)]],
      PN: ['', [Validators.required, Validators.pattern("^[+-]?$")]]
    });
    const femaleNameContrl = this.femaleMatchMakingForm.get('femaleName');
    femaleNameContrl.valueChanges.subscribe(value => this.setErrorMessage(femaleNameContrl));
    const FemaleBdateContrl = this.femaleMatchMakingForm.get('FemaleBdate');
    FemaleBdateContrl.valueChanges.subscribe(value => this.setErrorMessage(FemaleBdateContrl));
    const FemaleBtimeContrl = this.femaleMatchMakingForm.get('FemaleBtime');
    FemaleBtimeContrl.valueChanges.subscribe(value => this.setErrorMessage(FemaleBtimeContrl));
    const FemaleBplaceContrl = this.femaleMatchMakingForm.get('FemaleBplace');
    FemaleBplaceContrl.valueChanges.subscribe(value => this.setErrorMessage(FemaleBplaceContrl));
    // const FemaleTimeformatContrl = this.maleMatchMakingForm.get('FemaleTimeformat');
    // FemaleTimeformatContrl.valueChanges.subscribe(value => this.setErrorMessage(FemaleTimeformatContrl));
    this.femaleMatchMakingRequest = {
      Name: this.femaleMatchMakingForm.controls['femaleName'].value,
      Father: null,
      Mother: null,
      Gothra: null,
      Date: null,
      Time: null,
      TimeFormat: null,
      LatDeg: this.femaleMatchMakingForm.controls['LatDeg'].value,
      LatMt: this.femaleMatchMakingForm.controls['LatMt'].value,
      LongDeg: this.femaleMatchMakingForm.controls['LongDeg'].value,
      LongMt: this.femaleMatchMakingForm.controls['LongMt'].value,
      NS: this.femaleMatchMakingForm.controls['NS'].value,
      EW: this.femaleMatchMakingForm.controls['EW'].value,
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
        Male: {
          Name: this.maleMatchMakingForm.controls['maleName'].value,
          Date: null,
          Time: null,
          TimeFormat: null,
          LatDeg: this.maleMatchMakingForm.controls['LatDeg'].value,
          LatMt: this.maleMatchMakingForm.controls['LatMt'].value,
          LongDeg: this.maleMatchMakingForm.controls['LongDeg'].value,
          LongMt: this.maleMatchMakingForm.controls['LongMt'].value,
          NS: this.maleMatchMakingForm.controls['NS'].value,
          EW: this.maleMatchMakingForm.controls['EW'].value,
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
          LatDeg: this.femaleMatchMakingForm.controls['LatDeg'].value,
          LatMt: this.femaleMatchMakingForm.controls['LatMt'].value,
          LongDeg: this.femaleMatchMakingForm.controls['LongDeg'].value,
          LongMt: this.femaleMatchMakingForm.controls['LongMt'].value,
          NS: this.femaleMatchMakingForm.controls['NS'].value,
          EW: this.femaleMatchMakingForm.controls['EW'].value,
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
    FemaleTimeformat_required: '*Enter Time Format',
    MaleTimeformat_required: '*Enter Time Format'

  };
  
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
    this.matchRequest.Female.LatMt = parseInt(Math.abs((lat - this.matchRequest.Female.LatDeg) * 60).toString());
    this.matchRequest.Female.LongMt = parseInt(Math.abs((long - this.matchRequest.Female.LongDeg) * 60).toString());
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
  public date: Date = new Date(Date.now());
  private monthFormatter = new Intl.DateTimeFormat("en", { month: "long" });
  public formatter = (date: Date) => {
    return `${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
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
    var bdate_Male: Date = this.maleMatchMakingForm.controls['MaleBdate'].value;
    var btime_Male: Date = this.maleMatchMakingForm.controls['MaleBtime'].value;
    var bdate_Female: Date = this.femaleMatchMakingForm.controls['FemaleBdate'].value;
    var btime_Female: Date = this.femaleMatchMakingForm.controls['FemaleBtime'].value;
    if(bdate_Female instanceof Date){
      var dateinStringFemale = bdate_Female.getFullYear().toString() + "-" + ("0" + ((bdate_Female.getMonth()) + 1)).toString().slice(-2) + "-" + ("0" + bdate_Female.getDate()).toString().slice(-2);
    }
      else{
        dateinStringFemale=bdate_Female;
      }
      if(btime_Female instanceof Date){
        var timeinString_Female = ("0" + btime_Female.getHours()).toString().slice(-2) + ":" + ("0" + btime_Female.getMinutes()).toString().slice(-2) + ":" + btime_Female.getSeconds().toString() + "0";
      }
      else{
        timeinString_Female =btime_Female;
      } 
    if(bdate_Male instanceof Date){
      var dateinString_Male = bdate_Male.getFullYear().toString() + "-" + ("0" + ((bdate_Male.getMonth()) + 1)).toString().slice(-2) + "-" + ("0" + bdate_Male.getDate()).toString().slice(-2);
    }
      else{
        dateinString_Male=bdate_Male;
      }
      if(btime_Male instanceof Date){
        var timeinString_Male = ("0" + btime_Male.getHours()).toString().slice(-2) + ":" + ("0" + btime_Male.getMinutes()).toString().slice(-2) + ":" + btime_Male.getSeconds().toString() + "0";
      }
      else{
        timeinString_Male =btime_Male;
      } 
    this.matchRequest = {
      LangCode: this.languagevalue,
      Female: {
        Date: dateinStringFemale,
        Time: timeinString_Female,
        LatDeg: this.femaleMatchMakingForm.controls['LatDeg'].value,
        LatMt: this.femaleMatchMakingForm.controls['LatMt'].value,
        LongDeg: this.femaleMatchMakingForm.controls['LongDeg'].value,
        LongMt: this.femaleMatchMakingForm.controls['LongMt'].value,
        ZH: this.femaleMatchMakingForm.controls['ZH'].value,
        ZM: this.femaleMatchMakingForm.controls['ZM'].value,
        NS: this.femaleMatchMakingForm.controls['NS'].value,
        EW: this.femaleMatchMakingForm.controls['EW'].value,
        PN: this.femaleMatchMakingForm.controls['PN'].value,
        Gender: "F",
        TimeFormat: this.female_timeformatvalue
      },
      Male: {
        Date: dateinString_Male,
        Time: timeinString_Male,
        LatDeg: this.maleMatchMakingForm.controls['LatDeg'].value,
        LatMt: this.maleMatchMakingForm.controls['LatMt'].value,
        LongDeg: this.maleMatchMakingForm.controls['LongDeg'].value,
        LongMt: this.maleMatchMakingForm.controls['LongMt'].value,
        ZH: this.maleMatchMakingForm.controls['ZH'].value,
        ZM: this.maleMatchMakingForm.controls['ZM'].value,
        NS: this.maleMatchMakingForm.controls['NS'].value,
        EW: this.maleMatchMakingForm.controls['EW'].value,
        PN: this.maleMatchMakingForm.controls['PN'].value,
        Gender: "M",
        TimeFormat: this.male_timeformatvalue
      }
    }
    this.matchMakingService.GetFreeData(this.matchRequest).subscribe((data) => {
      this.matchMakingService.matchRequest = this.matchRequest;
      this.matchMakingService.matchResponse.Left=data.Left;
       this.matchMakingService.matchResponse.Right=data.Right;
       this.matchMakingService.matchResponse.Prediction=data.Prediction;
      this.router.navigate(["/matchMaking/getMatchMakingFreeData"]);
    });
  }
  now: Date = new Date();

}