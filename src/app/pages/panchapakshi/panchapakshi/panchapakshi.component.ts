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
import { GetsputaModel } from 'src/Models/PanchaPakshi/GetsputaModel';


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
  getsputaModel:GetsputaModel;
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
        Count:null,
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
      Count:this.datedifference(this.fromDateinDateFormat,this.toDateinDateFormat),
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
    this.getsputaModel = {
      Date: dateinString,
      Time: timeinString,
      TimeFormat: this.timeformatvalue,
      ZH: this.panchaPakshiRequest.PresentPlace_ZH,
      EW: this.panchaPakshiRequest.PresentPlace_EW,
      LatDeg: this.panchaPakshiRequest.PresentPlace_LatDeg,
      LatMt: this.panchaPakshiRequest.PresentPlace_LatMt,
      LongDeg: this.panchaPakshiRequest.PresentPlace_LongDeg,
      LongMt: this.panchaPakshiRequest.PresentPlace_LongMt,
      NS: this.panchaPakshiRequest.PresentPlace_NS,
      PN: this.panchaPakshiRequest.PresentPlace_PN,
      ZM: this.panchaPakshiRequest.PresentPlace_ZM,
      Count:this.datedifference(this.fromDateinDateFormat,this.toDateinDateFormat),
    }
    this.panchaPakshiService.panchaPakshiRequest = this.panchaPakshiRequest;
    this.panchaPakshiService.birthDateinDateFormat = bdate;
    this.panchaPakshiService.birthTimeinDateFormat = btime;
    this.panchaPakshiService.fromDateinDateFormat = fromdate;
    this.panchaPakshiService.toDateinDateFormat = todate;
    this.panchaPakshiService.BirthPlace_timeZoneName = this.BirthPlace_timeZoneName;
    this.panchaPakshiService.PresentPlace_timeZoneName = this.PresentPlace_timeZoneName;
    this.panchaPakshiService.GetSputasOnSunRise(this.getsputaModel).subscribe((data: any) => {
      this.panchaPakshiService.panchapakshiResponse = data;
      this.loadingSwitchService.loading = false;
      //this.router.navigate(["/panchanga/getPanchangaFreeData"]);

       var week_day:number[]=[0,1,2,3,4,5,6];
    let ChandraSputa:any[]=[];
    let RaviSputa:any[]=[];
    let SunRise:any[]=[];
    let SunSet:any[]=[];
   
    let dinamana :any[]=[];
    let rathrimana:any[]=[];
    let day_subact:any[] =[];
    let night_subact:any[]=[];
    let day_yama:any[] =[];
    let night_yama:any[] = [];
    let daytime:any[]=[];
    let nighttime:any[]=[];
    let DayChoughadi:any[]=[];
    let NightChoughadi:any[]=[];
    for(var i=0;i<this.panchaPakshiRequest.Count//this.datedifference(new Date(),new Date('2017,1,23'))
    ;i++)
    {
     ChandraSputa[i]=data[i].ChandraSputa;
     RaviSputa[i]=data[i].RaviSputa;
    SunSet[i]=data[i].SunSet;
     SunRise[i]=data[i].SunRise;
      dinamana[i] = SunSet[i] +12- SunRise[i];
       rathrimana[i]= 24 - dinamana[i];
       day_subact[i] = dinamana[i] / 60;
   night_subact[i]= dinamana[i] / 60;
 day_yama[i]= dinamana[i] / 5;
night_yama[i] = rathrimana[i] / 5;
 daytime[i] = SunSet[i]+12 - SunRise[i];
 nighttime[i] = (6 - SunSet[i])+12;

   
    }let day_of_week:number[]=[]
    var week_day:number[]=[0,1,2,3,4,5,6];
    day_of_week[0]=week_day[new Date().getDay()]
    for(let i=0;i<this.panchaPakshiRequest.Count;i++)
    {
    day_of_week[i+1]=(day_of_week[i]
    +1)%7;
    
    }
    let paksha:number[]=[];
   
    let bird:number;
    for(let i=0;i<this.panchaPakshiRequest.Count;i++)
    {
      paksha[i] = this.Get_shukla_krishna_fordob(ChandraSputa[i],RaviSputa[i]);
     }
      bird = this.Getbird(ChandraSputa[1], paksha[1]);
      let ac:number;
      
      
    
    
    let shukla_day_time:any[]=[];
    let shukla_nt_time:any[]=[];
    let value:any[][];
    var week_day:number[]=[0,1,2,3,4,5,6];
    
    
    let day_of_week2:number=week_day[new Date().getDay()];
    let index2:any[]=[];
    let pakshi:number[]=[1, 2, 3, 4, 5, 1, 2, 3,4,5];
    let shukla_day_action:any[]=[];
    let shukla_day_value:any[]=[]; 
    
    let shukla_nt_value:any[]=[];
    let shukla_nt_action:any[]=[] ;
    let krishna_nt_value:any[]=[];
    let krishna_nt_action:any[]=[] ;
    let krishna_day_value:any[]=[];
    let krishna_day_action:any[] =[];
    let krishna_day_time:any[]=[];
    let krishna_nt_time:any[]=[] ;
    
     let time_day: any[] =[];
    let action:any[]=[]
    
    let value2:any[]=[];
     let shukla_day_act:any[]=[];
     let shukla_day_actbird:any[]=[];
     let shukla_nt_act:any[]=[];
     let shukla_nt_actbird:any[]=[];
     let krishna_day_act:any[]=[];
     let krishna_day_actbird:any[]=[];
     let krishna_nt_act:any[]=[];
     let krishna_nt_actbird:any[]=[];
     
     for(let i=0;i<this.panchaPakshiRequest.Count;i++)
    {
    if (paksha[i] == 0)
    {
     [shukla_day_act[i],shukla_day_actbird[i],shukla_day_time[i],shukla_day_value[i],shukla_day_action[i]]=this.Shukladay_calculations( bird, SunRise[i], day_of_week[i], day_subact[i]);
     
     [shukla_nt_act[i],shukla_nt_actbird[i],shukla_nt_time[i],shukla_nt_value[i],shukla_nt_action[i]]=this.Shuklanight_calculations( bird, SunSet[i], day_of_week[i], day_subact[i]);
    }
    else
    {
    [krishna_day_act[i],krishna_day_actbird[i],krishna_day_time[i],krishna_day_value[i],krishna_day_action[i]]= this.Krishnaday_calculations( bird, SunRise[i], day_of_week[i], day_subact[i]);
    [krishna_nt_act[i],krishna_nt_actbird[i],krishna_nt_time[i],krishna_nt_value[i],krishna_nt_action[i]]= this.Krishnanight_calculations( bird, SunSet[i], day_of_week[i], day_subact[i]);
    }}
    });
  }
  datedifference(date1:Date,date2:Date)
  {
  var timeDiff = Math.abs(date2.getTime() - date1.getTime());
  var dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return dayDifference;
  }

  Get_shukla_krishna_fordob(chandrasputa:any,ravisputa:any) {
    let paksha: number;
    let Thithi:any;
    
     Thithi = (chandrasputa) - (ravisputa);
    
   
    if (Thithi < 0) {
      Thithi= Thithi + 360;
    }
    if (Thithi < 180) {
      paksha = 1;
    }
    else {
      paksha = 0;
    }
  
  
  return paksha;
  }
   Getbird(chandra_sputa:any, paksha: number) {
    let bird: number;
   
    if (paksha == 1) {
      if (chandra_sputa < 66.666666666666671) {
        bird = 1;
      }
      else if (chandra_sputa < 146.66666666666669) {
        bird = 2;
      }
      else if (chandra_sputa < 226.66666666666669) {
        bird = 3;
      }
      else if (chandra_sputa < 293.33333333333337) {
        bird = 4;
      }
      else {
        bird = 5;
      }
    }
    else {
      if (chandra_sputa < 66.666666666666671) {
        bird = 5;
      }
      else if (chandra_sputa < 146.66666666666669) {
        bird = 4;
      }
      else if (chandra_sputa < 226.66666666666669) {
        bird= 3;
      }
      else if (chandra_sputa < 293.33333333333337) {
        bird = 2;
      }
      else {
        bird = 1;
      }
  
    }
    
    return bird;
  }
  Shukladay_calculations( bird: number, SunRise:any[], day_of_week: number, day_subact: any) {
    let day_activity: number[];
    let activity: any;
    let ac1:number;
    let index:number;
    let shukla_day_pakshi: number[] = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
    let ac:number;
    switch (day_of_week) {
      case 0:
      case 2:
  
        day_activity = [2, 3, 1, 4, 5, 2, 3, 1, 4, 5, 2, 3, 1, 4, 5];
        [index,ac]= this.GetActivity(bird, day_activity, shukla_day_pakshi);
        break;
      case 1:
      case 3:
        day_activity = [5, 2, 3, 1, 4, 5, 2, 3, 1, 4, 5, 2, 3, 1, 4];
     [index,ac] = this.GetActivity(bird, day_activity, shukla_day_pakshi);
        break;
      case 4:
        day_activity = [4, 5, 2, 3, 1, 4, 5, 2, 3, 1, 4, 5, 2, 3, 1];
      [index,ac ]= this.GetActivity(bird, day_activity, shukla_day_pakshi);
        break;
      case 5:
        day_activity = [1, 4, 5, 2, 3, 1, 4, 5, 2, 3, 1, 4, 5, 2, 3];
       [index,ac] = this.GetActivity(bird, day_activity, shukla_day_pakshi);
        break;
      case 6:
        day_activity = [3, 1, 4, 5, 2, 3, 1, 4, 5, 2, 3, 1, 4, 5, 2];
       [ index,ac] = this.GetActivity(bird, day_activity, shukla_day_pakshi);
        break;
      default: break;
    }
    var values:any[]=[4,2.5,3,1.5,1];
    var subact_day:any[]=[];
    
    let temp=0;
   
   
     subact_day= [day_subact * 4, day_subact * 2.5, day_subact* 3, day_subact * 1.5 ,day_subact,day_subact * 4 ,day_subact * 2.5,day_subact * 3,day_subact * 1.5, day_subact, day_subact * 4,day_subact * 2.5,day_subact * 3 ,day_subact * 1.5 ,day_subact];
   
   let time_day: any[] =[];
  let action:any[]=[]
  
  let value:any[]=[];
   
   
    time_day= this.gettime(subact_day, index, SunRise);
    let actbird:number[]=[];
   [ action,actbird] =this. Getaction(bird, index, shukla_day_pakshi);
   value =this. Geteffectvalue(shukla_day_pakshi, index, day_activity);
   
    
    
    return [ac,actbird,time_day,value,action];
  }
  
  
  Shuklanight_calculations(bird: number, SunSet:any[], day_of_week: number, night_subact:any)
        {
            let night_activity:number[] ;
           let  night_pakshi:number[] = [ 5, 4, 3, 2, 1, 5, 4, 3, 2, 1 ];
           let activity: any;
           let ac:number;
           let index:number;
         
          switch (day_of_week)
                {
                    case 0:
                    case 2:
  
                        night_activity = [5, 3, 4, 2, 1, 5, 3, 4, 2, 1, 5, 3, 4, 2, 1];
                        [index,ac]= this.GetActivity(bird, night_activity, night_pakshi);
                        break;
                    case 1:
                    case 3:
                        night_activity = [3, 4, 2, 1, 5, 3, 4, 2, 1, 5, 3, 4, 2, 1, 5 ];
                        [index,ac]= this.GetActivity(bird, night_activity, night_pakshi);
                        break;
                    case 4:
                        night_activity = [ 4, 2, 1, 5, 3, 4, 2, 1, 5, 3, 4, 2, 1, 5, 3 ];
                        [index,ac]= this.GetActivity(bird, night_activity, night_pakshi);
                        break;
                    case 5:
                        night_activity = [2, 1, 5, 3, 4, 2, 1, 5, 3, 4, 2, 1, 5, 3, 4 ];
                        [index,ac]= this.GetActivity(bird, night_activity, night_pakshi);
                        break;
                    case 6:
                        night_activity = [1, 5, 3, 4, 2, 1, 5, 3, 4, 2, 1, 5, 3, 4, 2 ];
                        [index,ac] = this.GetActivity(bird, night_activity, night_pakshi);
                        break;
                    default: break;
                }
  
                
              let subact_night:any[]=[];//=new Array(15);
                
                  //{
                   
                  
               subact_night = [night_subact * 2, night_subact* 2.5, night_subact * 2.5, night_subact* 2, night_subact* 3, night_subact * 2, night_subact * 2.5, night_subact * 2.5, night_subact* 2, night_subact* 3, night_subact* 2, night_subact* 2.5, night_subact* 2.5, night_subact* 2, night_subact * 3 ];
                
                let time_night: any[] =[];
                let action:any[]=[]
                let value:any[]=[];
                 
             time_night= this.gettime(subact_night, index, SunSet);
  
             value=this. Geteffectvalue(night_pakshi, index, night_activity);
             let actbird:number[]=[];
           [ action,actbird]= this.Getaction(bird, index,night_pakshi);
                    return [ac,actbird,time_night,value,action];
           
  
        }
        Krishnaday_calculations(   bird:number, SunRise:any[],  day_of_week:number, day_subact:any)
        {
            let day_activity :number[];
            let activity: any;
            let ac:number;
            let index:number;
         let krishna_day_pakshi :number[]= [ 1, 4, 2, 5, 3, 1, 4, 2, 5, 3, 1, 4, 2, 5, 3 ];
         //  for(let i=0;i<3;i++
          //  )
          //  {
                switch (day_of_week)
                {
                    case 0:
                    case 2:
  
                        day_activity = [ 3, 2, 5, 4, 1, 3, 2, 5, 4, 1, 3, 2, 5, 4, 1 ];
                      [index,ac]= this.GetActivity(bird, day_activity, krishna_day_pakshi);
                        break;
                    case 1:
                    case 6:
                        day_activity = [4, 1, 3, 2, 5, 4, 1, 3, 2, 5, 4, 1, 3, 2, 5 ];
                        [index,ac]= this.GetActivity(bird, day_activity, krishna_day_pakshi);
                        break;
                    case 3:
                        day_activity = [5, 4, 1, 3, 2, 5, 4, 1, 3, 2, 5, 4, 1, 3, 2 ];
                        [index,ac] = this.GetActivity(bird, day_activity, krishna_day_pakshi);
                        break;
                    case 4:
                        day_activity = [ 1, 3, 2, 5, 4, 1, 3, 2, 5, 4, 1, 3, 2, 5, 4 ];
                        [index,ac]= this.GetActivity(bird, day_activity, krishna_day_pakshi);
                        break;
                    case 5:
                        day_activity = [2, 5, 4, 1, 3, 2, 5, 4, 1, 3, 2, 5, 4, 1, 3 ];
                        [index,ac] = this.GetActivity(bird, day_activity, krishna_day_pakshi);
                        break;
                    default: break;
  
  
                }
            
           let subact_day :any[]= [day_subact*1.5,day_subact*4,day_subact*3,day_subact,day_subact*2.5,day_subact*1.5,day_subact*4,day_subact*3,day_subact,day_subact*2.5, day_subact*1.5,day_subact*4,day_subact*3,day_subact,day_subact*2.5];
  
  
            let time_day:any[][]= this.gettime(subact_day, index, SunRise);
    let value:any[][]=this. Geteffectvalue(krishna_day_pakshi, index,day_activity );
    let  action:number[]=[];
    let actbird:number[]=[];
    [action,actbird]= this.Getaction(bird, index, krishna_day_pakshi);
                   return [ac,actbird,time_day,value,action];
  }
        Krishnanight_calculations( bird:number, SunSet:any[], day_of_week:number , night_subact:any)
        {
            let krishna_night_activity:number[] ;
            let  night_pakshi:number[] = [ 5, 4, 3, 2, 1, 5, 4, 3, 2, 1 ];
  let activity: any;
    let ac:number;
    let index:number;
         switch (day_of_week)
                {
                    case 0:
                    case 2:
  
                        krishna_night_activity = [ 2, 4, 3, 5, 1, 2, 4, 3, 5, 1, 2, 4, 3, 5, 1 ];
                       [index,ac]= this.GetActivity(bird, krishna_night_activity, night_pakshi);
                        break;
                    case 1:
                    case 6:
                        krishna_night_activity = [ 5, 1, 2, 4, 3, 5, 1, 2, 4, 3, 5, 1, 2, 4, 3 ];
                        [index,ac] = this.GetActivity(bird, krishna_night_activity, night_pakshi);
                        break;
                    case 3:
                        krishna_night_activity = [4, 3, 5, 1, 2, 4, 3, 5, 1, 2, 4, 3, 5, 1, 2 ];
                        [index,ac]= this.GetActivity(bird, krishna_night_activity, night_pakshi);
                        break;
                    case 4:
                        krishna_night_activity = [ 3, 5, 1, 2, 4, 3, 5, 1, 2, 4, 3, 5, 1, 2, 4 ];
                      [index,ac] = this.GetActivity(bird, krishna_night_activity, night_pakshi);
                        break;
                    case 5:
                        krishna_night_activity = [1, 2, 4, 3, 5, 1, 2, 4, 3, 5, 1, 2, 4, 3, 5 ];
                       [index,ac] = this.GetActivity(bird, krishna_night_activity, night_pakshi);
                        break;
                    default: break;
                   }
                  
               let subact_night:any[] = [night_subact * 1.5, night_subact * 3.5, night_subact * 3.5, night_subact * 1.5, night_subact * 2, night_subact * 1.5, night_subact * 3.5, night_subact * 3.5, night_subact * 1.5, night_subact * 2, night_subact * 1.5, night_subact * 3.5, night_subact * 3.5, night_subact * 1.5, night_subact * 2 ];
  let  time_night:any[] = this.gettime(subact_night, index, SunSet);
  let value:any[][]=this.Geteffectvalue(night_pakshi, index,krishna_night_activity);
  let action:any[]=[];
  let actbird:number[]=[];
  
        [action,actbird]= this.Getaction(bird, index, night_pakshi);
             return [ac,actbird,time_night,value,action];
           }
           GetActivity(bird: number, activity: number[], pakshi: number[]){
            let index: number = 0;
            let ac: number =0;
        
        
            for (let i: number = 0; i < 5; i++) {
              if (bird == pakshi[i]) {
                index = i;
                ac = activity[index];
                break;
              }
        
            }
        
         return[index,ac];
           
        
          }
          
        
              gettime(subarray:any[], index: number,m1:any) {
         let sum: any[]=[m1];
            let temp: number = 0;
             let t: number = 0;
            while (temp < 5) {
            for (let i :number= index; i < index + 5; i++) {
                sum[t + 1] = sum[t] + subarray[i];
               // sum[t + 1] = sum[t] + subarray[i];
                t++;
              }
              temp++;
              index++;
            }
             return sum;
          }
          
          Geteffectvalue(pakshi: number[], index: number,act:number[]) {
            
             let actbird: number[]=[];
            let temp:number=0;
            let j:number;
          
            for(let i :number=0;i <5;i++)
            {
               actbird[i]=pakshi[i+index];
            }
          
            let index3: number[]=[];
        //let value:any[][]=new Array[25][1];
        //let value_sum:any[][]=new Array[25][1];
            let value: any[]=[];
            //[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
            let value_sum: any[]=[];
            //[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
            let effect_value: number[][] = [[0, 3, 1, 2, 4, 5], [1, 100, 75, 50, 25, 12.5], [2, 32, 24, 16, 8, 4], [3, 60, 45, 30, 10, 7.5], [4, 40, 30, 20, 5, 5], [5, 20, 15, 10, 5, 2.5]];
        
            for (let j: number = 0; j <5; j++) {
              for (let k: number = 1; k <= 25; k++) {
                if (actbird[j] == effect_value[0][k]) {
                  index3[j] = k;
                }
              }
            }
            let temp2: number = 0;
            let m: number = 0;
           for(let i:number=5;i<25;i++)
           {
             index3[i]=index3[i%5];
           }
         
        
           while (temp2 < 5) {
              for (let i:number = index; i< index + 5; i++) {
                value[m] = effect_value[act[i]][ index3[m]];
                value_sum[m] = (value[0] + value[m]) / 2;
                m++;
              }
              temp2++;
              index++;
            }
           
            return [value_sum];
          }
        
          Getaction(bird: number, index: number,  pakshi: number[]) {
            let friend_action: number[][] = [[1, 5, 2], [2, 1, 3], [3, 4, 2], [4, 3, 5], [5, 1, 4], [1, 5, 2], [2, 1, 3], [3, 4, 2], [4, 3, 5], [5, 1, 4]];
            let index2: number = 0;
            let actbird: number[]=[];
            for(let i :number=0;i <5;i++)
            {
               actbird[i]=pakshi[i+index];
            }
            for (let i = 0; i < 5; i++) {
              if (bird == friend_action[i][0]) {
                index2 = i;
                break;
              }
            }
            let action: number[]=[];
            for (let i = 1; i <= 4; i++) {
              if (actbird[i] == friend_action[index2][1] || actbird[i] == friend_action[index2][2]) {
                action[i] = 1;
        
              }
              else {
                action[i] = -1;
              }
            }
        return [action,actbird];
          }
        
}
