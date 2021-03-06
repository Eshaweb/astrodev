import { Component, NgModule, enableProdMode, NgZone, ChangeDetectorRef } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { Service } from 'src/app/shared/services/app.service';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectBoxModel } from 'src/Models/SelectBoxModel';
import { HoroRequest } from 'src/Models/HoroScope/HoroRequest';
import { HoroScopeService, SelectBoxModelNew } from 'src/Services/HoroScopeService/HoroScopeService';
import { PartyService } from 'src/Services/PartyService/PartyService';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { UIService } from 'src/Services/UIService/ui.service';
import { ErrorService } from 'src/Services/Error/error.service';
import { MapsAPILoader } from '@agm/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import ArrayStore from 'devextreme/data/array_store';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/Services/LoginService/LoginService';


@Component({
  selector: 'app-horopage',
  templateUrl: './horoscope.component.html',
  styleUrls: ['./horoscope.component.css']
})
export class HoroscopeComponent {
  //genders:string[];
  now: Date = new Date();
  horoRequest: HoroRequest;
  timeformats: SelectBoxModel[] = [
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
  reportSizes: SelectBoxModel[] = [
    { Id: "A4", Text: "A4" },
    { Id: "A5", Text: "A5" },
    { Id: "A6", Text: "Small(6inch X 6inch)" }];
  genders: SelectBoxModel[];
  genderdata: ArrayStore;
  reportSizedata: ArrayStore;
  languagedata: ArrayStore;
  timeformatdata: ArrayStore;

  timeformatvalue: string;
  reportSizevalue: string;
  languagevalue: string;
  genderValue: string;
  intLongDeg: number;
  intLatDeg: number;
  public checkBoxValue: boolean = false;
  birthDateinDateFormat: Date;
  birthTimeinDateFormat: Date;
  horoscopeForm: FormGroup;
  latitude: number;
  longitude: number;
  timeZoneName: string;
  timeZoneId: any;
  mindateinDateFormat: Date;
  maxdateinDateFormat: Date;
  isMarriedvalue: boolean=false;
  constructor(public loginService: LoginService, public storageService: StorageService, service: Service, public loadingSwitchService: LoadingSwitchService, private errorService: ErrorService, public toastr: ToastrManager, public route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef, public partyService: PartyService, public horoScopeService: HoroScopeService, public uiService: UIService,
    private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, public formbuilder: FormBuilder) {
    this.mindateinDateFormat = new Date(1900, 0, 1);
    this.maxdateinDateFormat = new Date();
    this.maxdateinDateFormat.setDate(this.maxdateinDateFormat.getDate()+1);
    this.loginService.isHomePage = false;
    this.genders = [{ Id: "M", Text: "Male" }, { Id: "F", Text: "Female" }];
    if (environment.production) {
      this.horoscopeForm = this.formbuilder.group({
        Name: ['', [Validators.required, Validators.minLength(4)]],
        fatherName: [''],
        motherName: [''],
        gotra: [''],
        Date: [new Date()],
        Time: new Date(),
        TimeFormat: ['', []],
        ReportSize: ['', []],
        birthPlace: ['', [Validators.required]],
        language: ['', []],
        latitude: [''],
        longitude: [''],
        gender: ['M', []],
        LatDeg: [null, [Validators.required, Validators.min(0), Validators.max(90)]],
        LongDeg: [null, [Validators.required, Validators.min(0), Validators.max(180)]],
        LatMt: [null, [Validators.required, Validators.min(0), Validators.max(59)]],
        LongMt: [null, [Validators.required, Validators.min(0), Validators.max(59)]],
        NS: ['', [Validators.required, Validators.pattern("^[NS]?$")]],
        EW: ['', [Validators.required, Validators.pattern("^[EW]?$")]],
        ZH: [null, [Validators.required, Validators.min(0), Validators.max(13)]],
        ZM: [null, [Validators.required, Validators.min(0), Validators.max(45)]],
        PN: ['', [Validators.required, Validators.pattern("^[+-]?$")]]
      }, {validator: this.validateDateField()});
    }
    else{
      this.horoscopeForm = this.formbuilder.group({
        Name: ['Shailesh', [Validators.required, Validators.minLength(4)]],
        fatherName: [''],
        motherName: [''],
        gotra: [''],
        Date: [new Date()],
        Time: new Date(),
        TimeFormat: ['', []],
        ReportSize: ['', []],
        birthPlace: ['', [Validators.required]],
        language: ['', []],
        latitude: [''],
        longitude: [''],
        gender: ['M', []],
        LatDeg: [null, [Validators.required, Validators.min(0), Validators.max(90)]],
        LongDeg: [null, [Validators.required, Validators.min(0), Validators.max(180)]],
        LatMt: [null, [Validators.required, Validators.min(0), Validators.max(59)]],
        LongMt: [null, [Validators.required, Validators.min(0), Validators.max(59)]],
        NS: ['', [Validators.required, Validators.pattern("^[NS]?$")]],
        EW: ['', [Validators.required, Validators.pattern("^[EW]?$")]],
        ZH: [null, [Validators.required, Validators.min(0), Validators.max(13)]],
        ZM: [null, [Validators.required, Validators.min(0), Validators.max(45)]],
        PN: ['', [Validators.required, Validators.pattern("^[+-]?$")]]
      }, {validator: this.validateDateField()});
    }
    const NameContrl = this.horoscopeForm.get('Name');
    NameContrl.valueChanges.subscribe(value => this.setErrorMessage(NameContrl));
    // const fatherNameContrl = this.horoscopeForm.get('fatherName');
    // fatherNameContrl.valueChanges.subscribe(value => this.setErrorMessage(fatherNameContrl));
    // const motherNameContrl = this.horoscopeForm.get('motherName');
    // motherNameContrl.valueChanges.subscribe(value => this.setErrorMessage(motherNameContrl));
    // const gotraContrl = this.horoscopeForm.get('gotra');
    // gotraContrl.valueChanges.subscribe(value => this.setErrorMessage(gotraContrl));
    // const LatDegContrl = this.horoscopeForm.get('LatDeg');
    // LatDegContrl.valueChanges.subscribe(value => this.setErrorMessage(LatDegContrl));
    // const LatMtContrl = this.horoscopeForm.get('LatMt');
    // LatMtContrl.valueChanges.subscribe(value => this.setErrorMessage(LatMtContrl));
    // const NSContrl = this.horoscopeForm.get('NS');
    // NSContrl.valueChanges.subscribe(value => this.setErrorMessage(NSContrl));
    // const LongDegContrl = this.horoscopeForm.get('LongDeg');
    // LongDegContrl.valueChanges.subscribe(value => this.setErrorMessage(LongDegContrl));
    // const LongMtContrl = this.horoscopeForm.get('LongMt');
    // LongMtContrl.valueChanges.subscribe(value => this.setErrorMessage(LongMtContrl));
    // const EWContrl = this.horoscopeForm.get('EW');
    // EWContrl.valueChanges.subscribe(value => this.setErrorMessage(EWContrl));
    // const ZHContrl = this.horoscopeForm.get('ZH');
    // ZHContrl.valueChanges.subscribe(value => this.setErrorMessage(ZHContrl));
    // const ZMContrl = this.horoscopeForm.get('ZM');
    // ZMContrl.valueChanges.subscribe(value => this.setErrorMessage(ZMContrl));
    // const PNContrl = this.horoscopeForm.get('PN');
    // PNContrl.valueChanges.subscribe(value => this.setErrorMessage(PNContrl));
    const birthPlaceContrl = this.horoscopeForm.get('birthPlace');
    birthPlaceContrl.valueChanges.subscribe(value => this.setErrorMessage(birthPlaceContrl));
  }
  validateDateField() {
    return (group: FormGroup): {[key: string]: any} => {
    let f = group.controls['Date'];
    if (f.value > new Date(this.maxdateinDateFormat)||f.value < new Date(this.mindateinDateFormat)) {
       return {
         dates: "Date should be less than today"
       };
     }
     return {};
    }
  }
  setErrorMessage(c: AbstractControl): void {
    let control = this.uiService.getControlName(c);//gives the control name property from particular service.
    document.getElementById('err_' + control).innerHTML = '';//To not display the error message, if there is no error.
    if(control=="birthPlace"){
      this.timeZoneName=null;
    }
    if ((c.touched || c.dirty) && c.errors) {
      document.getElementById('err_' + control).innerHTML = Object.keys(c.errors).map(key => this.validationMessages[control + '_' + key]).join(' ');
    }
  }
  private validationMessages = { //used in above method.
    Name_required: '*Enter Name',
    Name_minlength: '*Minimum length is 4',
    Name_pattern: 'Name should be character only',

    fatherName_minlength: '*Minimum length is 4',

    motherName_minlength: '*Minimum length is 4',

    gotra_minlength: '*Minimum length is 4',

    LatDeg_required: '*Enter Latitude Degree',
    LatDeg_min: '*Minimum value is 0',
    LatDeg_max: '*Maximum value is 90',

    LatMt_required: '*Enter Latitude Minute',
    LatMt_min: '*Minimum value is 0',
    LatMt_max: '*Maximum value is 59',

    NS_required: '*Enter NS',
    NS_pattern: '*Only S or N is valid ',

    LongDeg_required: '*Enter Longitude Degree',
    LongDeg_min: '*Minimum value is 0',
    LongDeg_max: '*Maximum value is 90',

    LongMt_required: '*Enter Longitude Minute',
    LongMt_min: '*Minimum value is 0',
    LongMt_max: '*Maximum value is 59',

    EW_required: '*Enter EW',
    EW_pattern: '*Only E or W is valid ',

    ZH_required: '*Enter ZH',
    ZH_min: '*Minimum value is 0',
    ZH_max: '*Maximum value is 13',

    ZM_required: '*Enter ZM',
    ZM_min: '*Minimum value is 0',
    ZM_max: '*Maximum value is 45',

    PN_required: '*Enter PN',
    PN_pattern: '*Only + or - is valid ',

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
    this.genderdata = new ArrayStore({
      data: this.genders,
      key: "Id"
    });
    this.mapsAPILoader.load().then(() => {
      let nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
        types: ["geocode"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.horoScopeService.birthplace = place.formatted_address;
          this.horoScopeService.birthplaceShort = place.address_components[0].long_name
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getTimezone(this.latitude, this.longitude);
        });
      });
    });

    if (this.horoScopeService.horoRequest != null) {
      this.horoRequest = this.horoScopeService.horoRequest;
      this.horoscopeForm.controls['Name'].setValue(this.horoScopeService.horoRequest.Name);
      this.birthDateinDateFormat = this.horoScopeService.birthDateinDateFormat;
      this.birthTimeinDateFormat = this.horoScopeService.birthTimeinDateFormat;
    }
    else {
      this.birthDateinDateFormat = this.horoscopeForm.controls['Date'].value;
      this.birthTimeinDateFormat = this.horoscopeForm.controls['Time'].value;
      this.horoRequest = {
        Name: this.horoscopeForm.controls['Name'].value,
        Father: this.horoscopeForm.controls['fatherName'].value,
        Mother: this.horoscopeForm.controls['motherName'].value,
        Gothra: this.horoscopeForm.controls['gotra'].value,
        Date: this.horoscopeForm.controls['Date'].value,
        Time: this.horoscopeForm.controls['Time'].value,
        TimeFormat: null,
        Place: this.horoScopeService.birthplace,
        LatDeg: null,
        LatMt: null,
        LongDeg: null,
        LongMt: null,
        NS: null,
        EW: null,
        ZH: null,
        ZM: null,
        PN: null,
        Gender: this.horoscopeForm.controls['gender'].value,
        LangCode: null,
        ReportSize: null,
        ReportType: null,
        FormParameter: null,
        Swarna: 0,
        Pruchaka: 0,
        JanmaRashi: 0,
        AshtaMangalaNo: null,
        IsMarried: true,
        PartyMastId:StorageService.GetItem('PartyMastId')
      }
    }
  }

  getTimezone(lat, long) {
    this.horoRequest.LatDeg = Math.abs(parseInt(lat));
    this.horoRequest.LongDeg = Math.abs(parseInt(long));
    this.intLatDeg = parseInt(lat);
    this.intLongDeg = parseInt(long);
    this.horoRequest.LatMt = parseInt(Math.abs((lat - this.intLatDeg) * 60).toString());
    this.horoRequest.LongMt = parseInt(Math.abs((long - this.intLongDeg) * 60).toString());
    if (lat < 0) {
      this.horoRequest.NS = "S";
    }
    else {
      this.horoRequest.NS = "N";
    }
    if (long < 0) {
      this.horoRequest.EW = "W";
    }
    else {
      this.horoRequest.EW = "E";
    }
    // var bdate: Date = this.horoscopeForm.controls['Date'].value;
    // if (bdate instanceof Date) {
    //   var dateinString = bdate.getFullYear().toString() + "-" + ("0" + ((bdate.getMonth()) + 1)).toString().slice(-2) + "-" + ("0" + bdate.getDate()).toString().slice(-2);
    // }
    // else {
    //   dateinString = bdate;
    // }
    // var dis = dateinString.split("-");
    // var btime: Date = this.horoscopeForm.controls['Time'].value;
    // if (btime instanceof Date) {
    //   var timeinString = ("0" + btime.getHours()).toString().slice(-2) + ":" + ("0" + btime.getMinutes()).toString().slice(-2) + ":" + "00";
    // }
    // else {
    //   timeinString = btime;
    // }
    // var tis = timeinString.split("-");
    //  var newDate = dis[1] + "," + dis[2] + "," + dis[0];
    // //var newDate = dis[1] + "," + dis[2] + "," + dis[0]+ "," +tis[0]+ "," +tis[1]+ "," +tis[2];
    // var timestamp=new Date(newDate).getTime();
    // this.horoScopeService.getTimezone(lat, long, (timestamp/1000).toString()).subscribe((data: any) => {
    //   this.horoRequest.ZH = parseInt((Math.abs(data.rawOffset) / 3600.00).toString());
    //   this.horoRequest.ZM = parseInt((((Math.abs(data.rawOffset) / 3600.00) - this.horoRequest.ZH) * 60).toString());
    //   if (data.rawOffset < 0) {
    //     this.horoRequest.PN = "-";
    //   }
    //   else {
    //     this.horoRequest.PN = "+";
    //   }
    //   this.timeZoneName = data.timeZoneName;
    //   this.timeZoneId = data.timeZoneId;
    //   this.cdr.detectChanges();
    // });
    this.horoScopeService.getTimezone(lat, long).subscribe((data: any) => {
      this.horoRequest.ZH = parseInt((Math.abs(data.rawOffset) / 3600.00).toString());
      this.horoRequest.ZM = parseInt((((Math.abs(data.rawOffset) / 3600.00) - this.horoRequest.ZH) * 60).toString());
      if (data.rawOffset < 0) {
        this.horoRequest.PN = "-";
      }
      else {
        this.horoRequest.PN = "+";
      }
      this.timeZoneName = data.timeZoneName;
      this.timeZoneId = data.timeZoneId;
      this.cdr.detectChanges();
    });
  }

  // onDOBValueChanged(){
  //   var bdate: Date = this.horoscopeForm.controls['Date'].value;
  //   if (bdate instanceof Date) {
  //     var dateinString = bdate.getFullYear().toString() + "-" + ("0" + ((bdate.getMonth()) + 1)).toString().slice(-2) + "-" + ("0" + bdate.getDate()).toString().slice(-2);
  //   }
  //   else {
  //     dateinString = bdate;
  //   }
  //   var dis = dateinString.split("-");
  //   var newDate = dis[1] + "," + dis[2] + "," + dis[0];
  //   var timestamp=new Date(newDate).getTime();
  //   this.horoScopeService.getTimezone(this.latitude, this.longitude, (timestamp/1000).toString()).subscribe((data: any) => {
  //     this.horoRequest.ZH = parseInt((Math.abs(data.rawOffset) / 3600.00).toString());
  //     this.horoRequest.ZM = parseInt((((Math.abs(data.rawOffset) / 3600.00) - this.horoRequest.ZH) * 60).toString());
  //     if (data.rawOffset < 0) {
  //       this.horoRequest.PN = "-";
  //     }
  //     else {
  //       this.horoRequest.PN = "+";
  //     }
  //     this.timeZoneName = data.timeZoneName;
  //     this.timeZoneId = data.timeZoneId;
  //     this.cdr.detectChanges();
  //   });
  // }

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
      this.timeformatvalue = this.horoScopeService.horoRequest.TimeFormat;
      this.reportSizevalue = this.horoScopeService.horoRequest.ReportSize;
      this.languagevalue = this.horoScopeService.horoRequest.LangCode;
      this.genderValue = this.horoScopeService.horoRequest.Gender;
      this.timeZoneName = this.horoScopeService.timeZoneName;
    }
    else {
      this.timeformatvalue = this.timeformats[0].Id;
      this.reportSizevalue = this.reportSizes[2].Id;
      this.languagevalue = this.languages[2].Id;
      this.genderValue = this.genders[0].Id;
    }
  }

  ngOnDestroy(): void {

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

  IsMarriedCheckBoxValueChanged(event){
    this.isMarriedvalue=event.value;
  }

  OnMouseUp(event) {
    if (event == null) {
      this.timeZoneName = null;
    }
  }


  OnSubmit_click() {
    this.loadingSwitchService.loading = true;
    this.horoScopeService.systemDate = ("0" + new Date().getDate()).toString().slice(-2) + "-" + ("0" + ((new Date().getMonth()) + 1)).toString().slice(-2) + "-" + new Date().getFullYear().toString();
    // if(typeof this.horoscopeForm.controls['Date'].value ==='string'){

    // }
    var bdate: Date = this.horoscopeForm.controls['Date'].value;
    var btime: Date = this.horoscopeForm.controls['Time'].value;
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
    this.horoRequest = {
      Name: this.horoscopeForm.controls['Name'].value,
      Father: this.horoscopeForm.controls['fatherName'].value,
      Mother: this.horoscopeForm.controls['motherName'].value,
      Gothra: this.horoscopeForm.controls['gotra'].value,
      Date: dateinString,
      Time: timeinString,
      Place: this.horoScopeService.birthplaceShort,
      TimeFormat: this.timeformatvalue,
      LatDeg: this.horoRequest.LatDeg,
      LatMt: this.horoRequest.LatMt,
      LongDeg: this.horoRequest.LongDeg,
      LongMt: this.horoRequest.LongMt,
      NS: this.horoRequest.NS,
      EW: this.horoRequest.EW,
      ZH: this.horoRequest.ZH,
      ZM: this.horoRequest.ZM,
      PN: this.horoRequest.PN,
      //Gender: this.horoscopeForm.controls['gender'].value,
      Gender: this.genderValue,
      //LangCode: this.horoscopeForm.controls['language'].value,
      LangCode: this.languagevalue,
      FormParameter: 'H',
      ReportType: '#HFH',
      //ReportSize: this.horoscopeForm.controls['ReportSize'].value,
      ReportSize: this.reportSizevalue,
      Swarna: 0,
      Pruchaka: 0,
      JanmaRashi: 0,
      AshtaMangalaNo: '444',
      IsMarried: this.isMarriedvalue,
      PartyMastId:StorageService.GetItem('PartyMastId')
    }

    this.horoScopeService.Fathername = this.horoRequest.Father;
    this.horoScopeService.Mothername = this.horoRequest.Mother;
    this.horoScopeService.horoRequest = this.horoRequest;
    this.horoScopeService.birthDateinDateFormat = bdate;
    this.horoScopeService.birthTimeinDateFormat = btime;
    this.horoScopeService.timeZoneName = this.timeZoneName;
    this.storageService.SetHoroModel(JSON.stringify(this.horoRequest));
    this.horoScopeService.GetFreeData(this.horoRequest).subscribe((data: any) => {
      this.horoScopeService.horoResponse = data;
      this.storageService.SetHoroResponse(JSON.stringify(data));
      this.loadingSwitchService.loading = false;
      this.router.navigate(["/horoscope/getHoroscopeFreeData"]);
    });
  }

  public onDialogOKSelected(event) {
    event.dialog.close();
  }


}
