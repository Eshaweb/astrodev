import { Component, NgModule, enableProdMode, NgZone, ChangeDetectorRef } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { from, Subscription } from 'rxjs';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { PaymentInfo, ServiceInfo, HoroScopeService, SelectBoxModelNew } from 'src/Services/HoroScopeService/HoroScopeService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { UIService } from 'src/Services/UIService/ui.service';
import { ErrorService } from 'src/Services/Error/error.service';
import { MapsAPILoader } from '@agm/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import ArrayStore from 'devextreme/data/array_store';
import { PanchaPakshiService } from 'src/Services/PanchaPakshiService/PanchaPakshiService';
import { toDate } from '@angular/common/src/i18n/format_date';
import { PanchaPakshiRequest } from 'src/Models/PanchaPakshi/PanchaPakshiRequest';


@Component({
  selector: 'app-panchapakshi',
  templateUrl: './panchapakshi.component.html',
  styleUrls: ['./panchapakshi.component.css']
})
export class PanchaPakshiComponent {
  isLoading: boolean;
  public loading = false;
  intLongDeg: number;
  intLatDeg: number;
  timeformatdata: any;
  timeformatvalue: string;
  birthDateinDateFormat: Date;
  birthTimeinDateFormat: Date;
  fromDateinDateFormat: Date;
  toDateinDateFormat: Date;
  errorMessage: any;
  timeformats: SelectBoxModel[] = [
    { Id: "STANDARD", Text: 'Standard Time' },
    { Id: "SUMMER", Text: 'Summer Time' },
    { Id: "DOUBLE", Text: 'Double Summer Time' },
    { Id: "WAR", Text: 'War Time' }
  ];
  languages: SelectBoxModel[] = [
    { Id: "ENG", Text: "English" },
    { Id: "HIN", Text: "Hindi" },
    { Id: "KAN", Text: "Kannada" },
    { Id: "MAL", Text: "Malayalam" },
    { Id: "TAM", Text: "Tamil" }];
  reportSizes: SelectBoxModel[] = [
    { Id: "A4", Text: "A4" },
    { Id: "A5", Text: "A5" },
    { Id: "A6", Text: "Small(6inch X 6inch)" }];
  reportSizevalue: string;
  languagevalue: string;
  reportSizedata: any;
  languagedata: ArrayStore;
  genderValue: string;
  genderdata: ArrayStore;
  panchapakshiForm: FormGroup;
  latitude_birthPlace: number;
  longitude_birthPlace: number;
  latitude_presentPlace: number;
  longitude_presentPlace: number;
  BirthPlace_timeZoneName: string;
  BirthPlace_timeZoneId: any;
  PresentPlace_timeZoneName: string;
  PresentPlace_timeZoneId: any;
  public checkBoxValue: boolean = false;
  panchaPakshiRequest: PanchaPakshiRequest;
  constructor(public loadingSwitchService: LoadingSwitchService, private errorService: ErrorService, public toastr: ToastrManager, public route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef, public panchaPakshiService: PanchaPakshiService, public uiService: UIService,
    private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, public formbuilder: FormBuilder) {
    this.panchapakshiForm = this.formbuilder.group({
      Name: ['Shailesh', [Validators.required, Validators.minLength(4)]],
      Date: new Date(),
      Time: new Date(),
      FromDate:new Date(),
      ToDate:new Date(),
      TimeFormat: ['', []],
      ReportSize: ['', []],
      birthPlace: ['', [Validators.required]],
      presentPlace: ['', [Validators.required]],
      latitude: [''],
      longitude: [''],
      birthPlace_LatDeg: [null, [Validators.required, Validators.min(0), Validators.max(90)]],
      birthPlace_LongDeg: [null, [Validators.required, Validators.min(0), Validators.max(180)]],
      birthPlace_LatMt: [null, [Validators.required, Validators.min(0), Validators.max(59)]],
      birthPlace_LongMt: [null, [Validators.required, Validators.min(0), Validators.max(59)]],
      birthPlace_NS: ['', [Validators.required, Validators.pattern("^[NS]?$")]],
      birthPlace_EW: ['', [Validators.required, Validators.pattern("^[EW]?$")]],
      birthPlace_ZH: [null, [Validators.required, Validators.min(0), Validators.max(13)]],
      birthPlace_ZM: [null, [Validators.required, Validators.min(0), Validators.max(45)]],
      birthPlace_PN: ['', [Validators.required, Validators.pattern("^[+-]?$")]],

      presentPlace_LatDeg: [null, [Validators.required, Validators.min(0), Validators.max(90)]],
      presentPlace_LongDeg: [null, [Validators.required, Validators.min(0), Validators.max(180)]],
      presentPlace_LatMt: [null, [Validators.required, Validators.min(0), Validators.max(59)]],
      presentPlace_LongMt: [null, [Validators.required, Validators.min(0), Validators.max(59)]],
      presentPlace_NS: ['', [Validators.required, Validators.pattern("^[NS]?$")]],
      presentPlace_EW: ['', [Validators.required, Validators.pattern("^[EW]?$")]],
      presentPlace_ZH: [null, [Validators.required, Validators.min(0), Validators.max(13)]],
      presentPlace_ZM: [null, [Validators.required, Validators.min(0), Validators.max(45)]],
      presentPlace_PN: ['', [Validators.required, Validators.pattern("^[+-]?$")]]
    });
    const NameContrl = this.panchapakshiForm.get('Name');
    NameContrl.valueChanges.subscribe(value => this.setErrorMessage(NameContrl));
    const birthPlaceContrl = this.panchapakshiForm.get('birthPlace');
    birthPlaceContrl.valueChanges.subscribe(value => this.setErrorMessage(birthPlaceContrl));
    if (this.panchaPakshiService.panchaPakshiRequest != null) {
      this.panchaPakshiRequest = this.panchaPakshiService.panchaPakshiRequest;
      this.panchapakshiForm.controls['Name'].setValue(this.panchaPakshiService.panchaPakshiRequest.Name);
      this.birthDateinDateFormat = this.panchaPakshiService.birthDateinDateFormat;
      this.birthTimeinDateFormat = this.panchaPakshiService.birthTimeinDateFormat;
      this.fromDateinDateFormat = this.panchaPakshiService.fromDateinDateFormat;
      this.toDateinDateFormat = this.panchaPakshiService.toDateinDateFormat;
      this.BirthPlace_timeZoneName = this.panchaPakshiService.BirthPlace_timeZoneName;
      this.PresentPlace_timeZoneName = this.panchaPakshiService.PresentPlace_timeZoneName;
    }
    else {
      this.birthDateinDateFormat = this.panchapakshiForm.controls['Date'].value;
      this.birthTimeinDateFormat = this.panchapakshiForm.controls['Time'].value;
      this.fromDateinDateFormat = this.panchapakshiForm.controls['FromDate'].value;
      this.toDateinDateFormat = this.panchapakshiForm.controls['ToDate'].value;
      this.panchaPakshiRequest = {
        Name: this.panchapakshiForm.controls['Name'].value,
        Date: this.panchapakshiForm.controls['Date'].value,
        Time: this.panchapakshiForm.controls['Time'].value,
        FromDate:null,
        ToDate:null,
        TimeFormat: null,
        BirthPlace: this.panchaPakshiService.birthplace,
        PresentPlace: this.panchaPakshiService.presentPlace,
        BirthPlace_LatDeg: null,
        BirthPlace_LatMt: null,
        BirthPlace_LongDeg: null,
        BirthPlace_LongMt: null,
        BirthPlace_NS: null,
        BirthPlace_EW: null,
        BirthPlace_ZH: null,
        BirthPlace_ZM: null,
        BirthPlace_PN: null,

        PresentPlace_LatDeg: null,
        PresentPlace_LatMt: null,
        PresentPlace_LongDeg: null,
        PresentPlace_LongMt: null,
        PresentPlace_NS: null,
        PresentPlace_EW: null,
        PresentPlace_ZH: null,
        PresentPlace_ZM: null,
        PresentPlace_PN: null,
        LangCode: null,
        ReportSize: null,
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
    this.timeformatdata = new ArrayStore({
      data: this.timeformats,
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
    this.mapsAPILoader.load().then(() => {
      let birthPlaceInputBox = document.getElementById('txtbirthPlace').getElementsByTagName('input')[0];
      let autocomplete_birthPlace = new google.maps.places.Autocomplete(birthPlaceInputBox, {
        types: ["geocode"]
      });
      autocomplete_birthPlace.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete_birthPlace.getPlace();
          this.panchaPakshiService.birthplace = place.formatted_address;
          this.panchaPakshiService.birthplaceShort = place.address_components[0].long_name
          this.latitude_birthPlace = place.geometry.location.lat();
          this.longitude_birthPlace = place.geometry.location.lng();
          this.getBirthPlace_Timezone(this.latitude_birthPlace, this.longitude_birthPlace);
        });
      });

      let presentPlaceInputBox = document.getElementById('txtpresentPlace').getElementsByTagName('input')[0];
      let autocomplete_presentPlace = new google.maps.places.Autocomplete(presentPlaceInputBox, {
        types: ["geocode"]
      });
      autocomplete_presentPlace.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete_presentPlace.getPlace();
          this.panchaPakshiService.presentPlace = place.formatted_address;
          this.panchaPakshiService.presentPlaceShort = place.address_components[0].long_name
          this.latitude_presentPlace = place.geometry.location.lat();
          this.longitude_presentPlace = place.geometry.location.lng();
          this.getPresentPlace_Timezone(this.latitude_presentPlace, this.longitude_presentPlace);
        });
      });
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
    if (this.panchaPakshiService.panchaPakshiRequest != null) {
      this.timeformatvalue = this.panchaPakshiService.panchaPakshiRequest.TimeFormat;
      this.reportSizevalue = this.panchaPakshiService.panchaPakshiRequest.ReportSize;
      this.languagevalue = this.panchaPakshiService.panchaPakshiRequest.LangCode;
    }
    else {
      this.timeformatvalue = this.timeformats[0].Id;
      this.reportSizevalue = this.reportSizes[2].Id;
      this.languagevalue = this.languages[2].Id;
    }

  }

  ngOnDestroy(): void {

  }

  getBirthPlace_Timezone(lat, long) {
    this.panchaPakshiRequest.BirthPlace_LatDeg = Math.abs(parseInt(lat));
    this.panchaPakshiRequest.BirthPlace_LongDeg = Math.abs(parseInt(long));
    this.intLatDeg = parseInt(lat);
    this.intLongDeg = parseInt(long);
    this.panchaPakshiRequest.BirthPlace_LatMt = parseInt(Math.abs((lat - this.intLatDeg) * 60).toString());
    this.panchaPakshiRequest.BirthPlace_LongMt = parseInt(Math.abs((long - this.intLongDeg) * 60).toString());
    if (lat < 0) {
      this.panchaPakshiRequest.BirthPlace_NS = "S";
    }
    else {
      this.panchaPakshiRequest.BirthPlace_NS = "N";
    }
    if (long < 0) {
      this.panchaPakshiRequest.BirthPlace_EW = "W";
    }
    else {
      this.panchaPakshiRequest.BirthPlace_EW = "E";
    }
    this.panchaPakshiService.getTimezone(lat, long).subscribe((data: any) => {
      this.panchaPakshiRequest.BirthPlace_ZH = parseInt((Math.abs(data.rawOffset) / 3600.00).toString());
      this.panchaPakshiRequest.BirthPlace_ZM = parseInt((((Math.abs(data.rawOffset) / 3600.00) - this.panchaPakshiRequest.BirthPlace_ZH) * 60).toString());
      if (data.rawOffset < 0) {
        this.panchaPakshiRequest.BirthPlace_PN = "-";
      }
      else {
        this.panchaPakshiRequest.BirthPlace_PN = "+";
      }
      this.BirthPlace_timeZoneName = data.timeZoneName;
      this.BirthPlace_timeZoneId = data.timeZoneId;
      this.cdr.detectChanges();
    });
  }

  getPresentPlace_Timezone(lat, long) {
    this.panchaPakshiRequest.PresentPlace_LatDeg = Math.abs(parseInt(lat));
    this.panchaPakshiRequest.PresentPlace_LongDeg = Math.abs(parseInt(long));
    this.intLatDeg = parseInt(lat);
    this.intLongDeg = parseInt(long);
    this.panchaPakshiRequest.PresentPlace_LatMt = parseInt(Math.abs((lat - this.intLatDeg) * 60).toString());
    this.panchaPakshiRequest.PresentPlace_LongMt = parseInt(Math.abs((long - this.intLongDeg) * 60).toString());
    if (lat < 0) {
      this.panchaPakshiRequest.PresentPlace_NS = "S";
    }
    else {
      this.panchaPakshiRequest.PresentPlace_NS = "N";
    }
    if (long < 0) {
      this.panchaPakshiRequest.PresentPlace_EW = "W";
    }
    else {
      this.panchaPakshiRequest.PresentPlace_EW = "E";
    }
    this.panchaPakshiService.getTimezone(lat, long).subscribe((data: any) => {
      this.panchaPakshiRequest.PresentPlace_ZH = parseInt((Math.abs(data.rawOffset) / 3600.00).toString());
      this.panchaPakshiRequest.PresentPlace_ZM = parseInt((((Math.abs(data.rawOffset) / 3600.00) - this.panchaPakshiRequest.PresentPlace_ZH) * 60).toString());
      if (data.rawOffset < 0) {
        this.panchaPakshiRequest.PresentPlace_PN = "-";
      }
      else {
        this.panchaPakshiRequest.PresentPlace_PN = "+";
      }
      this.PresentPlace_timeZoneName = data.timeZoneName;
      this.PresentPlace_timeZoneId = data.timeZoneId;
      this.cdr.detectChanges();
    });
  }
  timeformatdataSelection(event) {
    this.timeformatvalue = event.value;
  }
  reportSizedataSelection(event) {
    this.reportSizevalue = event.value;
  }
  languagedataSelection(event) {
    this.languagevalue = event.value;
  }

  OnMouseUp(event) {
    if (event == null) {
      this.BirthPlace_timeZoneName = null;
    }
  }


  submit_click() {
    this.isLoading = true;
    this.loadingSwitchService.loading = true;
    this.panchaPakshiService.systemDate = ("0" + new Date().getDate()).toString().slice(-2) + "-" + ("0" + ((new Date().getMonth()) + 1)).toString().slice(-2) + "-" + new Date().getFullYear().toString();
    var bdate: Date = this.panchapakshiForm.controls['Date'].value;
    var btime: Date = this.panchapakshiForm.controls['Time'].value;
    var fromdate: Date = this.panchapakshiForm.controls['FromDate'].value;
    var todate: Date = this.panchapakshiForm.controls['ToDate'].value;
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
      timeinString = btime;
    }
    if (fromdate instanceof Date) {
      var fromdateinString = fromdate.getFullYear().toString() + "-" + ("0" + ((fromdate.getMonth()) + 1)).toString().slice(-2) + "-" + ("0" + fromdate.getDate()).toString().slice(-2);
    }
    else {
      fromdateinString = fromdate;
    }
    if (todate instanceof Date) {
      var todateinString = todate.getFullYear().toString() + "-" + ("0" + ((todate.getMonth()) + 1)).toString().slice(-2) + "-" + ("0" + todate.getDate()).toString().slice(-2);
    }
    else {
      todateinString = todate;
    }
    this.panchaPakshiRequest = {
      Name: this.panchapakshiForm.controls['Name'].value,
      Date: dateinString,
      Time: timeinString,
      FromDate:fromdateinString,
      ToDate:todateinString,
      BirthPlace: this.panchaPakshiService.birthplaceShort,
      PresentPlace:this.panchaPakshiService.presentPlaceShort,
      TimeFormat: this.timeformatvalue,
      BirthPlace_LatDeg: this.panchaPakshiRequest.BirthPlace_LatDeg,
      BirthPlace_LatMt: this.panchaPakshiRequest.BirthPlace_LatMt,
      BirthPlace_LongDeg: this.panchaPakshiRequest.BirthPlace_LongDeg,
      BirthPlace_LongMt: this.panchaPakshiRequest.BirthPlace_LongMt,
      BirthPlace_NS: this.panchaPakshiRequest.BirthPlace_NS,
      BirthPlace_EW: this.panchaPakshiRequest.BirthPlace_EW,
      BirthPlace_ZH: this.panchaPakshiRequest.BirthPlace_ZH,
      BirthPlace_ZM: this.panchaPakshiRequest.BirthPlace_ZM,
      BirthPlace_PN: this.panchaPakshiRequest.BirthPlace_PN,

      PresentPlace_LatDeg: this.panchaPakshiRequest.PresentPlace_LatDeg,
      PresentPlace_LatMt: this.panchaPakshiRequest.PresentPlace_LatMt,
      PresentPlace_LongDeg: this.panchaPakshiRequest.PresentPlace_LongDeg,
      PresentPlace_LongMt: this.panchaPakshiRequest.PresentPlace_LongMt,
      PresentPlace_NS: this.panchaPakshiRequest.PresentPlace_NS,
      PresentPlace_EW: this.panchaPakshiRequest.PresentPlace_EW,
      PresentPlace_ZH: this.panchaPakshiRequest.PresentPlace_ZH,
      PresentPlace_ZM: this.panchaPakshiRequest.PresentPlace_ZM,
      PresentPlace_PN: this.panchaPakshiRequest.PresentPlace_PN,
      LangCode: this.languagevalue,
      ReportSize: this.reportSizevalue,
    }

    this.panchaPakshiService.panchaPakshiRequest = this.panchaPakshiRequest;
    this.panchaPakshiService.birthDateinDateFormat = bdate;
    this.panchaPakshiService.birthTimeinDateFormat = btime;
    this.panchaPakshiService.fromDateinDateFormat = fromdate;
    this.panchaPakshiService.toDateinDateFormat = todate;
    this.panchaPakshiService.BirthPlace_timeZoneName = this.BirthPlace_timeZoneName;
    this.panchaPakshiService.PresentPlace_timeZoneName = this.PresentPlace_timeZoneName;
    // this.panchaPakshiService.GetFreeData(this.panchaPakshiRequest).subscribe((data: any) => {
    //   this.panchaPakshiService.panchapakshiResponse = data;
    //   this.loadingSwitchService.loading = false;
    //   this.router.navigate(["/horoscope/getHoroscopeFreeData"]);
    // });
  }

}
